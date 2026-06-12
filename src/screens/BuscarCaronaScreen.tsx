import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Platform,
} from 'react-native';
import { Colors, Font, Radius } from '../utils/theme';
import { CaronasStore, DESTINOS_PADRAO } from '../data/caronasStore';
import { knnMatchCaronas, KNNResultado, Coordenada } from '../utils/knn';
import KNNScoreCard from '../components/KNNScoreCard';
import MapaWeb from '../components/MapaWeb';

// Converte "HH:MM" para exibição
function fmtHorario(h: string) { return h; }

// Gera rota simplificada (linha reta entre 2 pontos com ponto intermediário)
function gerarRota(a: Coordenada, b: Coordenada): Coordenada[] {
  const mid = {
    latitude: (a.latitude + b.latitude) / 2 + 0.003,
    longitude: (a.longitude + b.longitude) / 2,
  };
  return [a, mid, b];
}

export default function BuscarCaronaScreen() {
  const [origemIdx, setOrigemIdx] = useState<number | null>(null);
  const [destinoIdx, setDestinoIdx] = useState<number | null>(null);
  const [horario, setHorario] = useState<string | null>(null);
  const [resultados, setResultados] = useState<KNNResultado[]>([]);
  const [expandido, setExpandido] = useState<string | null>(null);
  const [buscando, setBuscando] = useState(false);
  const [erro, setErro] = useState('');

  const HORARIOS = ['06:00','07:30','12:00','14:30','17:30','18:30','19:00','21:00'];

  const buscar = () => {
    if (origemIdx === null || destinoIdx === null || !horario) {
      setErro('Selecione origem, destino e horário.'); return;
    }
    if (origemIdx === destinoIdx) {
      setErro('Origem e destino não podem ser iguais.'); return;
    }
    setErro('');
    setBuscando(true);

    // Simula latência do algoritmo
    setTimeout(() => {
      const perfil = {
        origemCoord: DESTINOS_PADRAO[origemIdx].coord,
        destinoNome: DESTINOS_PADRAO[destinoIdx].nome,
        destinoCoord: DESTINOS_PADRAO[destinoIdx].coord,
        horario: horario,
      };
      const res = knnMatchCaronas(perfil, CaronasStore.getCaronas(), 5);
      setResultados(res);
      setBuscando(false);
      setExpandido(null);
    }, 900);
  };

  const solicitarCarona = (caronaId: string, nomeMotorista: string) => {
    CaronasStore.addMatch(caronaId, 'Você');
    setResultados(prev => prev.filter(r => r.carona.id !== caronaId));
    setExpandido(null);
  };

  return (
    <View style={styles.root}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Buscar Carona</Text>
        <Text style={styles.headerSub}>KNN analisa localização, horário e destino</Text>
      </View>

      <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>
        {erro ? <Text style={styles.erroMsg}>{erro}</Text> : null}

        {/* Origem */}
        <Text style={styles.label}>📍  De onde você sai?</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chips}>
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

        {/* Destino */}
        <Text style={styles.label}>🏁  Para onde vai?</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chips}>
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

        {/* Horário */}
        <Text style={styles.label}>🕒  Horário desejado</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chips}>
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

        {/* Botão buscar */}
        <TouchableOpacity
          style={[styles.btn, buscando && styles.btnDisabled]}
          onPress={buscar}
          disabled={buscando}
          activeOpacity={0.85}
        >
          {buscando
            ? <ActivityIndicator color={Colors.white} />
            : <Text style={styles.btnTxt}>Buscar com KNN</Text>}
        </TouchableOpacity>

        {/* Resultados */}
        {resultados.length > 0 && (
          <View style={styles.resultSection}>
            <Text style={styles.resultHeader}>
              {resultados.length} matches encontrados
            </Text>

            {resultados.map((res, idx) => {
              const { carona } = res;
              const aberto = expandido === carona.id;
              const corScore = res.scoreGeral >= 75
                ? Colors.scoreHigh
                : res.scoreGeral >= 45
                ? Colors.scoreMid
                : Colors.scoreLow;

              return (
                <View key={carona.id} style={styles.card}>
                  {/* Rank badge */}
                  <View style={[styles.rankBadge, { backgroundColor: idx === 0 ? Colors.accent : Colors.primary }]}>
                    <Text style={styles.rankTxt}>#{idx + 1}</Text>
                  </View>

                  {/* Cabeçalho do card */}
                  <View style={styles.cardTop}>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.motoristaNome}>{carona.motorista}</Text>
                      <Text style={styles.motoristaInfo}>RA {carona.ra}  ·  ⭐ {carona.rating}</Text>
                    </View>
                    <View style={[styles.scorePill, { backgroundColor: corScore + '18', borderColor: corScore }]}>
                      <Text style={[styles.scorePillTxt, { color: corScore }]}>{res.scoreGeral}%</Text>
                    </View>
                  </View>

                  {/* Rota e detalhes */}
                  <View style={styles.routeLine}>
                    <View style={styles.routeDot} />
                    <Text style={styles.routeTxt}>{carona.origemNome}</Text>
                  </View>
                  <View style={styles.routeLine}>
                    <View style={[styles.routeDot, { backgroundColor: Colors.accent }]} />
                    <Text style={styles.routeTxt}>{carona.destinoNome}</Text>
                  </View>

                  <View style={styles.infoRow}>
                    <Text style={styles.infoChip}>🕒 {fmtHorario(carona.horario)}</Text>
                    <Text style={styles.infoChip}>💺 {carona.vagas} vagas</Text>
                    <Text style={styles.infoChip}>💵 R$ {carona.preco.toFixed(2)}</Text>
                  </View>

                      {/* Mapa da rota */}
                  <View style={styles.mapBox}>
                    <MapaWeb
                      origem={carona.origemCoord}
                      destino={carona.destinoCoord}
                    />

                    <View style={styles.mapLegend}>
                      <View style={styles.mapLegendItem}>
                        <View
                          style={[
                            styles.mapDot,
                            { backgroundColor: Colors.primary }
                          ]}
                        />
                        <Text style={styles.mapLegendTxt}>Partida</Text>
                      </View>

                      <View style={styles.mapLegendItem}>
                        <View
                          style={[
                            styles.mapDot,
                            { backgroundColor: Colors.accent }
                          ]}
                        />
                        <Text style={styles.mapLegendTxt}>Destino</Text>
                      </View>
                    </View>
                  </View>

                  {/* KNN Score Card expansível */}
                  <TouchableOpacity
                    style={styles.knnToggle}
                    onPress={() => setExpandido(aberto ? null : carona.id)}
                  >
                    <Text style={styles.knnToggleTxt}>
                      {aberto ? '▲ Ocultar análise KNN' : '▼ Ver análise KNN'}
                    </Text>
                  </TouchableOpacity>

                  {aberto && <KNNScoreCard resultado={res} />}

                  {/* Veículo */}
                  <Text style={styles.veiculoTxt}>🚗 {carona.veiculo}</Text>

                  {/* Ação */}
                  <TouchableOpacity
                    style={styles.solicitarBtn}
                    onPress={() => solicitarCarona(carona.id, carona.motorista)}
                    activeOpacity={0.85}
                  >
                    <Text style={styles.solicitarTxt}>Solicitar carona</Text>
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
  root: { flex: 1, backgroundColor: Colors.bg },
  header: {
    backgroundColor: Colors.primary,
    paddingTop: 56, paddingBottom: 24, paddingHorizontal: 24,
  },
  headerTitle: { fontSize: Font.xxl, fontWeight: '800', color: Colors.white },
  headerSub: { fontSize: Font.sm, color: '#A8CDE6', marginTop: 4 },
  body: { padding: 20 },
  erroMsg: {
    fontSize: Font.sm, color: Colors.danger,
    backgroundColor: '#FDE8E8', borderRadius: Radius.sm,
    padding: 12, marginBottom: 16,
  },
  label: { fontSize: Font.sm, fontWeight: '700', color: Colors.textSecondary, marginBottom: 8, marginTop: 16 },
  chips: { marginBottom: 4 },
  chip: {
    borderWidth: 1.5, borderColor: Colors.border,
    borderRadius: Radius.full, paddingHorizontal: 14,
    paddingVertical: 8, marginRight: 8,
    backgroundColor: Colors.white,
  },
  chipSel: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  chipTxt: { fontSize: Font.sm, color: Colors.textSecondary, fontWeight: '500' },
  chipTxtSel: { color: Colors.white, fontWeight: '700' },
  btn: {
    backgroundColor: Colors.primary,
    borderRadius: Radius.md, padding: 18,
    alignItems: 'center', marginTop: 24,
    shadowColor: Colors.primary, shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2, shadowRadius: 8, elevation: 5,
  },
  btnDisabled: { opacity: 0.6 },
  btnTxt: { color: Colors.white, fontSize: Font.lg, fontWeight: '800' },

  resultSection: { marginTop: 28 },
  resultHeader: { fontSize: Font.lg, fontWeight: '700', color: Colors.textPrimary, marginBottom: 16 },

  card: {
    backgroundColor: Colors.white,
    borderRadius: Radius.xl, padding: 18,
    marginBottom: 18,
    shadowColor: '#0A5C8A', shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1, shadowRadius: 10, elevation: 5,
  },
  rankBadge: {
    position: 'absolute', top: 14, right: 14,
    width: 32, height: 32, borderRadius: 16,
    justifyContent: 'center', alignItems: 'center',
  },
  rankTxt: { fontSize: Font.sm, fontWeight: '800', color: Colors.white },
  cardTop: { flexDirection: 'row', alignItems: 'center', marginBottom: 14, paddingRight: 40 },
  motoristaNome: { fontSize: Font.lg, fontWeight: '700', color: Colors.textPrimary },
  motoristaInfo: { fontSize: Font.xs, color: Colors.textMuted, marginTop: 2 },
  scorePill: {
    borderWidth: 1.5, borderRadius: Radius.full,
    paddingHorizontal: 10, paddingVertical: 4,
  },
  scorePillTxt: { fontSize: Font.sm, fontWeight: '800' },
  routeLine: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 6 },
  routeDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: Colors.primary },
  routeTxt: { fontSize: Font.sm, color: Colors.textSecondary, flex: 1 },
  infoRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 10, marginBottom: 12 },
  infoChip: {
    fontSize: Font.xs, color: Colors.textSecondary,
    backgroundColor: Colors.bg, borderRadius: Radius.full,
    paddingHorizontal: 10, paddingVertical: 4,
    borderWidth: 1, borderColor: Colors.border,
    fontWeight: '500',
  },
  mapBox: {
    borderRadius: Radius.md, overflow: 'hidden',
    marginVertical: 12, borderWidth: 1, borderColor: Colors.border,
  },
  map: {
  height: 180,
},
  mapLegend: {
    flexDirection: 'row', gap: 16, padding: 10,
    backgroundColor: Colors.bg,
  },
  mapLegendItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  mapDot: { width: 10, height: 10, borderRadius: 5 },
  mapLegendTxt: { fontSize: Font.xs, color: Colors.textSecondary, fontWeight: '500' },
  knnToggle: {
    paddingVertical: 10, alignItems: 'center',
    borderTopWidth: 1, borderTopColor: Colors.border, marginTop: 4,
  },
  knnToggleTxt: { fontSize: Font.sm, color: Colors.primary, fontWeight: '700' },
  veiculoTxt: {
    fontSize: Font.sm, color: Colors.textMuted,
    marginTop: 12, fontStyle: 'italic',
  },
  solicitarBtn: {
    backgroundColor: Colors.accent,
    borderRadius: Radius.md, padding: 14,
    alignItems: 'center', marginTop: 14,
    shadowColor: Colors.accent, shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2, shadowRadius: 6, elevation: 4,
  },
  solicitarTxt: { color: Colors.white, fontWeight: '800', fontSize: Font.md },
});
