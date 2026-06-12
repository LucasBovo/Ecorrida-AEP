import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Font, Radius, Shadow } from '../utils/theme';
import { KNNResultado } from '../utils/knn';

interface Props {
  resultado: KNNResultado;
}

function scoreColor(score: number): string {
  if (score >= 75) return Colors.scoreHigh;
  if (score >= 45) return Colors.scoreMid;
  return Colors.scoreLow;
}

function ScoreBar({ label, score, icon }: { label: string; score: number; icon: string }) {
  const cor = scoreColor(score);
  return (
    <View style={styles.barRow}>
      <Text style={styles.barIcon}>{icon}</Text>
      <View style={styles.barInfo}>
        <View style={styles.barLabelRow}>
          <Text style={styles.barLabel}>{label}</Text>
          <Text style={[styles.barValue, { color: cor }]}>{score}%</Text>
        </View>
        <View style={styles.trackBg}>
          <View style={[styles.trackFill, { width: `${score}%` as any, backgroundColor: cor }]} />
        </View>
      </View>
    </View>
  );
}

export default function KNNScoreCard({ resultado }: Props) {
  const { scoreGeral, scoreLocalizacao, scoreHorario, scoreDestino } = resultado;
  const corGeral = scoreColor(scoreGeral);

  return (
    <View style={styles.container}>
      {/* Cabeçalho com score geral */}
      <View style={styles.header}>
        <View>
          <Text style={styles.knnLabel}>Análise KNN</Text>
          <Text style={styles.knnSub}>K-Nearest Neighbours</Text>
        </View>
        <View style={[styles.scoreBadge, { backgroundColor: corGeral }]}>
          <Text style={styles.scoreNum}>{scoreGeral}</Text>
          <Text style={styles.scorePct}>%</Text>
        </View>
      </View>

      {/* Barras por atributo */}
      <View style={styles.bars}>
        <ScoreBar label="Localização de origem" score={scoreLocalizacao} icon="📍" />
        <ScoreBar label="Compatibilidade de horário" score={scoreHorario} icon="🕒" />
        <ScoreBar label="Destino compatível"   score={scoreDestino}    icon="🏁" />
      </View>

      {/* Pesos */}
      <View style={styles.weightsRow}>
        <Text style={styles.weightChip}>Localização · 40%</Text>
        <Text style={styles.weightChip}>Horário · 35%</Text>
        <Text style={styles.weightChip}>Destino · 25%</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primaryLight,
    borderRadius: Radius.lg,
    padding: 16,
    marginTop: 12,
    borderLeftWidth: 4,
    borderLeftColor: Colors.primary,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  knnLabel: {
    fontSize: Font.md,
    fontWeight: '700',
    color: Colors.primary,
  },
  knnSub: {
    fontSize: Font.xs,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  scoreBadge: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  scoreNum: {
    fontSize: Font.xl,
    fontWeight: '800',
    color: Colors.white,
  },
  scorePct: {
    fontSize: Font.xs,
    color: Colors.white,
    marginTop: 4,
    fontWeight: '600',
  },
  bars: {
    gap: 10,
  },
  barRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  barIcon: {
    fontSize: 16,
    width: 22,
    textAlign: 'center',
  },
  barInfo: {
    flex: 1,
  },
  barLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  barLabel: {
    fontSize: Font.xs,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  barValue: {
    fontSize: Font.xs,
    fontWeight: '700',
  },
  trackBg: {
    height: 6,
    backgroundColor: Colors.border,
    borderRadius: Radius.full,
    overflow: 'hidden',
  },
  trackFill: {
    height: 6,
    borderRadius: Radius.full,
  },
  weightsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: 12,
  },
  weightChip: {
    fontSize: Font.xs,
    color: Colors.primary,
    backgroundColor: Colors.white,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: Radius.full,
    fontWeight: '600',
    borderWidth: 1,
    borderColor: Colors.primaryLight,
    overflow: 'hidden',
  },
});
