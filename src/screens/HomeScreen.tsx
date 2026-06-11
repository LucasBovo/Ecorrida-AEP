import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

export default function HomeScreen({ navigation }: any) {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcome}>Olá, Estudante!</Text>
        <Text style={styles.title}>Ecorrida</Text>
        <Text style={styles.subtitle}>Mobilidade inteligente e sustentável</Text>
      </View>

      <View style={styles.cardsContainer}>
        {/* Card Buscar Carona */}
        <TouchableOpacity 
          style={styles.card} 
          onPress={() => navigation.navigate('Buscar')}
        >
          <Text style={styles.cardEmoji}>🔍</Text>
          <Text style={styles.cardTitle}>Buscar Carona</Text>
          <Text style={styles.cardDesc}>Encontre a melhor carona com IA</Text>
        </TouchableOpacity>

        {/* Card Oferecer Carona */}
        <TouchableOpacity 
          style={styles.card} 
          onPress={() => navigation.navigate('Oferecer')}
        >
          <Text style={styles.cardEmoji}>🚗</Text>
          <Text style={styles.cardTitle}>Oferecer Carona</Text>
          <Text style={styles.cardDesc}>Compartilhe sua rota</Text>
        </TouchableOpacity>

        {/* Card Matches */}
        <TouchableOpacity 
          style={styles.card} 
          onPress={() => navigation.navigate('Matches')}
        >
          <Text style={styles.cardEmoji}>🤝</Text>
          <Text style={styles.cardTitle}>Meus Matches</Text>
          <Text style={styles.cardDesc}>Caronas confirmadas</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.stats}>
        <Text style={styles.statsTitle}>Impacto Ambiental Hoje</Text>
        <Text style={styles.statsNumber}>247 kg CO₂ economizados</Text>
        <Text style={styles.statsDesc}>Equivalente a 12 árvores plantadas</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    backgroundColor: '#0066cc',
    padding: 40,
    paddingTop: 60,
    alignItems: 'center',
  },
  welcome: {
    color: '#e6f0ff',
    fontSize: 18,
  },
  title: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#fff',
    marginVertical: 8,
  },
  subtitle: {
    color: '#e6f0ff',
    fontSize: 17,
    textAlign: 'center',
  },
  cardsContainer: {
    padding: 20,
    gap: 15,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  cardEmoji: {
    fontSize: 36,
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  cardDesc: {
    fontSize: 15,
    color: '#666',
  },
  stats: {
    margin: 20,
    padding: 20,
    backgroundColor: '#e6f7ff',
    borderRadius: 16,
    alignItems: 'center',
  },
  statsTitle: {
    fontSize: 16,
    color: '#0066cc',
    fontWeight: '600',
    marginBottom: 8,
  },
  statsNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0066cc',
  },
  statsDesc: {
    fontSize: 14,
    color: '#555',
    marginTop: 5,
  },
});