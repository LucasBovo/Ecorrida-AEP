/**
 * RouteMap – componente de mapa cross-platform
 *
 * Web  → iframe embutido do OpenStreetMap (sem dependências extras)
 * iOS/Android → react-native-maps (já instalado)
 */

import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { Colors, Radius } from '../utils/theme';
import { Coordenada } from '../utils/knn';

interface Props {
  origem: Coordenada;
  destino: Coordenada;
  height?: number;
}

// ── Web: iframe do OpenStreetMap via OSRM route ──────────────────────────────
function MapaWeb({ origem, destino, height = 180 }: Props) {
  // Bounding box que cobre os dois pontos com margem
  const minLat = Math.min(origem.latitude,  destino.latitude)  - 0.01;
  const maxLat = Math.max(origem.latitude,  destino.latitude)  + 0.01;
  const minLon = Math.min(origem.longitude, destino.longitude) - 0.015;
  const maxLon = Math.max(origem.longitude, destino.longitude) + 0.015;

  // URL do OpenStreetMap com marcadores de origem e destino
  const url =
    `https://www.openstreetmap.org/export/embed.html` +
    `?bbox=${minLon},${minLat},${maxLon},${maxLat}` +
    `&layer=mapnik` +
    `&marker=${origem.latitude},${origem.longitude}` +
    // OSM embed só suporta 1 marcador nativo; usamos a URL de rota do routing
    ``;

  // HTML inline com dois marcadores coloridos via Leaflet CDN
  const html = `
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"/>
<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
<style>
  html,body,#map{margin:0;padding:0;width:100%;height:100%;}
</style>
</head>
<body>
<div id="map"></div>
<script>
  var map = L.map('map', {zoomControl:false, attributionControl:false});
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

  var iconA = L.divIcon({className:'',html:'<div style="width:14px;height:14px;background:#0A5C8A;border:2px solid #fff;border-radius:50%;box-shadow:0 1px 4px rgba(0,0,0,.4)"></div>',iconSize:[14,14],iconAnchor:[7,7]});
  var iconB = L.divIcon({className:'',html:'<div style="width:14px;height:14px;background:#1AA065;border:2px solid #fff;border-radius:50%;box-shadow:0 1px 4px rgba(0,0,0,.4)"></div>',iconSize:[14,14],iconAnchor:[7,7]});

  var A = [${origem.latitude}, ${origem.longitude}];
  var B = [${destino.latitude}, ${destino.longitude}];

  L.marker(A, {icon:iconA}).addTo(map).bindPopup('Partida');
  L.marker(B, {icon:iconB}).addTo(map).bindPopup('Destino');

  // Linha da rota
  L.polyline([A, B], {color:'#0A5C8A', weight:3, opacity:0.8, dashArray:'6,4'}).addTo(map);

  map.fitBounds([A, B], {padding:[24,24]});
</script>
</body>
</html>
`;

  // Na web usamos dangerouslySetInnerHTML via um iframe com srcdoc
  const encoded = encodeURIComponent(html);

  return (
    <View style={[styles.box, { height }]}>
      {/* @ts-ignore – iframe existe no React DOM (web) */}
      <iframe
        srcDoc={html}
        style={{ width: '100%', height: '100%', border: 'none', borderRadius: 0 }}
        title="Mapa da rota"
        sandbox="allow-scripts"
      />
    </View>
  );
}

// ── Nativo: react-native-maps ────────────────────────────────────────────────
function MapaNativo({ origem, destino, height = 180 }: Props) {
  // Import dinâmico só no nativo para evitar crash na web
  const MapView    = require('react-native-maps').default;
  const { Marker, Polyline, PROVIDER_DEFAULT } = require('react-native-maps');

  const midLat = (origem.latitude  + destino.latitude)  / 2;
  const midLng = (origem.longitude + destino.longitude) / 2;
  const rota: Coordenada[] = [
    origem,
    { latitude: midLat + 0.003, longitude: midLng },
    destino,
  ];

  return (
    <View style={[styles.box, { height }]}>
      <MapView
        provider={PROVIDER_DEFAULT}
        style={{ flex: 1 }}
        initialRegion={{
          latitude: midLat,
          longitude: midLng,
          latitudeDelta: Math.abs(origem.latitude  - destino.latitude)  * 2.5 + 0.01,
          longitudeDelta: Math.abs(origem.longitude - destino.longitude) * 2.5 + 0.01,
        }}
        scrollEnabled={false}
        zoomEnabled={false}
        pitchEnabled={false}
        rotateEnabled={false}
      >
        <Marker coordinate={origem}  pinColor={Colors.primary} title="Partida" />
        <Marker coordinate={destino} pinColor={Colors.accent}  title="Destino" />
        <Polyline
          coordinates={rota}
          strokeColor={Colors.primary}
          strokeWidth={3}
        />
      </MapView>
    </View>
  );
}

// ── Export principal ─────────────────────────────────────────────────────────
export default function RouteMap(props: Props) {
  if (Platform.OS === 'web') return <MapaWeb {...props} />;
  return <MapaNativo {...props} />;
}

const styles = StyleSheet.create({
  box: {
    borderRadius: Radius.md,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: '#e8e8e8',
  },
});
