import React, { useState } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet,
  ScrollView, ActivityIndicator,
} from 'react-native';
import { Colors, Font, Radius } from '../utils/theme';
import { CaronasStore, DESTINOS_PADRAO } from '../data/caronasStore';
import { knnMatchCaronas, KNNResultado } from '../utils/knn';
import KNNScoreCard from '../components/KNNScoreCard';
import RouteMap from '../components/RouteMap';

export default function BuscarCaronaScreen() {
  const [origemIdx,  setOrigemIdx]  = useState<number | null>(null);
  const [destinoIdx, setDestinoIdx] = useState<number | null>(null);
  const [horario,    setHorario]    = useState<string | null>(null);
  const [resultados, setResultados] = useState<KNNResultado[]>([]);
  const [expandido,  setExpandido]  = useState<string | null>(null);
  const [buscando,   setBuscando]   = useState(false);
  const [erro,       setErro]       = useState('');

  const HORARIOS = ['06:00','07:30','12:00','14:30','17:30','18:30','19:00','21:00'];

  const buscar = () => {
    if (origemIdx === null || destinoIdx === null || !horario) {
      setErro('Selecione origem, destino e horário.'); return;
    }
    if (origemIdx === destinoIdx) {
      setErro('Origem e destino precisam ser diferentes.'); return;
    }
    setErro('');
    setBuscando(true);

    setTimeout(() => {
      const res = knnMatchCaronas(
        {
          origemCoord:  DESTINOS_PADRAO[origemIdx].coord,
          destinoNome:  DESTINOS_PADRAO[destinoIdx].nome,
          destinoCoord: DESTINOS_PADRAO[destinoIdx].coord,
          horario,
        },
        CaronasStore.getCaronas(),
        5
      );
      setResultados(res);
      setBuscando(false);
      setExpandido(null);
    }, 800);
  };

  const solicitar = (caronaId: string) => {
    CaronasStore.addMatch(caronaId, 'Você');
    setResultados(prev => prev.filter(r => r.carona.id !== caronaId));
    setExpandido(null);
  };

  return (
    <View style={styles.root}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Buscar carona</Text>
        <Text style={styles.headerSub}>K-Nearest Neighbours · 5 melhores matches</Text>
      </View>

      <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>
        {erro ? <Text style={styles.erroMsg}>{erro}</Text> : null}

        {/* Filtros */}
        <Text style={styles.filterLabel}>PARTIDA</Text>
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

        <Text style={styles.filterLabel}>DESTINO</Text>
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

        <Text style={styles.filterLabel}>HORÁRIO</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipRow}>
          {HORARIOS.map((h) => (
            <TouchableOpacity
              key={h}
              style={[styles.chip, horario === h && styles.chipSel]}
              onPress={() => { setHorario(h); setErro(''); }}
            >
              <Text style={[styles.chipTxt, horario === h && styles.chipTxtSel]}>{h}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <TouchableOpacity
          style={[styles.btn, buscando && { opacity: 0.6 }]}
          onPress={buscar}
          disabled={buscando}
          activeOpacity={0.9}
        >
          {buscando
            ? <ActivityIndicator color={Colors.white} />
            : <Text style={styles.btnTxt}>Executar KNN</Text>}
        </TouchableOpacity>

        {/* Resultados */}
        {resultados.length > 0 && (
          <View style={styles.results}>
            <Text style={styles.resultsLabel}>
              {resultados.length} RESULTADOS · ordenados por distância KNN
            </Text>

            {resultados.map((res, idx) => {
              const { carona } = res;
              const aberto = expandido === carona.id;
              const corScore = res.scoreGeral >= 75 ? Colors.scoreHigh
                : res.scoreGeral >= 45 ? Colors.scoreMid : Colors.scoreLow;

              return (
                <View key={carona.id} style={styles.card}>
                  {/* Topo do card */}
                  <View style={styles.cardHeader}>
                    <View style={styles.rankTag}>
                      <Text style={styles.rankTxt}>#{idx + 1}</Text>
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.motoristaNome}>{carona.motorista}</Text>
                      <Text style={styles.motoristaInfo}>RA {carona.ra} · {carona.rating} estrelas</Text>
                    </View>
                    <View style={[styles.scorePill, { borderColor: corScore }]}>
                      <Text style={[styles.scorePillTxt, { color: corScore }]}>{res.scoreGeral}%</Text>
                    </View>
                  </View>

                  {/* Rota */}
                  <View style={styles.routeBlock}>
                    <View style={styles.routeRow}>
                      <View style={styles.dotBlue} />
                      <Text style={styles.routeTxt} numberOfLines={1}>{carona.origemNome}</Text>
                    </View>
                    <View style={styles.routeConnector} />
                    <View style={styles.routeRow}>
                      <View style={styles.dotGreen} />
                      <Text style={styles.routeTxt} numberOfLines={1}>{carona.destinoNome}</Text>
                    </View>
                  </View>

                  {/* Meta */}
                  <View style={styles.metaRow}>
                    <View style={styles.metaItem}>
                      <Text style={styles.metaLabel}>HORÁRIO</Text>
                      <Text style={styles.metaValue}>{carona.horario}</Text>
                    </View>
                    <View style={styles.metaDivider} />
                    <View style={styles.metaItem}>
                      <Text style={styles.metaLabel}>VAGAS</Text>
                      <Text style={styles.metaValue}>{carona.vagas}</Text>
                    </View>
                    <View style={styles.metaDivider} />
                    <View style={styles.metaItem}>
                      <Text style={styles.metaLabel}>PREÇO</Text>
                      <Text style={styles.metaValue}>R$ {carona.preco.toFixed(2)}</Text>
                    </View>
                    <View style={styles.metaDivider} />
                    <View style={styles.metaItem}>
                      <Text style={styles.metaLabel}>VEÍCULO</Text>
                      <Text style={styles.metaValue} numberOfLines={1}>{carona.veiculo.split(' ').slice(0,2).join(' ')}</Text>
                    </View>
                  </View>

                  {/* Mapa */}
                  <View style={styles.mapContainer}>
                    <RouteMap
                      origem={carona.origemCoord}
                      destino={carona.destinoCoord}
                      height={180}
                    />
                    <View style={styles.mapLegend}>
                      <View style={styles.legendRow}>
                        <View style={[styles.legendDot, { backgroundColor: Colors.primary }]} />
                        <Text style={styles.legendTxt}>Partida</Text>
                      </View>
                      <View style={styles.legendRow}>
                        <View style={[styles.legendDot, { backgroundColor: Colors.accent }]} />
                        <Text style={styles.legendTxt}>Destino</Text>
                      </View>
                    </View>
                  </View>

                  {/* Toggle KNN */}
                  <TouchableOpacity
                    style={styles.knnToggle}
                    onPress={() => setExpandido(aberto ? null : carona.id)}
                  >
                    <Text style={styles.knnToggleTxt}>
                      {aberto ? 'Ocultar análise KNN' : 'Ver análise KNN completa'}
                    </Text>
                    <Text style={styles.knnToggleArrow}>{aberto ? '↑' : '↓'}</Text>
                  </TouchableOpacity>

                  {aberto && <KNNScoreCard resultado={res} />}

                  <TouchableOpacity
                    style={styles.solicitarBtn}
                    onPress={() => solicitar(carona.id)}
                    activeOpacity={0.9}
                  >
                    <Text style={styles.solicitarTxt}>Solicitar esta carona</Text>
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>
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
  erroMsg: {
    fontSize: Font.sm, color: Colors.danger,
    backgroundColor: '#FEF2F2', borderRadius: Radius.sm,
    padding: 12, marginBottom: 16,
  },
  filterLabel: {
    fontSize: Font.xs, fontWeight: '700',
    color: Colors.textMuted, letterSpacing: 1.2,
    marginBottom: 10, marginTop: 20,
  },
  chipRow: { marginBottom: 0 },
  chip: {
    borderWidth: 1, borderColor: Colors.border,
    borderRadius: Radius.full, paddingHorizontal: 14,
    paddingVertical: 8, marginRight: 8,
  },
  chipSel: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  chipTxt: { fontSize: Font.sm, color: Colors.textSecondary, fontWeight: '500' },
  chipTxtSel: { color: Colors.white, fontWeight: '600' },
  btn: {
    backgroundColor: Colors.primary,
    borderRadius: Radius.md, padding: 17,
    alignItems: 'center', marginTop: 28,
  },
  btnTxt: { color: Colors.white, fontSize: Font.md, fontWeight: '600' },

  results: { marginTop: 32 },
  resultsLabel: {
    fontSize: Font.xs, fontWeight: '700',
    color: Colors.textMuted, letterSpacing: 1, marginBottom: 16,
  },

  card: {
    backgroundColor: Colors.white,
    borderRadius: Radius.lg,
    marginBottom: 20,
    borderWidth: 1, borderColor: Colors.border,
    overflow: 'hidden',
  },
  cardHeader: {
    flexDirection: 'row', alignItems: 'center',
    gap: 12, padding: 16, paddingBottom: 12,
  },
  rankTag: {
    width: 32, height: 32, borderRadius: Radius.sm,
    backgroundColor: Colors.bg, borderWidth: 1, borderColor: Colors.border,
    justifyContent: 'center', alignItems: 'center',
  },
  rankTxt: { fontSize: Font.sm, fontWeight: '700', color: Colors.textPrimary },
  motoristaNome: { fontSize: Font.md, fontWeight: '700', color: Colors.textPrimary },
  motoristaInfo: { fontSize: Font.xs, color: Colors.textMuted, marginTop: 2 },
  scorePill: {
    borderWidth: 1.5, borderRadius: Radius.full,
    paddingHorizontal: 10, paddingVertical: 4,
  },
  scorePillTxt: { fontSize: Font.sm, fontWeight: '700' },

  routeBlock: {
    marginHorizontal: 16,
    padding: 14,
    backgroundColor: Colors.bg,
    borderRadius: Radius.md,
    borderWidth: 1, borderColor: Colors.border,
    marginBottom: 14,
  },
  routeRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  routeConnector: { width: 1.5, height: 10, backgroundColor: Colors.border, marginLeft: 5, marginVertical: 3 },
  dotBlue: { width: 10, height: 10, borderRadius: 5, backgroundColor: Colors.primary },
  dotGreen: { width: 10, height: 10, borderRadius: 5, backgroundColor: Colors.accent },
  routeTxt: { fontSize: Font.sm, color: Colors.textSecondary, flex: 1 },

  metaRow: {
    flexDirection: 'row',
    marginHorizontal: 16, marginBottom: 14,
    borderWidth: 1, borderColor: Colors.border,
    borderRadius: Radius.md, padding: 12,
  },
  metaItem: { flex: 1, alignItems: 'center' },
  metaLabel: { fontSize: 10, fontWeight: '700', color: Colors.textMuted, letterSpacing: 0.8 },
  metaValue: { fontSize: Font.sm, fontWeight: '700', color: Colors.textPrimary, marginTop: 3 },
  metaDivider: { width: 1, backgroundColor: Colors.border },

  mapContainer: {
    marginHorizontal: 16,
    marginBottom: 0,
    borderRadius: Radius.md,
    overflow: 'hidden',
    borderWidth: 1, borderColor: Colors.border,
  },
  mapLegend: {
    flexDirection: 'row', gap: 16, padding: 10,
    backgroundColor: Colors.bg,
    borderTopWidth: 1, borderTopColor: Colors.border,
  },
  legendRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  legendDot: { width: 8, height: 8, borderRadius: 4 },
  legendTxt: { fontSize: Font.xs, color: Colors.textSecondary, fontWeight: '500' },

  knnToggle: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center',
    padding: 14, marginHorizontal: 0,
    borderTopWidth: 1, borderTopColor: Colors.border,
  },
  knnToggleTxt: { fontSize: Font.sm, color: Colors.primary, fontWeight: '600' },
  knnToggleArrow: { fontSize: Font.md, color: Colors.primary },

  solicitarBtn: {
    backgroundColor: Colors.primary,
    margin: 16, marginTop: 0,
    borderRadius: Radius.md, padding: 15,
    alignItems: 'center',
  },
  solicitarTxt: { color: Colors.white, fontWeight: '600', fontSize: Font.md },
});
