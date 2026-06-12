import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, ScrollView, Alert,
} from 'react-native';
import { Colors, Font, Radius } from '../utils/theme';
import { CaronasStore, DESTINOS_PADRAO } from '../data/caronasStore';
import { CaronaOferta } from '../utils/knn';

export default function OferecerCaronaScreen({ navigation }: any) {
  const [origemIdx,  setOrigemIdx]  = useState<number | null>(null);
  const [destinoIdx, setDestinoIdx] = useState<number | null>(null);
  const [horario,    setHorario]    = useState('');
  const [vagas,      setVagas]      = useState('');
  const [preco,      setPreco]      = useState('');
  const [veiculo,    setVeiculo]    = useState('');
  const [erro,       setErro]       = useState('');

  const publicar = () => {
    if (origemIdx === null || destinoIdx === null || !horario || !vagas || !preco || !veiculo) {
      setErro('Preencha todos os campos antes de publicar.'); return;
    }
    if (!/^\d{2}:\d{2}$/.test(horario)) {
      setErro('Horário inválido. Use o formato HH:MM'); return;
    }
    if (origemIdx === destinoIdx) {
      setErro('Origem e destino precisam ser diferentes.'); return;
    }
    setErro('');

    const nova: CaronaOferta = {
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

    CaronasStore.addCarona(nova);

    Alert.alert(
      'Carona publicada',
      `De ${nova.origemNome} para ${nova.destinoNome} às ${nova.horario}.\n\nO KNN vai conectar sua rota com estudantes compatíveis.`,
      [
        { text: 'Ver buscas',  onPress: () => navigation.navigate('Buscar') },
        { text: 'OK' },
      ]
    );

    setOrigemIdx(null); setDestinoIdx(null);
    setHorario(''); setVagas(''); setPreco(''); setVeiculo('');
  };

  return (
    <View style={styles.root}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Publicar rota</Text>
        <Text style={styles.headerSub}>Sua carona entrará no pool do KNN</Text>
      </View>

      <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>
        {erro ? <Text style={styles.erroMsg}>{erro}</Text> : null}

        <Text style={styles.label}>Ponto de partida</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipRow}>
          {DESTINOS_PADRAO.map((d, i) => (
            <TouchableOpacity
              key={i}
              style={[styles.chip, origemIdx === i && styles.chipSel]}
              onPress={() => { setOrigemIdx(i); setErro(''); }}
            >
              <Text style={[styles.chipTxt, origemIdx === i && styles.chipTxtSel]}>{d.nome}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <Text style={styles.label}>Destino</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipRow}>
          {DESTINOS_PADRAO.map((d, i) => (
            <TouchableOpacity
              key={i}
              style={[styles.chip, destinoIdx === i && styles.chipSel]}
              onPress={() => { setDestinoIdx(i); setErro(''); }}
            >
              <Text style={[styles.chipTxt, destinoIdx === i && styles.chipTxtSel]}>{d.nome}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <Text style={styles.label}>Horário de saída</Text>
        <TextInput
          style={styles.input}
          placeholder="HH:MM  ex: 14:30"
          placeholderTextColor={Colors.textMuted}
          value={horario}
          onChangeText={(v) => { setHorario(v); setErro(''); }}
          keyboardType="numeric"
          maxLength={5}
        />

        <View style={styles.row}>
          <View style={styles.half}>
            <Text style={styles.label}>Vagas disponíveis</Text>
            <TextInput
              style={styles.input}
              placeholder="1 a 4"
              placeholderTextColor={Colors.textMuted}
              value={vagas}
              onChangeText={(v) => { setVagas(v); setErro(''); }}
              keyboardType="numeric"
              maxLength={1}
            />
          </View>
          <View style={styles.half}>
            <Text style={styles.label}>Preço (R$)</Text>
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

        <Text style={styles.label}>Veículo</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: Onix 2023 Branco"
          placeholderTextColor={Colors.textMuted}
          value={veiculo}
          onChangeText={(v) => { setVeiculo(v); setErro(''); }}
        />

        <TouchableOpacity style={styles.btn} onPress={publicar} activeOpacity={0.9}>
          <Text style={styles.btnText}>Publicar carona</Text>
        </TouchableOpacity>

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.white },
  header: {
    borderBottomWidth: 1, borderBottomColor: Colors.border,
    paddingTop: 56, paddingBottom: 20, paddingHorizontal: 24,
  },
  headerTitle: { fontSize: Font.xxl, fontWeight: '700', color: Colors.textPrimary, letterSpacing: -0.5 },
  headerSub: { fontSize: Font.sm, color: Colors.textMuted, marginTop: 4 },
  body: { padding: 24 },
  erroMsg: {
    fontSize: Font.sm, color: Colors.danger,
    backgroundColor: '#FEF2F2', borderRadius: Radius.sm,
    padding: 12, marginBottom: 16,
  },
  label: { fontSize: Font.sm, fontWeight: '600', color: Colors.textSecondary, marginBottom: 10, marginTop: 20 },
  chipRow: { marginBottom: 0 },
  chip: {
    borderWidth: 1, borderColor: Colors.border,
    borderRadius: Radius.full, paddingHorizontal: 14,
    paddingVertical: 8, marginRight: 8,
    backgroundColor: Colors.white,
  },
  chipSel: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  chipTxt: { fontSize: Font.sm, color: Colors.textSecondary, fontWeight: '500' },
  chipTxtSel: { color: Colors.white, fontWeight: '600' },
  input: {
    backgroundColor: Colors.bg,
    borderRadius: Radius.md, padding: 15,
    fontSize: Font.md, color: Colors.textPrimary,
    borderWidth: 1, borderColor: Colors.border,
  },
  row: { flexDirection: 'row', gap: 12 },
  half: { flex: 1 },
  btn: {
    backgroundColor: Colors.primary,
    borderRadius: Radius.md, padding: 17,
    alignItems: 'center', marginTop: 32,
  },
  btnText: { color: Colors.white, fontSize: Font.md, fontWeight: '600' },
});
