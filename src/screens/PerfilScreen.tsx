import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert, Image } from 'react-native';

export default function PerfilScreen() {
  const [usuario] = useState({
    nome: "Gabriel Felipe Alexandre dos Santos",
    ra: "25362250-2",
    email: "gabriel.santos@universidade.edu",
    campus: "Campus Principal",
    caronasOferecidas: 12,
    caronasRecebidas: 8,
    economiaCO2: "184 kg",
    rating: 4.8,
  });

  const handleLogout = () => {
    Alert.alert('Sair', 'Deseja realmente sair do Ecorrida?', [
      { text: 'Cancelar' },
      { text: 'Sair', onPress: () => Alert.alert('Você saiu do aplicativo.') }
    ]);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <Text style={styles.avatar}>👤</Text>
        </View>
        <Text style={styles.nome}>{usuario.nome}</Text>
        <Text style={styles.ra}>RA: {usuario.ra}</Text>
      </View>

      <View style={styles.infoContainer}>
        <View style={styles.infoCard}>
          <Text style={styles.infoLabel}>E-mail</Text>
          <Text style={styles.infoValue}>{usuario.email}</Text>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoLabel}>Campus</Text>
          <Text style={styles.infoValue}>{usuario.campus}</Text>
        </View>
      </View>

      <View style={styles.statsContainer}>
        <Text style={styles.sectionTitle}>Suas Estatísticas</Text>
        
        <View style={styles.statsGrid}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{usuario.caronasOferecidas}</Text>
            <Text style={styles.statLabel}>Caronas Oferecidas</Text>
          </View>
          
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{usuario.caronasRecebidas}</Text>
            <Text style={styles.statLabel}>Caronas Recebidas</Text>
          </View>

          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{usuario.economiaCO2}</Text>
            <Text style={styles.statLabel}>CO₂ Economizado</Text>
          </View>

          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{usuario.rating} ⭐</Text>
            <Text style={styles.statLabel}>Avaliação</Text>
          </View>
        </View>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionText}>✏️ Editar Perfil</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionText}>⭐ Minhas Avaliações</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.actionButton, styles.logoutButton]} onPress={handleLogout}>
          <Text style={styles.logoutText}>🚪 Sair do App</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  header: {
    backgroundColor: '#0066cc',
    padding: 40,
    alignItems: 'center',
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    borderWidth: 4,
    borderColor: '#e6f0ff',
  },
  avatar: {
    fontSize: 55,
  },
  nome: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  ra: {
    fontSize: 16,
    color: '#e6f0ff',
    marginTop: 5,
  },
  infoContainer: {
    padding: 20,
    gap: 12,
  },
  infoCard: {
    backgroundColor: '#fff',
    padding: 18,
    borderRadius: 12,
    elevation: 2,
  },
  infoLabel: {
    fontSize: 14,
    color: '#666',
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginTop: 4,
  },
  statsContainer: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  statItem: {
    backgroundColor: '#fff',
    width: '48%',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 2,
  },
  statNumber: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#0066cc',
  },
  statLabel: {
    fontSize: 13,
    color: '#666',
    textAlign: 'center',
    marginTop: 6,
  },
  actions: {
    padding: 20,
    gap: 12,
  },
  actionButton: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 2,
  },
  actionText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0066cc',
  },
  logoutButton: {
    backgroundColor: '#ff4444',
  },
  logoutText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});