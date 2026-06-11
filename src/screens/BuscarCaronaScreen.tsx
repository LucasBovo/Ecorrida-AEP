import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';

export default function BuscarCaronaScreen() {
  const [origem, setOrigem] = useState('');
  const [destino, setDestino] = useState('');
  const [horario, setHorario] = useState('');
  const [matches, setMatches] = useState<any[]>([]);

  // Simulação da Inteligência Artificial - Matching de Caronas
  const buscarCaronas = () => {
    if (!origem || !destino) {
      Alert.alert('Erro', 'Preencha origem e destino');
      return;
    }

    // Simulação de IA - Algoritmo de Matching
    const resultadosSimulados = [
      {
        id: 1,
        nome: "Ana Silva",
        ra: "25362145",
        origem: origem,
        destino: destino,
        horario: horario || "14:30",
        preco: "R$ 8,00",
        veiculo: "Gol 1.6 - Prata",
        compatibilidade: "92% - Melhor match",
      },
      {
        id: 2,
        nome: "Lucas Mendes",
        ra: "25362278",
        origem: origem,
        destino: destino,
        horario: horario || "14:45",
        preco: "R$ 10,00",
        veiculo: "Onix 2023 - Branco",
        compatibilidade: "87%",
      },
    ];

    setMatches(resultadosSimulados);
    Alert.alert('Sucesso', `Encontramos ${resultadosSimulados.length} caronas compatíveis usando IA!`);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Buscar Carona</Text>
        <Text style={styles.subtitle}>IA está procurando os melhores matches...</Text>
      </View>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Local de Origem (ex: Universidade)"
          value={origem}
          onChangeText={setOrigem}
        />
        <TextInput
          style={styles.input}
          placeholder="Destino (ex: Terminal Central)"
          value={destino}
          onChangeText={setDestino}
        />
        <TextInput
          style={styles.input}
          placeholder="Horário aproximado (ex: 14:30)"
          value={horario}
          onChangeText={setHorario}
        />

        <TouchableOpacity style={styles.button} onPress={buscarCaronas}>
          <Text style={styles.buttonText}>🔍 BUSCAR CARONAS COM IA</Text>
        </TouchableOpacity>
      </View>

      {matches.length > 0 && (
        <View style={styles.results}>
          <Text style={styles.resultsTitle}>Matches Encontrados</Text>
          {matches.map((item) => (
            <View key={item.id} style={styles.matchCard}>
              <Text style={styles.matchName}>{item.nome}</Text>
              <Text style={styles.matchInfo}>RA: {item.ra}</Text>
              <Text style={styles.matchInfo}>🕒 {item.horario}</Text>
              <Text style={styles.matchInfo}>🚗 {item.veiculo}</Text>
              <Text style={styles.compatibilidade}>{item.compatibilidade}</Text>
              <Text style={styles.preco}>{item.preco}</Text>

              <TouchableOpacity style={styles.matchButton}>
                <Text style={styles.matchButtonText}>Solicitar Carona</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  header: {
    backgroundColor: '#0066cc',
    padding: 30,
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
  form: {
    padding: 20,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#00cc66',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: 'bold',
  },
  results: {
    padding: 20,
  },
  resultsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  matchCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
  },
  matchName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0066cc',
  },
  matchInfo: {
    fontSize: 15,
    color: '#555',
    marginVertical: 3,
  },
  compatibilidade: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#00cc66',
    marginVertical: 8,
  },
  preco: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  matchButton: {
    backgroundColor: '#0066cc',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 12,
  },
  matchButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});