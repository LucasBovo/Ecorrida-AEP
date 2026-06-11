import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';

export default function OferecerCaronaScreen() {
  const [origem, setOrigem] = useState('');
  const [destino, setDestino] = useState('');
  const [horario, setHorario] = useState('');
  const [vagas, setVagas] = useState('');
  const [preco, setPreco] = useState('');
  const [veiculo, setVeiculo] = useState('');

  const handleOferecer = () => {
    if (!origem || !destino || !horario || !vagas || !preco || !veiculo) {
      Alert.alert('Erro', 'Preencha todos os campos obrigatórios');
      return;
    }

    Alert.alert(
      '✅ Carona Publicada!', 
      'Sua carona foi publicada com sucesso!\nA IA está procurando estudantes compatíveis.',
      [{ text: 'OK' }]
    );

    // Limpa os campos após publicar
    setOrigem('');
    setDestino('');
    setHorario('');
    setVagas('');
    setPreco('');
    setVeiculo('');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Oferecer Carona</Text>
        <Text style={styles.subtitle}>Compartilhe sua rota e ajude o planeta</Text>
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>Local de Saída</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: Universidade Federal - Bloco C"
          value={origem}
          onChangeText={setOrigem}
        />

        <Text style={styles.label}>Destino</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: Terminal Rodoviário"
          value={destino}
          onChangeText={setDestino}
        />

        <Text style={styles.label}>Horário de Saída</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: 14:20"
          value={horario}
          onChangeText={setHorario}
        />

        <View style={styles.row}>
          <View style={styles.half}>
            <Text style={styles.label}>Vagas Disponíveis</Text>
            <TextInput
              style={styles.input}
              placeholder="1-4"
              value={vagas}
              onChangeText={setVagas}
              keyboardType="numeric"
            />
          </View>

          <View style={styles.half}>
            <Text style={styles.label}>Preço por Pessoa</Text>
            <TextInput
              style={styles.input}
              placeholder="R$ 8,00"
              value={preco}
              onChangeText={setPreco}
              keyboardType="numeric"
            />
          </View>
        </View>

        <Text style={styles.label}>Modelo do Veículo</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: Onix 2023 - Branco"
          value={veiculo}
          onChangeText={setVeiculo}
        />

        <TouchableOpacity style={styles.button} onPress={handleOferecer}>
          <Text style={styles.buttonText}>🚗 PUBLICAR CARONA</Text>
        </TouchableOpacity>
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
    textAlign: 'center',
  },
  form: {
    padding: 20,
  },
  label: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
    marginBottom: 6,
    marginTop: 12,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    fontSize: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  half: {
    flex: 1,
  },
  button: {
    backgroundColor: '#00cc66',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 30,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});