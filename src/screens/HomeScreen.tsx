import React from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, ScrollView, StatusBar,
} from 'react-native';
import { Colors, Font, Radius } from '../utils/theme';
import { CaronasStore } from '../data/caronasStore';

export default function HomeScreen({ navigation }: any) {
  const totalCaronas = CaronasStore.getCaronas().length;
  const co2 = (totalCaronas * 2.1).toFixed(0);

  return (
    <View style={styles.root}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.white} />
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Bom dia</Text>
            <Text style={styles.appName}>Ecorrida</Text>
          </View>
          <View style={styles.odsPill}>
            <Text style={styles.odsPillText}>ODS 11</Text>
          </View>
        </View>

        {/* Ações principais */}
        <View style={styles.actionsGrid}>
          <TouchableOpacity
            style={[styles.actionCard, styles.actionPrimary]}
            onPress={() => navigation.navigate('Buscar')}
            activeOpacity={0.88}
          >
            <Text style={styles.actionCardLabel}>BUSCAR</Text>
            <Text style={styles.actionCardTitle}>Encontrar{'\n'}carona</Text>
            <Text style={styles.actionCardSub}>KNN analisa rota e horário</Text>
          </TouchableOpacity>

          <View style={styles.actionsCol}>
            <TouchableOpacity
              style={[styles.actionCard, styles.actionSecondary]}
              onPress={() => navigation.navigate('Oferecer')}
              activeOpacity={0.88}
            >
              <Text style={styles.actionCardLabel}>OFERECER</Text>
              <Text style={[styles.actionCardTitle, { color: Colors.textPrimary, fontSize: Font.lg }]}>
                Publicar{'\n'}rota
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.actionCard, styles.actionTertiary]}
              onPress={() => navigation.navigate('Matches')}
              activeOpacity={0.88}
            >
              <Text style={styles.actionCardLabel}>MATCHES</Text>
              <Text style={[styles.actionCardTitle, { color: Colors.white, fontSize: Font.lg }]}>
                Minhas{'\n'}caronas
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Painel de impacto */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>COMUNIDADE · MARINGÁ</Text>
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statNum}>{totalCaronas}</Text>
              <Text style={styles.statLabel}>caronas{'\n'}disponíveis</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statNum}>{co2}</Text>
              <Text style={styles.statLabel}>kg CO₂{'\n'}economizados</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statNum}>847</Text>
              <Text style={styles.statLabel}>estudantes{'\n'}ativos</Text>
            </View>
          </View>
        </View>

        {/* Como funciona */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>ALGORITMO</Text>
          <View style={styles.knnCard}>
            <Text style={styles.knnTitle}>Como o KNN faz o matching</Text>
            <Text style={styles.knnBody}>
              O Ecorrida usa K-Nearest Neighbours para identificar os motoristas mais compatíveis. O algoritmo analisa três atributos simultaneamente e calcula a distância euclidiana normalizada entre o seu perfil e cada oferta disponível.
            </Text>
            <View style={styles.knnWeights}>
              <View style={styles.knnWeight}>
                <View style={[styles.knnBar, { flex: 0.40, backgroundColor: Colors.primary }]} />
                <Text style={styles.knnWeightLabel}>Localização · 40%</Text>
              </View>
              <View style={styles.knnWeight}>
                <View style={[styles.knnBar, { flex: 0.35, backgroundColor: Colors.accent }]} />
                <Text style={styles.knnWeightLabel}>Horário · 35%</Text>
              </View>
              <View style={styles.knnWeight}>
                <View style={[styles.knnBar, { flex: 0.25, backgroundColor: Colors.textMuted }]} />
                <Text style={styles.knnWeightLabel}>Destino · 25%</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={{ height: 24 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.white },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingTop: 56, paddingBottom: 24, paddingHorizontal: 24,
    backgroundColor: Colors.white,
  },
  greeting: { fontSize: Font.sm, color: Colors.textMuted, fontWeight: '500' },
  appName: { fontSize: Font.xxl + 4, fontWeight: '700', color: Colors.textPrimary, letterSpacing: -0.5, marginTop: 2 },
  odsPill: {
    backgroundColor: Colors.accentLight,
    paddingHorizontal: 12, paddingVertical: 6,
    borderRadius: Radius.full, marginTop: 6,
  },
  odsPillText: { fontSize: Font.xs, fontWeight: '700', color: Colors.accent, letterSpacing: 0.8 },

  actionsGrid: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 12,
    marginBottom: 8,
  },
  actionsCol: { flex: 1, gap: 12 },
  actionCard: {
    borderRadius: Radius.xl,
    padding: 20,
    justifyContent: 'flex-end',
    minHeight: 140,
  },
  actionPrimary: {
    flex: 1.1,
    backgroundColor: Colors.primary,
    minHeight: 292,
  },
  actionSecondary: {
    backgroundColor: Colors.bg,
    borderWidth: 1, borderColor: Colors.border,
  },
  actionTertiary: {
    backgroundColor: Colors.primaryDark,
  },
  actionCardLabel: {
    fontSize: Font.xs, fontWeight: '700',
    letterSpacing: 1.2, marginBottom: 8,
    color: 'rgba(255,255,255,0.5)',
  },
  actionCardTitle: {
    fontSize: Font.xl, fontWeight: '700',
    color: Colors.white, lineHeight: 26,
  },
  actionCardSub: {
    fontSize: Font.xs, color: 'rgba(255,255,255,0.6)',
    marginTop: 6,
  },

  section: { paddingHorizontal: 20, paddingTop: 28 },
  sectionLabel: {
    fontSize: Font.xs, fontWeight: '700',
    color: Colors.textMuted, letterSpacing: 1.2, marginBottom: 16,
  },

  statsRow: {
    flexDirection: 'row',
    backgroundColor: Colors.bg,
    borderRadius: Radius.lg,
    padding: 20,
    borderWidth: 1, borderColor: Colors.border,
  },
  statItem: { flex: 1, alignItems: 'center' },
  statNum: { fontSize: Font.xxl, fontWeight: '700', color: Colors.textPrimary },
  statLabel: { fontSize: Font.xs, color: Colors.textMuted, textAlign: 'center', marginTop: 4, lineHeight: 16 },
  statDivider: { width: 1, backgroundColor: Colors.border, marginHorizontal: 8 },

  knnCard: {
    backgroundColor: Colors.bg,
    borderRadius: Radius.lg,
    padding: 20,
    borderWidth: 1, borderColor: Colors.border,
  },
  knnTitle: { fontSize: Font.md, fontWeight: '700', color: Colors.textPrimary, marginBottom: 10 },
  knnBody: { fontSize: Font.sm, color: Colors.textSecondary, lineHeight: 20, marginBottom: 18 },
  knnWeights: { gap: 10 },
  knnWeight: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  knnBar: { height: 4, borderRadius: 2, minWidth: 4 },
  knnWeightLabel: { fontSize: Font.xs, color: Colors.textSecondary, fontWeight: '500' },
});
