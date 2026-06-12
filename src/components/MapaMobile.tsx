import MapView, { Marker, Polyline } from 'react-native-maps';

export default function MapaMobile(props) {
  return (
    <MapView {...props}>
      {props.children}
    </MapView>
  );
}