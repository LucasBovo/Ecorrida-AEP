/**
 * RouteMap – versão WEB
 * Usa iframe + Leaflet via CDN. Sem react-native-maps.
 */
import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Colors, Radius } from '../utils/theme';
import { Coordenada } from '../utils/knn';

interface Props {
  origem: Coordenada;
  destino: Coordenada;
  height?: number;
}

export default function RouteMap({ origem, destino, height = 180 }: Props) {
  const html = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"/>
<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
<style>html,body,#map{margin:0;padding:0;width:100%;height:100%;}</style>
</head>
<body>
<div id="map"></div>
<script>
var map=L.map('map',{zoomControl:false,attributionControl:false});
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
var iA=L.divIcon({className:'',html:'<div style="width:12px;height:12px;background:#0A5C8A;border:2px solid #fff;border-radius:50%;box-shadow:0 1px 4px rgba(0,0,0,.4)"></div>',iconSize:[12,12],iconAnchor:[6,6]});
var iB=L.divIcon({className:'',html:'<div style="width:12px;height:12px;background:#1AA065;border:2px solid #fff;border-radius:50%;box-shadow:0 1px 4px rgba(0,0,0,.4)"></div>',iconSize:[12,12],iconAnchor:[6,6]});
var A=[${origem.latitude},${origem.longitude}];
var B=[${destino.latitude},${destino.longitude}];
L.marker(A,{icon:iA}).addTo(map).bindPopup('Partida');
L.marker(B,{icon:iB}).addTo(map).bindPopup('Destino');
L.polyline([A,B],{color:'#0A5C8A',weight:2.5,opacity:0.8,dashArray:'6,4'}).addTo(map);
map.fitBounds([A,B],{padding:[28,28]});
</script>
</body>
</html>`;

  return (
    <View style={[styles.box, { height }]}>
      {/* @ts-ignore – iframe é válido no React DOM web */}
      <iframe
        srcDoc={html}
        style={{ width: '100%', height: '100%', border: 'none' }}
        title="Mapa da rota"
        sandbox="allow-scripts"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    overflow: 'hidden',
    backgroundColor: '#e8edf0',
  },
});
