import React, { useState, useCallback } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet,
  ScrollView, Alert,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Colors, Font, Radius } from '../utils/theme';
import { CaronasStore } from '../data/caronasStore';
import { CaronaOferta } from '../utils/knn';

interface MatchView {
  carona: CaronaOferta;
  status: 'aguardando' | 'confirmada';
}

export default function MatchesScreen() {
  const [matches, setMatches] = useState<MatchView[]>([]);

  const carregar = useCallback(() => {
    const ms = CaronasStore.getMatches();
    const views: MatchView[] = ms.map(m => ({
      carona: CaronasStore.getCaronaById(m.caronaId)!,
      status: m.status,
    })).filter(m => m.carona);
    setMatches(views);
  }, []);

  useFocusEffect(carregar);

  const confirmar = (id: string) => {
    CaronasStore.confirmarMatch(id);
    carregar();
    Alert.alert('✅ Confirmado!', 'Carona confirmada. Boa viagem!');
  };

  const cancelar = (id: string) => {
    Alert.alert('Cancelar carona', 'Tem certeza?', [
      { text: 'Não' },
      { text: 'Sim', style: 'destructive', onPress: () => { CaronasStore.cancelarMatch(id); carregar(); } },
    ]);
  };

  const statusCor = (s: string) => s === 'confirmada' ? Colors.accent : Colors.warning;
  const statusLabel = (s: string) => s === 'confirmada' ? '✅ Confirmada' : '⏳ Aguardando';

  return (
    <View style={styles.root}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Meus Matches</Text>
        <Text style={styles.headerSub}>{matches.length} carona{matches.length !== 1 ? 's' : ''} conectada{matches.length !== 1 ? 's' : ''} pelo KNN</Text>
      </View>

      <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>
        {matches.length === 0 ? (
          <View style={styles.empty}>
            <Text style={styles.emptyEmoji}>🤝</Text>
            <Text style={styles.emptyTitle}>Nenhum match ainda</Text>
            <Text style={styles.emptySub}>
              Busque caronas e solicite para aparecer aqui.
            </Text>
          </View>
        ) : (
          matches.map(({ carona, status }) => (
            <View key={carona.id} style={styles.card}>
              <View style={styles.cardTop}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.motoristaNome}>{carona.motorista}</Text>
                  <Text style={styles.ra}>RA {carona.ra}</Text>
                </View>
                <View style={[styles.statusBadge, { backgroundColor: statusCor(status) + '18', borderColor: statusCor(status) }]}>
                  <Text style={[styles.statusTxt, { color: statusCor(status) }]}>
                    {statusLabel(status)}
                  </Text>
                </View>
              </View>

              <View style={styles.routeBox}>
                <View style={styles.routeLine}>
                  <View style={styles.dotBlue} />
                  <Text style={styles.routeTxt}>{carona.origemNome}</Text>
                </View>
                <View style={styles.routeBar} />
                <View style={styles.routeLine}>
                  <View style={styles.dotGreen} />
                  <Text style={styles.routeTxt}>{carona.destinoNome}</Text>
                </View>
              </View>

              <View style={styles.infoRow}>
                <Text style={styles.chip}>🕒 {carona.horario}</Text>
                <Text style={styles.chip}>🚗 {carona.veiculo}</Text>
                <Text style={styles.chip}>💵 R$ {carona.preco.toFixed(2)}</Text>
                <Text style={styles.chip}>⭐ {carona.rating}</Text>
              </View>

              <View style={styles.actions}>
                {status === 'aguardando' && (
                  <TouchableOpacity
                    style={styles.btnConfirmar}
                    onPress={() => confirmar(carona.id)}
                  >
                    <Text style={styles.btnConfirmarTxt}>Confirmar</Text>
                  </TouchableOpacity>
                )}
                <TouchableOpacity
                  style={[styles.btnCancelar, status === 'confirmada' && { flex: 1 }]}
                  onPress={() => cancelar(carona.id)}
                >
                  <Text style={styles.btnCancelarTxt}>Cancelar</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}
        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.bg },
  header: {
    backgroundColor: Colors.primary,
    paddingTop: 56, paddingBottom: 24, paddingHorizontal: 24,
  },
  headerTitle: { fontSize: Font.xxl, fontWeight: '800', color: Colors.white },
  headerSub: { fontSize: Font.sm, color: '#A8CDE6', marginTop: 4 },
  body: { padding: 20 },

  empty: { alignItems: 'center', paddingTop: 80 },
  emptyEmoji: { fontSize: 56, marginBottom: 16 },
  emptyTitle: { fontSize: Font.xl, fontWeight: '700', color: Colors.textPrimary },
  emptySub: { fontSize: Font.md, color: Colors.textMuted, textAlign: 'center', marginTop: 8, maxWidth: 260 },

  card: {
    backgroundColor: Colors.white,
    borderRadius: Radius.xl, padding: 18,
    marginBottom: 16,
    shadowColor: '#0A5C8A', shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08, shadowRadius: 10, elevation: 4,
  },
  cardTop: { flexDirection: 'row', alignItems: 'center', marginBottom: 14 },
  motoristaNome: { fontSize: Font.lg, fontWeight: '700', color: Colors.textPrimary },
  ra: { fontSize: Font.xs, color: Colors.textMuted, marginTop: 2 },
  statusBadge: {
    borderWidth: 1.5, borderRadius: Radius.full,
    paddingHorizontal: 10, paddingVertical: 4,
  },
  statusTxt: { fontSize: Font.xs, fontWeight: '700' },

  routeBox: {
    backgroundColor: Colors.bg, borderRadius: Radius.md,
    padding: 12, marginBottom: 12,
  },
  routeLine: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  routeBar: { width: 2, height: 12, backgroundColor: Colors.border, marginLeft: 4, marginVertical: 2 },
  dotBlue: { width: 10, height: 10, borderRadius: 5, backgroundColor: Colors.primary },
  dotGreen: { width: 10, height: 10, borderRadius: 5, backgroundColor: Colors.accent },
  routeTxt: { fontSize: Font.sm, color: Colors.textSecondary, flex: 1 },

  infoRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginBottom: 14 },
  chip: {
    fontSize: Font.xs, color: Colors.textSecondary,
    backgroundColor: Colors.bg, borderRadius: Radius.full,
    paddingHorizontal: 10, paddingVertical: 4,
    borderWidth: 1, borderColor: Colors.border, fontWeight: '500',
  },
  actions: { flexDirection: 'row', gap: 10 },
  btnConfirmar: {
    flex: 1, backgroundColor: Colors.accent,
    borderRadius: Radius.md, padding: 12, alignItems: 'center',
  },
  btnConfirmarTxt: { color: Colors.white, fontWeight: '700', fontSize: Font.md },
  btnCancelar: {
    flex: 1, backgroundColor: '#FDE8E8',
    borderRadius: Radius.md, padding: 12, alignItems: 'center',
    borderWidth: 1, borderColor: Colors.danger + '40',
  },
  btnCancelarTxt: { color: Colors.danger, fontWeight: '700', fontSize: Font.md },
});
