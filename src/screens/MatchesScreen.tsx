import React, { useState, useCallback } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert,
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
    const views: MatchView[] = ms
      .map(m => ({ carona: CaronasStore.getCaronaById(m.caronaId)!, status: m.status }))
      .filter(m => m.carona);
    setMatches(views);
  }, []);

  useFocusEffect(carregar);

  const confirmar = (id: string) => {
    CaronasStore.confirmarMatch(id);
    carregar();
    Alert.alert('Confirmado', 'Carona confirmada com sucesso.');
  };

  const cancelar = (id: string) => {
    Alert.alert('Cancelar carona', 'Tem certeza?', [
      { text: 'Não' },
      { text: 'Cancelar carona', style: 'destructive', onPress: () => { CaronasStore.cancelarMatch(id); carregar(); } },
    ]);
  };

  return (
    <View style={styles.root}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Matches</Text>
        <Text style={styles.headerSub}>
          {matches.length} carona{matches.length !== 1 ? 's' : ''} conectada{matches.length !== 1 ? 's' : ''} pelo KNN
        </Text>
      </View>

      <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>
        {matches.length === 0 ? (
          <View style={styles.empty}>
            <View style={styles.emptyIcon}>
              <View style={styles.emptyDot} />
            </View>
            <Text style={styles.emptyTitle}>Nenhuma carona ainda</Text>
            <Text style={styles.emptySub}>Busque caronas e solicite para que apareçam aqui.</Text>
          </View>
        ) : (
          matches.map(({ carona, status }) => (
            <View key={carona.id} style={styles.card}>
              <View style={styles.cardTop}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.motoristaNome}>{carona.motorista}</Text>
                  <Text style={styles.ra}>RA {carona.ra}</Text>
                </View>
                <View style={[
                  styles.statusTag,
                  { backgroundColor: status === 'confirmada' ? Colors.accentLight : '#FEF9C3' }
                ]}>
                  <Text style={[
                    styles.statusTxt,
                    { color: status === 'confirmada' ? Colors.accent : Colors.warning }
                  ]}>
                    {status === 'confirmada' ? 'Confirmada' : 'Aguardando'}
                  </Text>
                </View>
              </View>

              <View style={styles.routeBlock}>
                <View style={styles.routeRow}>
                  <View style={styles.dotBlue} />
                  <Text style={styles.routeTxt}>{carona.origemNome}</Text>
                </View>
                <View style={styles.connector} />
                <View style={styles.routeRow}>
                  <View style={styles.dotGreen} />
                  <Text style={styles.routeTxt}>{carona.destinoNome}</Text>
                </View>
              </View>

              <View style={styles.metaRow}>
                <Text style={styles.metaChip}>{carona.horario}</Text>
                <Text style={styles.metaChip}>{carona.vagas} vagas</Text>
                <Text style={styles.metaChip}>R$ {carona.preco.toFixed(2)}</Text>
                <Text style={styles.metaChip}>{carona.rating} estrelas</Text>
              </View>

              <Text style={styles.veiculo}>{carona.veiculo}</Text>

              <View style={styles.actions}>
                {status === 'aguardando' && (
                  <TouchableOpacity style={styles.btnConfirmar} onPress={() => confirmar(carona.id)}>
                    <Text style={styles.btnConfirmarTxt}>Confirmar</Text>
                  </TouchableOpacity>
                )}
                <TouchableOpacity
                  style={[styles.btnCancelar, status === 'confirmada' && styles.btnCancelarFull]}
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
  root: { flex: 1, backgroundColor: Colors.white },
  header: {
    borderBottomWidth: 1, borderBottomColor: Colors.border,
    paddingTop: 56, paddingBottom: 20, paddingHorizontal: 24,
  },
  headerTitle: { fontSize: Font.xxl, fontWeight: '700', color: Colors.textPrimary, letterSpacing: -0.5 },
  headerSub: { fontSize: Font.sm, color: Colors.textMuted, marginTop: 4 },
  body: { padding: 20 },

  empty: { alignItems: 'center', paddingTop: 80 },
  emptyIcon: {
    width: 60, height: 60, borderRadius: 16,
    backgroundColor: Colors.bg, borderWidth: 1, borderColor: Colors.border,
    justifyContent: 'center', alignItems: 'center', marginBottom: 20,
  },
  emptyDot: { width: 20, height: 20, borderRadius: 10, backgroundColor: Colors.border },
  emptyTitle: { fontSize: Font.xl, fontWeight: '700', color: Colors.textPrimary },
  emptySub: {
    fontSize: Font.sm, color: Colors.textMuted,
    textAlign: 'center', marginTop: 8, maxWidth: 240, lineHeight: 20,
  },

  card: {
    borderWidth: 1, borderColor: Colors.border,
    borderRadius: Radius.lg, marginBottom: 16, overflow: 'hidden',
  },
  cardTop: {
    flexDirection: 'row', alignItems: 'center',
    padding: 16, paddingBottom: 12,
  },
  motoristaNome: { fontSize: Font.md, fontWeight: '700', color: Colors.textPrimary },
  ra: { fontSize: Font.xs, color: Colors.textMuted, marginTop: 2 },
  statusTag: {
    paddingHorizontal: 10, paddingVertical: 4,
    borderRadius: Radius.full,
  },
  statusTxt: { fontSize: Font.xs, fontWeight: '700' },

  routeBlock: {
    marginHorizontal: 16, marginBottom: 12,
    padding: 14, backgroundColor: Colors.bg,
    borderRadius: Radius.md, borderWidth: 1, borderColor: Colors.border,
  },
  routeRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  connector: { width: 1.5, height: 10, backgroundColor: Colors.border, marginLeft: 5, marginVertical: 3 },
  dotBlue: { width: 10, height: 10, borderRadius: 5, backgroundColor: Colors.primary },
  dotGreen: { width: 10, height: 10, borderRadius: 5, backgroundColor: Colors.accent },
  routeTxt: { fontSize: Font.sm, color: Colors.textSecondary, flex: 1 },

  metaRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, paddingHorizontal: 16, marginBottom: 10 },
  metaChip: {
    fontSize: Font.xs, color: Colors.textSecondary,
    backgroundColor: Colors.bg, borderRadius: Radius.full,
    paddingHorizontal: 10, paddingVertical: 4,
    borderWidth: 1, borderColor: Colors.border, fontWeight: '500',
  },
  veiculo: { fontSize: Font.xs, color: Colors.textMuted, paddingHorizontal: 16, marginBottom: 14 },

  actions: {
    flexDirection: 'row', gap: 8,
    padding: 16, paddingTop: 0,
  },
  btnConfirmar: {
    flex: 1, backgroundColor: Colors.primary,
    borderRadius: Radius.md, padding: 13, alignItems: 'center',
  },
  btnConfirmarTxt: { color: Colors.white, fontWeight: '600', fontSize: Font.sm },
  btnCancelar: {
    flex: 1, backgroundColor: Colors.white,
    borderRadius: Radius.md, padding: 13, alignItems: 'center',
    borderWidth: 1, borderColor: Colors.border,
  },
  btnCancelarFull: { flex: 1 },
  btnCancelarTxt: { color: Colors.danger, fontWeight: '600', fontSize: Font.sm },
});
