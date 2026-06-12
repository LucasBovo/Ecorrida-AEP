import React from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert,
} from 'react-native';
import { Colors, Font, Radius } from '../utils/theme';
import { CaronasStore } from '../data/caronasStore';

const usuario = {
  nome: 'Gabriel Felipe A. dos Santos',
  ra: '25362250-2',
  email: 'gabriel.santos@unicesumar.edu.br',
  campus: 'UniCesumar – Campus Sede, Maringá',
  caronasOferecidas: 12,
  caronasRecebidas: 8,
  economiaCO2: '184 kg',
  rating: 4.8,
  curso: 'Análise e Desenvolvimento de Sistemas',
};

export default function PerfilScreen({ navigation }: any) {
  const handleLogout = () => {
    Alert.alert('Sair do Ecorrida', 'Deseja encerrar sua sessão?', [
      { text: 'Cancelar' },
      { text: 'Sair', style: 'destructive', onPress: () => navigation.navigate('Login') },
    ]);
  };

  const stats = [
    { valor: usuario.caronasOferecidas, label: 'Caronas\noferecidas', emoji: '🚗' },
    { valor: usuario.caronasRecebidas,  label: 'Caronas\nrecebidas',  emoji: '🙋' },
    { valor: usuario.economiaCO2,       label: 'CO₂\neconomizado',   emoji: '🌿' },
    { valor: `${usuario.rating}⭐`,     label: 'Avaliação\nmédia',    emoji: '⭐' },
  ];

  const acoes = [
    { icon: '✏️', label: 'Editar perfil' },
    { icon: '⭐', label: 'Minhas avaliações' },
    { icon: '📊', label: 'Histórico de caronas' },
    { icon: '⚙️', label: 'Configurações' },
  ];

  return (
    <View style={styles.root}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.avatarWrap}>
            <Text style={styles.avatarEmoji}>👤</Text>
          </View>
          <Text style={styles.nome}>{usuario.nome}</Text>
          <Text style={styles.ra}>RA {usuario.ra}</Text>
          <View style={styles.cursoBadge}>
            <Text style={styles.cursoTxt}>{usuario.curso}</Text>
          </View>
        </View>

        {/* Info */}
        <View style={styles.infoBox}>
          <View style={styles.infoRow}>
            <Text style={styles.infoIcon}>📧</Text>
            <View>
              <Text style={styles.infoLabel}>E-mail</Text>
              <Text style={styles.infoValue}>{usuario.email}</Text>
            </View>
          </View>
          <View style={styles.divider} />
          <View style={styles.infoRow}>
            <Text style={styles.infoIcon}>🏫</Text>
            <View>
              <Text style={styles.infoLabel}>Campus</Text>
              <Text style={styles.infoValue}>{usuario.campus}</Text>
            </View>
          </View>
        </View>

        {/* Stats */}
        <Text style={styles.sectionTitle}>Suas estatísticas</Text>
        <View style={styles.statsGrid}>
          {stats.map((s, i) => (
            <View key={i} style={styles.statCard}>
              <Text style={styles.statEmoji}>{s.emoji}</Text>
              <Text style={styles.statVal}>{s.valor}</Text>
              <Text style={styles.statLabel}>{s.label}</Text>
            </View>
          ))}
        </View>

        {/* Ações */}
        <Text style={styles.sectionTitle}>Conta</Text>
        <View style={styles.acoesBox}>
          {acoes.map((a, i) => (
            <React.Fragment key={a.label}>
              <TouchableOpacity style={styles.acaoRow}>
                <Text style={styles.acaoIcon}>{a.icon}</Text>
                <Text style={styles.acaoLabel}>{a.label}</Text>
                <Text style={styles.acaoArrow}>›</Text>
              </TouchableOpacity>
              {i < acoes.length - 1 && <View style={styles.divider} />}
            </React.Fragment>
          ))}
        </View>

        {/* Logout */}
        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout} activeOpacity={0.85}>
          <Text style={styles.logoutTxt}>Sair do Ecorrida</Text>
        </TouchableOpacity>

        <View style={styles.odsFooter}>
          <Text style={styles.odsFooterTxt}>
            🌍  ODS 11 – Cidades e comunidades sustentáveis
          </Text>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.bg },
  header: {
    backgroundColor: Colors.primary,
    paddingTop: 56, paddingBottom: 36,
    paddingHorizontal: 24, alignItems: 'center',
  },
  avatarWrap: {
    width: 90, height: 90, borderRadius: 45,
    backgroundColor: 'rgba(255,255,255,0.15)',
    justifyContent: 'center', alignItems: 'center',
    marginBottom: 14,
    borderWidth: 3, borderColor: 'rgba(255,255,255,0.3)',
  },
  avatarEmoji: { fontSize: 48 },
  nome: { fontSize: Font.xl, fontWeight: '800', color: Colors.white, textAlign: 'center' },
  ra: { fontSize: Font.sm, color: '#A8CDE6', marginTop: 4 },
  cursoBadge: {
    marginTop: 10, backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: Radius.full, paddingHorizontal: 14, paddingVertical: 5,
  },
  cursoTxt: { fontSize: Font.xs, color: '#A8CDE6', fontWeight: '600' },

  infoBox: {
    marginHorizontal: 20, marginTop: 20,
    backgroundColor: Colors.white, borderRadius: Radius.xl,
    padding: 18,
    shadowColor: '#0A5C8A', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07, shadowRadius: 8, elevation: 3,
  },
  infoRow: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 4 },
  infoIcon: { fontSize: 20, width: 26, textAlign: 'center' },
  infoLabel: { fontSize: Font.xs, color: Colors.textMuted },
  infoValue: { fontSize: Font.md, color: Colors.textPrimary, fontWeight: '600', marginTop: 1 },
  divider: { height: 1, backgroundColor: Colors.border, marginVertical: 10 },

  sectionTitle: {
    fontSize: Font.lg, fontWeight: '700',
    color: Colors.textPrimary, marginHorizontal: 20,
    marginTop: 24, marginBottom: 12,
  },
  statsGrid: {
    flexDirection: 'row', flexWrap: 'wrap',
    marginHorizontal: 20, gap: 12,
  },
  statCard: {
    backgroundColor: Colors.white, width: '47%',
    borderRadius: Radius.lg, padding: 18, alignItems: 'center',
    shadowColor: '#0A5C8A', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07, shadowRadius: 8, elevation: 3,
  },
  statEmoji: { fontSize: 28, marginBottom: 6 },
  statVal: { fontSize: Font.xxl, fontWeight: '800', color: Colors.primary },
  statLabel: { fontSize: Font.xs, color: Colors.textMuted, textAlign: 'center', marginTop: 4, lineHeight: 16 },

  acoesBox: {
    marginHorizontal: 20, backgroundColor: Colors.white,
    borderRadius: Radius.xl, paddingHorizontal: 18,
    shadowColor: '#0A5C8A', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07, shadowRadius: 8, elevation: 3,
  },
  acaoRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 16, gap: 12 },
  acaoIcon: { fontSize: 20, width: 26, textAlign: 'center' },
  acaoLabel: { flex: 1, fontSize: Font.md, fontWeight: '600', color: Colors.textPrimary },
  acaoArrow: { fontSize: 22, color: Colors.textMuted },

  logoutBtn: {
    margin: 20, marginTop: 24,
    borderWidth: 1.5, borderColor: Colors.danger + '60',
    borderRadius: Radius.md, padding: 16,
    alignItems: 'center', backgroundColor: '#FDE8E8',
  },
  logoutTxt: { color: Colors.danger, fontWeight: '700', fontSize: Font.md },

  odsFooter: {
    marginHorizontal: 20, padding: 14,
    backgroundColor: Colors.accentLight,
    borderRadius: Radius.lg, alignItems: 'center',
  },
  odsFooterTxt: { fontSize: Font.xs, color: Colors.accentDark, fontWeight: '600' },
});
