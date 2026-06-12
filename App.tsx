import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';

import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import HomeScreen from './src/screens/HomeScreen';
import BuscarCaronaScreen from './src/screens/BuscarCaronaScreen';
import OferecerCaronaScreen from './src/screens/OferecerCaronaScreen';
import MatchesScreen from './src/screens/MatchesScreen';
import PerfilScreen from './src/screens/PerfilScreen';
import { Colors } from './src/utils/theme';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TABS = [
  { name: 'Home',     component: HomeScreen,           emoji: '🏠', label: 'Início'  },
  { name: 'Buscar',   component: BuscarCaronaScreen,   emoji: '🔍', label: 'Buscar'  },
  { name: 'Oferecer', component: OferecerCaronaScreen, emoji: '🚗', label: 'Oferecer'},
  { name: 'Matches',  component: MatchesScreen,        emoji: '🤝', label: 'Matches' },
  { name: 'Perfil',   component: PerfilScreen,         emoji: '👤', label: 'Perfil'  },
];

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => {
        const tab = TABS.find(t => t.name === route.name)!;
        return {
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Text style={{ fontSize: focused ? 22 : 20 }}>{tab.emoji}</Text>
          ),
          tabBarLabel: tab.label,
          tabBarActiveTintColor: Colors.primary,
          tabBarInactiveTintColor: '#8FA3B4',
          tabBarStyle: {
            backgroundColor: '#fff',
            borderTopColor: '#DDE4EC',
            borderTopWidth: 1,
            height: 64,
            paddingBottom: 8,
          },
          tabBarLabelStyle: {
            fontSize: 11,
            fontWeight: '600',
          },
        };
      }}
    >
      {TABS.map(t => (
        <Tab.Screen key={t.name} name={t.name} component={t.component} />
      ))}
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Login"    component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Main"     component={MainTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
