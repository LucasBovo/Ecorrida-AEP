import React from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert,
} from 'react-native';
import { Colors, Font, Radius } from '../utils/theme';

const usuario = {
  nome:              'Gabriel Felipe A. dos Santos',
  ra:                '25362250-2',
  email:             'gabriel.santos@unicesumar.edu.br',
  campus:            'UniCesumar · Campus Sede, Maringá',
  curso:             'Análise e Desenvolvimento de Sistemas',
  caronasOferecidas: 12,
  caronasRecebidas:  8,
  economiaCO2:       '184 kg',
  rating:            4.8,
};

export default function PerfilScreen({ navigation }: any) {
  const handleLogout = () => {
    Alert.alert('Sair do Ecorrida', 'Encerrar sessão?', [
      { text: 'Cancelar' },
      { text: 'Sair', style: 'destructive', onPress: () => navigation.navigate('Login') },
    ]);
  };

  const stats = [
    { valor: String(usuario.caronasOferecidas), label: 'Caronas oferecidas' },
    { valor: String(usuario.caronasRecebidas),  label: 'Caronas recebidas'  },
    { valor: usuario.economiaCO2,               label: 'CO₂ economizado'    },
    { valor: `${usuario.rating}`,               label: 'Avaliação média'    },
  ];

  const menu = [
    'Editar perfil',
    'Minhas avaliações',
    'Histórico de caronas',
    'Configurações',
    'Central de ajuda',
  ];

  return (
    <View style={styles.root}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.avatar}>
            <Text style={styles.avatarInitial}>
              {usuario.nome.charAt(0)}
            </Text>
          </View>
          <Text style={styles.nome}>{usuario.nome}</Text>
          <Text style={styles.ra}>RA {usuario.ra}</Text>
          <Text style={styles.curso}>{usuario.curso}</Text>
        </View>

        {/* Informações */}
        <View style={styles.infoSection}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>E-mail</Text>
            <Text style={styles.infoValue}>{usuario.email}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Campus</Text>
            <Text style={styles.infoValue}>{usuario.campus}</Text>
          </View>
        </View>

        {/* Estatísticas */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>ESTATÍSTICAS</Text>
          <View style={styles.statsGrid}>
            {stats.map((s, i) => (
              <View key={i} style={styles.statCard}>
                <Text style={styles.statVal}>{s.valor}</Text>
                <Text style={styles.statLabel}>{s.label}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Menu */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>CONTA</Text>
          <View style={styles.menuCard}>
            {menu.map((item, i) => (
              <React.Fragment key={item}>
                <TouchableOpacity style={styles.menuRow}>
                  <Text style={styles.menuLabel}>{item}</Text>
                  <Text style={styles.menuArrow}>›</Text>
                </TouchableOpacity>
                {i < menu.length - 1 && <View style={styles.divider} />}
              </React.Fragment>
            ))}
          </View>
        </View>

        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout} activeOpacity={0.9}>
          <Text style={styles.logoutTxt}>Sair do Ecorrida</Text>
        </TouchableOpacity>

        <Text style={styles.footer}>ODS 11 · Cidades e Comunidades Sustentáveis</Text>

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.white },

  header: {
    backgroundColor: Colors.primary,
    paddingTop: 64, paddingBottom: 32,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  avatar: {
    width: 72, height: 72, borderRadius: 36,
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderWidth: 2, borderColor: 'rgba(255,255,255,0.3)',
    justifyContent: 'center', alignItems: 'center',
    marginBottom: 16,
  },
  avatarInitial: { fontSize: Font.xxl + 4, fontWeight: '700', color: Colors.white },
  nome: { fontSize: Font.xl, fontWeight: '700', color: Colors.white, textAlign: 'center' },
  ra: { fontSize: Font.sm, color: 'rgba(255,255,255,0.6)', marginTop: 4 },
  curso: {
    fontSize: Font.xs, color: 'rgba(255,255,255,0.5)',
    marginTop: 6, textAlign: 'center',
  },

  infoSection: {
    marginHorizontal: 20, marginTop: 20,
    borderWidth: 1, borderColor: Colors.border,
    borderRadius: Radius.lg, overflow: 'hidden',
  },
  infoRow: { padding: 16 },
  infoLabel: { fontSize: Font.xs, color: Colors.textMuted, fontWeight: '600', letterSpacing: 0.5 },
  infoValue: { fontSize: Font.sm, color: Colors.textPrimary, fontWeight: '500', marginTop: 3 },
  divider: { height: 1, backgroundColor: Colors.border },

  section: { paddingHorizontal: 20, paddingTop: 28 },
  sectionLabel: {
    fontSize: Font.xs, fontWeight: '700',
    color: Colors.textMuted, letterSpacing: 1.2, marginBottom: 14,
  },

  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  statCard: {
    width: '47.5%',
    borderWidth: 1, borderColor: Colors.border,
    borderRadius: Radius.lg, padding: 16,
  },
  statVal: { fontSize: Font.xl, fontWeight: '700', color: Colors.textPrimary },
  statLabel: { fontSize: Font.xs, color: Colors.textMuted, marginTop: 4 },

  menuCard: {
    borderWidth: 1, borderColor: Colors.border,
    borderRadius: Radius.lg, overflow: 'hidden',
  },
  menuRow: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', padding: 16,
  },
  menuLabel: { fontSize: Font.md, color: Colors.textPrimary, fontWeight: '500' },
  menuArrow: { fontSize: Font.lg, color: Colors.textMuted },

  logoutBtn: {
    margin: 20, marginTop: 24,
    borderWidth: 1, borderColor: Colors.border,
    borderRadius: Radius.md, padding: 15,
    alignItems: 'center',
  },
  logoutTxt: { color: Colors.danger, fontWeight: '600', fontSize: Font.sm },

  footer: {
    fontSize: Font.xs, color: Colors.textMuted,
    textAlign: 'center', marginBottom: 8,
  },
});
