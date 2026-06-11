import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';

export default function MatchesScreen() {
  const [minhasCaronas, setMinhasCaronas] = useState([
    {
      id: 1,
      tipo: "Confirmada",
      nome: "Ana Silva",
      rota: "Universidade → Terminal Central",
      horario: "14:30",
      status: "Em andamento",
      preco: "R$ 8,00",
    },
    {
      id: 2,
      tipo: "Aguardando",
      nome: "Lucas Mendes",
      rota: "Universidade → Shopping",
      horario: "17:15",
      status: "Aguardando confirmação",
      preco: "R$ 10,00",
    },
  ]);

  const confirmarCarona = (id: number) => {
    Alert.alert('✅ Sucesso', 'Carona confirmada! Boa viagem!');
  };

  const cancelarCarona = (id: number) => {
    Alert.alert('Tem certeza?', 'Deseja cancelar esta carona?', [
      { text: 'Não' },
      { text: 'Sim, cancelar', onPress: () => Alert.alert('Carona cancelada.') }
    ]);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Meus Matches</Text>
        <Text style={styles.subtitle}>Caronas conectadas por IA</Text>
      </View>

      <View style={styles.content}>
        {minhasCaronas.length === 0 ? (
          <Text style={styles.empty}>Nenhuma carona no momento</Text>
        ) : (
          minhasCaronas.map((carona) => (
            <View key={carona.id} style={styles.card}>
              <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>{carona.nome}</Text>
                <Text style={[
                  styles.status, 
                  carona.tipo === 'Confirmada' ? styles.statusConfirmada : styles.statusAguardando
                ]}>
                  {carona.tipo}
                </Text>
              </View>

              <Text style={styles.rota}>{carona.rota}</Text>
              <Text style={styles.info}>🕒 {carona.horario} • {carona.preco}</Text>

              <View style={styles.actions}>
                {carona.tipo === 'Aguardando' && (
                  <TouchableOpacity style={styles.confirmButton} onPress={() => confirmarCarona(carona.id)}>
                    <Text style={styles.confirmText}>✅ Confirmar</Text>
                  </TouchableOpacity>
                )}
                
                <TouchableOpacity style={styles.cancelButton} onPress={() => cancelarCarona(carona.id)}>
                  <Text style={styles.cancelText}>Cancelar</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  header: {
    backgroundColor: '#0066cc',
    padding: 35,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  subtitle: {
    fontSize: 16,
    color: '#e6f0ff',
    marginTop: 8,
  },
  content: {
    padding: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 15,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  status: {
    fontSize: 14,
    fontWeight: 'bold',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },
  statusConfirmada: {
    backgroundColor: '#d4edda',
    color: '#155724',
  },
  statusAguardando: {
    backgroundColor: '#fff3cd',
    color: '#856404',
  },
  rota: {
    fontSize: 16,
    color: '#0066cc',
    fontWeight: '600',
    marginBottom: 8,
  },
  info: {
    fontSize: 15,
    color: '#555',
    marginBottom: 15,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  confirmButton: {
    flex: 1,
    backgroundColor: '#00cc66',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  confirmText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#ff4444',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  cancelText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  empty: {
    textAlign: 'center',
    fontSize: 18,
    color: '#888',
    marginTop: 50,
  },
});