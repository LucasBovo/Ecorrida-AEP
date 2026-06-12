import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, View, StyleSheet } from 'react-native';

import LoginScreen          from './src/screens/LoginScreen';
import RegisterScreen       from './src/screens/RegisterScreen';
import HomeScreen           from './src/screens/HomeScreen';
import BuscarCaronaScreen   from './src/screens/BuscarCaronaScreen';
import OferecerCaronaScreen from './src/screens/OferecerCaronaScreen';
import MatchesScreen        from './src/screens/MatchesScreen';
import PerfilScreen         from './src/screens/PerfilScreen';
import { Colors, Font }     from './src/utils/theme';

const Stack = createNativeStackNavigator();
const Tab   = createBottomTabNavigator();

// Ícones geométricos SVG-like em View (sem dependências de ícone)
function TabIcon({ name, focused }: { name: string; focused: boolean }) {
  const color = focused ? Colors.primary : Colors.textMuted;
  const icons: Record<string, React.ReactNode> = {
    Home: (
      <View style={[ico.house, { borderColor: color }]}>
        <View style={[ico.houseRoof, { borderBottomColor: color }]} />
      </View>
    ),
    Buscar: <View style={[ico.circle, { borderColor: color }]}><View style={[ico.dot, { backgroundColor: color }]} /></View>,
    Oferecer: <View style={[ico.plus, { borderColor: color }]}><View style={[ico.plusH, { backgroundColor: color }]} /><View style={[ico.plusV, { backgroundColor: color }]} /></View>,
    Matches: <View style={[ico.check, { borderColor: color }]}><View style={[ico.checkMark, { borderColor: color }]} /></View>,
    Perfil: <View style={[ico.avatar, { borderColor: color }]}><View style={[ico.avatarHead, { backgroundColor: color }]} /></View>,
  };
  return <View style={ico.wrap}>{icons[name]}</View>;
}

const ico = StyleSheet.create({
  wrap: { width: 24, height: 24, justifyContent: 'center', alignItems: 'center' },
  house: { width: 18, height: 14, borderWidth: 1.5, borderRadius: 2, marginTop: 4 },
  houseRoof: { position: 'absolute', top: -8, left: -3, width: 0, height: 0, borderLeftWidth: 12, borderRightWidth: 12, borderBottomWidth: 8, borderLeftColor: 'transparent', borderRightColor: 'transparent' },
  circle: { width: 18, height: 18, borderRadius: 9, borderWidth: 1.5, justifyContent: 'center', alignItems: 'center' },
  dot: { width: 6, height: 6, borderRadius: 3 },
  plus: { width: 18, height: 18, borderRadius: 4, borderWidth: 1.5, justifyContent: 'center', alignItems: 'center' },
  plusH: { position: 'absolute', width: 10, height: 1.5 },
  plusV: { position: 'absolute', width: 1.5, height: 10 },
  check: { width: 18, height: 18, borderRadius: 9, borderWidth: 1.5, justifyContent: 'center', alignItems: 'center' },
  checkMark: { width: 8, height: 5, borderLeftWidth: 1.5, borderBottomWidth: 1.5, transform: [{ rotate: '-45deg' }], marginTop: -3 },
  avatar: { width: 18, height: 18, borderRadius: 9, borderWidth: 1.5, justifyContent: 'center', alignItems: 'center' },
  avatarHead: { width: 7, height: 7, borderRadius: 3.5, marginTop: -2 },
});

const TABS = [
  { name: 'Home',     component: HomeScreen,           label: 'Início'   },
  { name: 'Buscar',   component: BuscarCaronaScreen,   label: 'Buscar'   },
  { name: 'Oferecer', component: OferecerCaronaScreen, label: 'Oferecer' },
  { name: 'Matches',  component: MatchesScreen,        label: 'Matches'  },
  { name: 'Perfil',   component: PerfilScreen,         label: 'Perfil'   },
];

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused }) => <TabIcon name={route.name} focused={focused} />,
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.textMuted,
        tabBarStyle: {
          backgroundColor: Colors.white,
          borderTopColor: Colors.border,
          borderTopWidth: 1,
          height: 64,
          paddingBottom: 10,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: '600',
          letterSpacing: 0.3,
        },
      })}
    >
      {TABS.map(t => (
        <Tab.Screen
          key={t.name}
          name={t.name}
          component={t.component}
          options={{ tabBarLabel: t.label }}
        />
      ))}
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login"    component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Main"     component={MainTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
