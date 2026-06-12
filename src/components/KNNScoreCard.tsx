import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Font, Radius } from '../utils/theme';
import { KNNResultado } from '../utils/knn';

interface Props { resultado: KNNResultado }

function scoreColor(s: number) {
  return s >= 75 ? Colors.scoreHigh : s >= 45 ? Colors.scoreMid : Colors.scoreLow;
}

function ScoreBar({ label, score, detail }: { label: string; score: number; detail: string }) {
  const cor = scoreColor(score);
  return (
    <View style={styles.barRow}>
      <View style={styles.barMeta}>
        <Text style={styles.barLabel}>{label}</Text>
        <Text style={styles.barDetail}>{detail}</Text>
      </View>
      <View style={styles.barRight}>
        <View style={styles.track}>
          <View style={[styles.fill, { width: `${score}%` as any, backgroundColor: cor }]} />
        </View>
        <Text style={[styles.barScore, { color: cor }]}>{score}%</Text>
      </View>
    </View>
  );
}

export default function KNNScoreCard({ resultado }: Props) {
  const { scoreGeral, scoreLocalizacao, scoreHorario, scoreDestino } = resultado;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Análise KNN</Text>
          <Text style={styles.subtitle}>K-Nearest Neighbours · distância euclidiana normalizada</Text>
        </View>
        <View style={styles.badge}>
          <Text style={styles.badgeNum}>{scoreGeral}</Text>
          <Text style={styles.badgePct}>%</Text>
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.bars}>
        <ScoreBar label="Localização"  score={scoreLocalizacao} detail="peso 40%" />
        <ScoreBar label="Horário"      score={scoreHorario}     detail="peso 35%" />
        <ScoreBar label="Destino"      score={scoreDestino}     detail="peso 25%" />
      </View>

      <Text style={styles.note}>
        Score = distância euclidiana ponderada entre seu perfil e a oferta. Quanto maior, mais compatível.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.bg,
    borderRadius: Radius.md,
    padding: 16,
    marginTop: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 14,
  },
  title: { fontSize: Font.md, fontWeight: '700', color: Colors.textPrimary },
  subtitle: { fontSize: Font.xs, color: Colors.textMuted, marginTop: 3, maxWidth: 200 },
  badge: {
    backgroundColor: Colors.primary,
    width: 50, height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  badgeNum: { fontSize: Font.xl, fontWeight: '700', color: Colors.white },
  badgePct: { fontSize: Font.xs, color: 'rgba(255,255,255,0.7)', marginTop: 4 },
  divider: { height: 1, backgroundColor: Colors.border, marginBottom: 14 },
  bars: { gap: 12 },
  barRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  barMeta: { width: 90 },
  barLabel: { fontSize: Font.sm, fontWeight: '600', color: Colors.textPrimary },
  barDetail: { fontSize: Font.xs, color: Colors.textMuted, marginTop: 1 },
  barRight: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 8 },
  track: {
    flex: 1, height: 5,
    backgroundColor: Colors.border,
    borderRadius: 3, overflow: 'hidden',
  },
  fill: { height: 5, borderRadius: 3 },
  barScore: { fontSize: Font.sm, fontWeight: '700', width: 36, textAlign: 'right' },
  note: {
    fontSize: Font.xs,
    color: Colors.textMuted,
    lineHeight: 17,
    marginTop: 14,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    paddingTop: 12,
  },
});
