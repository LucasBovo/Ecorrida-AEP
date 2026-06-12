import { Platform } from 'react-native';

export default Platform.select({
  web: require('./MapaWeb').default,
  default: require('./MapaMobile').default,
});