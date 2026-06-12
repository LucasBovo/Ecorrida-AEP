import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, ScrollView, Alert,
} from 'react-native';
import { Colors, Font, Radius } from '../utils/theme';
import { CaronasStore, DESTINOS_PADRAO } from '../data/caronasStore';
import { CaronaOferta, Coordenada } from '../utils/knn';

export default function OferecerCaronaScreen({ navigation }: any) {
  const [origemIdx, setOrigemIdx] = useState<number | null>(null);
  const [destinoIdx, setDestinoIdx] = useState<number | null>(null);
  const [horario, setHorario] = useState('');
  const [vagas, setVagas] = useState('');
  const [preco, setPreco] = useState('');
  const [veiculo, setVeiculo] = useState('');
  const [erro, setErro] = useState('');

  const validarHorario = (h: string) => /^\d{2}:\d{2}$/.test(h);

  const publicar = () => {
    if (origemIdx === null || destinoIdx === null || !horario || !vagas || !preco || !veiculo) {
      setErro('Preencha todos os campos antes de publicar.'); return;
    }
    if (!validarHorario(horario)) {
      setErro('Horário inválido. Use o formato HH:MM (ex: 14:30).'); return;
    }
    if (origemIdx === destinoIdx) {
      setErro('Origem e destino não podem ser o mesmo local.'); return;
    }
    setErro('');

    const novaCarona: CaronaOferta = {
      id: `c_${Date.now()}`,
      motorista: 'Você',
      ra: '25362250-2',
      veiculo: veiculo.trim(),
      origemNome: DESTINOS_PADRAO[origemIdx].nome,
      origemCoord: DESTINOS_PADRAO[origemIdx].coord,
      destinoNome: DESTINOS_PADRAO[destinoIdx].nome,
      destinoCoord: DESTINOS_PADRAO[destinoIdx].coord,
      horario: horario.trim(),
      vagas: parseInt(vagas, 10),
      preco: parseFloat(preco.replace(',', '.')),
      rating: 5.0,
    };

    CaronasStore.addCarona(novaCarona);

    Alert.alert(
      '✅ Carona publicada!',
      `Sua carona de ${novaCarona.origemNome} para ${novaCarona.destinoNome} às ${novaCarona.horario} foi publicada.\n\nO KNN irá conectá-la com estudantes compatíveis.`,
      [{ text: 'Ver caronas', onPress: () => navigation.navigate('Buscar') }, { text: 'OK' }]
    );

    setOrigemIdx(null); setDestinoIdx(null);
    setHorario(''); setVagas(''); setPreco(''); setVeiculo('');
  };

  return (
    <View style={styles.root}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Oferecer Carona</Text>
        <Text style={styles.headerSub}>Sua rota entrará no algoritmo KNN</Text>
      </View>

      <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>
        {erro ? <Text style={styles.erroMsg}>{erro}</Text> : null}

        {/* Origem */}
        <Text style={styles.label}>📍  Ponto de partida</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chips}>
          {DESTINOS_PADRAO.map((d, i) => (
            <TouchableOpacity
              key={i}
              style={[styles.chip, origemIdx === i && styles.chipSelected]}
              onPress={() => { setOrigemIdx(i); setErro(''); }}
            >
              <Text style={[styles.chipText, origemIdx === i && styles.chipTextSelected]}>
                {d.nome}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Destino */}
        <Text style={styles.label}>🏁  Destino</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chips}>
          {DESTINOS_PADRAO.map((d, i) => (
            <TouchableOpacity
              key={i}
              style={[styles.chip, destinoIdx === i && styles.chipSelected]}
              onPress={() => { setDestinoIdx(i); setErro(''); }}
            >
              <Text style={[styles.chipText, destinoIdx === i && styles.chipTextSelected]}>
                {d.nome}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Campos de texto */}
        <Text style={styles.label}>🕒  Horário de saída</Text>
        <TextInput
          style={styles.input}
          placeholder="14:30"
          placeholderTextColor={Colors.textMuted}
          value={horario}
          onChangeText={(v) => { setHorario(v); setErro(''); }}
          keyboardType="numeric"
          maxLength={5}
        />

        <View style={styles.row}>
          <View style={styles.half}>
            <Text style={styles.label}>💺  Vagas</Text>
            <TextInput
              style={styles.input}
              placeholder="1 – 4"
              placeholderTextColor={Colors.textMuted}
              value={vagas}
              onChangeText={(v) => { setVagas(v); setErro(''); }}
              keyboardType="numeric"
              maxLength={1}
            />
          </View>
          <View style={styles.half}>
            <Text style={styles.label}>💵  Preço (R$)</Text>
            <TextInput
              style={styles.input}
              placeholder="8,00"
              placeholderTextColor={Colors.textMuted}
              value={preco}
              onChangeText={(v) => { setPreco(v); setErro(''); }}
              keyboardType="numeric"
            />
          </View>
        </View>

        <Text style={styles.label}>🚗  Veículo</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: Onix 2023 – Branco"
          placeholderTextColor={Colors.textMuted}
          value={veiculo}
          onChangeText={(v) => { setVeiculo(v); setErro(''); }}
        />

        <TouchableOpacity style={styles.btn} onPress={publicar} activeOpacity={0.85}>
          <Text style={styles.btnText}>Publicar carona</Text>
        </TouchableOpacity>

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.bg },
  header: {
    backgroundColor: Colors.primary,
    paddingTop: 56, paddingBottom: 24,
    paddingHorizontal: 24,
  },
  headerTitle: { fontSize: Font.xxl, fontWeight: '800', color: Colors.white },
  headerSub: { fontSize: Font.sm, color: '#A8CDE6', marginTop: 4 },
  body: { padding: 20 },
  erroMsg: {
    fontSize: Font.sm, color: Colors.danger,
    backgroundColor: '#FDE8E8', borderRadius: Radius.sm,
    padding: 12, marginBottom: 16,
  },
  label: {
    fontSize: Font.sm, fontWeight: '700',
    color: Colors.textSecondary, marginBottom: 8, marginTop: 16,
  },
  chips: { marginBottom: 4 },
  chip: {
    borderWidth: 1.5, borderColor: Colors.border,
    borderRadius: Radius.full, paddingHorizontal: 14,
    paddingVertical: 8, marginRight: 8,
    backgroundColor: Colors.white,
  },
  chipSelected: {
    backgroundColor: Colors.primary, borderColor: Colors.primary,
  },
  chipText: { fontSize: Font.sm, color: Colors.textSecondary, fontWeight: '500' },
  chipTextSelected: { color: Colors.white, fontWeight: '700' },
  input: {
    backgroundColor: Colors.white,
    borderRadius: Radius.md, padding: 14,
    fontSize: Font.md, color: Colors.textPrimary,
    borderWidth: 1.5, borderColor: Colors.border,
  },
  row: { flexDirection: 'row', gap: 12 },
  half: { flex: 1 },
  btn: {
    backgroundColor: Colors.accent,
    borderRadius: Radius.md, padding: 18,
    alignItems: 'center', marginTop: 28,
    shadowColor: Colors.accent, shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2, shadowRadius: 8, elevation: 5,
  },
  btnText: { color: Colors.white, fontSize: Font.lg, fontWeight: '800' },
});
