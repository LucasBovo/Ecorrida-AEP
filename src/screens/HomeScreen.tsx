import React from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet,
  ScrollView, StatusBar,
} from 'react-native';
import { Colors, Font, Radius, Shadow } from '../utils/theme';
import { CaronasStore } from '../data/caronasStore';

export default function HomeScreen({ navigation }: any) {
  const totalCaronas = CaronasStore.getCaronas().length;
  const co2 = (totalCaronas * 2.1).toFixed(0);

  const acoes = [
    {
      emoji: '🔍',
      titulo: 'Buscar Carona',
      desc: 'KNN encontra os melhores motoristas próximos a você',
      rota: 'Buscar',
      cor: Colors.primary,
    },
    {
      emoji: '🚗',
      titulo: 'Oferecer Carona',
      desc: 'Publique sua rota e ajude colegas universitários',
      rota: 'Oferecer',
      cor: Colors.accent,
    },
    {
      emoji: '🤝',
      titulo: 'Meus Matches',
      desc: 'Acompanhe suas caronas confirmadas e pendentes',
      rota: 'Matches',
      cor: Colors.warning,
    },
  ];

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.primaryDark} />
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Olá, estudante 👋</Text>
            <Text style={styles.appTitle}>Ecorrida</Text>
            <Text style={styles.appSub}>Mobilidade inteligente universitária</Text>
          </View>
          <View style={styles.odsTag}>
            <Text style={styles.odsTagText}>ODS 11</Text>
          </View>
        </View>

        {/* Cards de ação */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>O que você precisa?</Text>
          <View style={styles.cardsCol}>
            {acoes.map((a) => (
              <TouchableOpacity
                key={a.rota}
                style={styles.actionCard}
                onPress={() => navigation.navigate(a.rota)}
                activeOpacity={0.88}
              >
                <View style={[styles.actionIcon, { backgroundColor: a.cor + '18' }]}>
                  <Text style={styles.actionEmoji}>{a.emoji}</Text>
                </View>
                <View style={styles.actionText}>
                  <Text style={styles.actionTitle}>{a.titulo}</Text>
                  <Text style={styles.actionDesc}>{a.desc}</Text>
                </View>
                <Text style={[styles.arrow, { color: a.cor }]}>›</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Painel de impacto */}
        <View style={styles.impactPanel}>
          <Text style={styles.impactTitle}>Impacto ambiental hoje</Text>
          <Text style={styles.impactSub}>Comunidade Ecorrida · Maringá</Text>
          <View style={styles.impactRow}>
            <View style={styles.impactItem}>
              <Text style={styles.impactNum}>{totalCaronas}</Text>
              <Text style={styles.impactLabel}>Caronas{'\n'}disponíveis</Text>
            </View>
            <View style={styles.impactDivider} />
            <View style={styles.impactItem}>
              <Text style={styles.impactNum}>{co2}</Text>
              <Text style={styles.impactLabel}>kg CO₂{'\n'}economizados</Text>
            </View>
            <View style={styles.impactDivider} />
            <View style={styles.impactItem}>
              <Text style={styles.impactNum}>🌳</Text>
              <Text style={styles.impactLabel}>Equivale a{'\n'}12 árvores</Text>
            </View>
          </View>
        </View>

        {/* Sobre o algoritmo */}
        <View style={styles.knnInfo}>
          <Text style={styles.knnInfoTitle}>⚙️  Como funciona o matching</Text>
          <Text style={styles.knnInfoBody}>
            O Ecorrida usa{' '}
            <Text style={styles.knnBold}>K-Nearest Neighbours (KNN)</Text>
            {' '}para identificar os motoristas mais compatíveis com você, considerando{' '}
            <Text style={styles.knnBold}>localização (40%)</Text>,{' '}
            <Text style={styles.knnBold}>horário (35%)</Text> e{' '}
            <Text style={styles.knnBold}>destino (25%)</Text>.
          </Text>
        </View>

        <View style={{ height: 24 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.bg },
  header: {
    backgroundColor: Colors.primary,
    paddingTop: 56, paddingBottom: 32,
    paddingHorizontal: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  greeting: { fontSize: Font.md, color: '#A8CDE6', fontWeight: '500' },
  appTitle: { fontSize: Font.hero, fontWeight: '800', color: Colors.white, marginTop: 2 },
  appSub: { fontSize: Font.sm, color: '#A8CDE6', marginTop: 4 },
  odsTag: {
    backgroundColor: Colors.accent,
    paddingHorizontal: 12, paddingVertical: 6,
    borderRadius: Radius.full, marginTop: 8,
  },
  odsTagText: { fontSize: Font.xs, fontWeight: '800', color: Colors.white, letterSpacing: 1 },

  section: { paddingHorizontal: 20, paddingTop: 24 },
  sectionTitle: {
    fontSize: Font.lg, fontWeight: '700',
    color: Colors.textPrimary, marginBottom: 14,
  },
  cardsCol: { gap: 12 },
  actionCard: {
    backgroundColor: Colors.white,
    borderRadius: Radius.lg,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    shadowColor: '#0A5C8A', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07, shadowRadius: 8, elevation: 3,
  },
  actionIcon: {
    width: 50, height: 50, borderRadius: 14,
    justifyContent: 'center', alignItems: 'center',
  },
  actionEmoji: { fontSize: 26 },
  actionText: { flex: 1 },
  actionTitle: { fontSize: Font.md, fontWeight: '700', color: Colors.textPrimary },
  actionDesc: { fontSize: Font.sm, color: Colors.textSecondary, marginTop: 2 },
  arrow: { fontSize: 28, fontWeight: '300', marginRight: 4 },

  impactPanel: {
    margin: 20,
    backgroundColor: Colors.primary,
    borderRadius: Radius.xl,
    padding: 22,
    shadowColor: Colors.primary, shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2, shadowRadius: 12, elevation: 6,
  },
  impactTitle: { fontSize: Font.lg, fontWeight: '700', color: Colors.white },
  impactSub: { fontSize: Font.xs, color: '#A8CDE6', marginTop: 2, marginBottom: 18 },
  impactRow: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' },
  impactItem: { alignItems: 'center', flex: 1 },
  impactNum: { fontSize: Font.xxl, fontWeight: '800', color: Colors.accent },
  impactLabel: { fontSize: Font.xs, color: '#A8CDE6', textAlign: 'center', marginTop: 4, lineHeight: 16 },
  impactDivider: { width: 1, height: 40, backgroundColor: 'rgba(255,255,255,0.15)' },

  knnInfo: {
    marginHorizontal: 20, marginBottom: 4,
    backgroundColor: Colors.accentLight,
    borderRadius: Radius.lg, padding: 18,
    borderLeftWidth: 4, borderLeftColor: Colors.accent,
  },
  knnInfoTitle: { fontSize: Font.md, fontWeight: '700', color: Colors.accentDark, marginBottom: 8 },
  knnInfoBody: { fontSize: Font.sm, color: Colors.textSecondary, lineHeight: 20 },
  knnBold: { fontWeight: '700', color: Colors.accentDark },
});
