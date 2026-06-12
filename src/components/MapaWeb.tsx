import { MapContainer, TileLayer, Marker, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

export default function MapaWeb({
  origem,
  destino,
}: any) {
  return (
    <MapContainer
      center={[
        origem.latitude,
        origem.longitude,
      ]}
      zoom={13}
      style={{
        height: 180,
        width: '100%',
      }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <Marker
        position={[
          origem.latitude,
          origem.longitude,
        ]}
      />

      <Marker
        position={[
          destino.latitude,
          destino.longitude,
        ]}
      />

      <Polyline
        positions={[
          [
            origem.latitude,
            origem.longitude,
          ],
          [
            destino.latitude,
            destino.longitude,
          ],
        ]}
      />
    </MapContainer>
  );
}