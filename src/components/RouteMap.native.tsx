/**
 * RouteMap – versão NATIVA (iOS / Android)
 * Usa react-native-maps normalmente.
 */
import React from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Marker, Polyline, PROVIDER_DEFAULT } from 'react-native-maps';
import { Colors, Radius } from '../utils/theme';
import { Coordenada } from '../utils/knn';

interface Props {
  origem: Coordenada;
  destino: Coordenada;
  height?: number;
}

function gerarRota(a: Coordenada, b: Coordenada): Coordenada[] {
  return [
    a,
    { latitude: (a.latitude + b.latitude) / 2 + 0.003, longitude: (a.longitude + b.longitude) / 2 },
    b,
  ];
}

export default function RouteMap({ origem, destino, height = 180 }: Props) {
  return (
    <View style={[styles.box, { height }]}>
      <MapView
        provider={PROVIDER_DEFAULT}
        style={StyleSheet.absoluteFillObject}
        initialRegion={{
          latitude:  (origem.latitude  + destino.latitude)  / 2,
          longitude: (origem.longitude + destino.longitude) / 2,
          latitudeDelta:  Math.abs(origem.latitude  - destino.latitude)  * 2.5 + 0.01,
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
          coordinates={gerarRota(origem, destino)}
          strokeColor={Colors.primary}
          strokeWidth={3}
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    overflow: 'hidden',
    backgroundColor: '#e8edf0',
  },
});
