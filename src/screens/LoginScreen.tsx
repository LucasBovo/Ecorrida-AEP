import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, KeyboardAvoidingView, Platform, ScrollView,
} from 'react-native';
import { Colors, Font, Radius, Shadow } from '../utils/theme';

export default function LoginScreen({ navigation }: any) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');

  const handleLogin = () => {
    if (!email.trim() || !senha.trim()) {
      setErro('Preencha e-mail/RA e senha para continuar.');
      return;
    }
    setErro('');
    navigation.navigate('Main');
  };

  return (
    <KeyboardAvoidingView
      style={styles.root}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        <View style={styles.brand}>
          <View style={styles.logoCircle}>
            <Text style={styles.logoEmoji}>🌿</Text>
          </View>
          <Text style={styles.appName}>Ecorrida</Text>
          <Text style={styles.tagline}>Caronas inteligentes e sustentáveis</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Bem-vindo de volta</Text>

          {erro ? <Text style={styles.erroMsg}>{erro}</Text> : null}

          <Text style={styles.label}>E-mail ou RA</Text>
          <TextInput
            style={styles.input}
            placeholder="seuemail@uni.edu  ou  25362250-2"
            placeholderTextColor={Colors.textMuted}
            value={email}
            onChangeText={(v) => { setEmail(v); setErro(''); }}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Text style={styles.label}>Senha</Text>
          <TextInput
            style={styles.input}
            placeholder="••••••••"
            placeholderTextColor={Colors.textMuted}
            value={senha}
            onChangeText={(v) => { setSenha(v); setErro(''); }}
            secureTextEntry
          />

          <TouchableOpacity style={styles.btn} onPress={handleLogin} activeOpacity={0.85}>
            <Text style={styles.btnText}>Entrar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.linkBtn}
            onPress={() => navigation.navigate('Register')}
          >
            <Text style={styles.linkText}>
              Ainda não tem conta?{' '}
              <Text style={styles.linkBold}>Cadastre-se</Text>
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.odsBadge}>
          <Text style={styles.odsText}>🌍  ODS 11 – Cidades Sustentáveis</Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.primary },
  scroll: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 48,
  },
  brand: { alignItems: 'center', marginBottom: 32 },
  logoCircle: {
    width: 80, height: 80, borderRadius: 40,
    backgroundColor: Colors.accent,
    justifyContent: 'center', alignItems: 'center',
    marginBottom: 14,
    shadowColor: '#000', shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12, shadowRadius: 12, elevation: 6,
  },
  logoEmoji: { fontSize: 40 },
  appName: {
    fontSize: Font.hero, fontWeight: '800',
    color: Colors.white, letterSpacing: 1,
  },
  tagline: {
    fontSize: Font.md, color: '#A8CDE6',
    marginTop: 6, textAlign: 'center',
  },
  card: {
    width: '100%', maxWidth: 360,
    backgroundColor: Colors.white,
    borderRadius: Radius.xl, padding: 28,
    shadowColor: '#000', shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12, shadowRadius: 12, elevation: 6,
  },
  cardTitle: {
    fontSize: Font.xl, fontWeight: '700',
    color: Colors.textPrimary, marginBottom: 20,
  },
  erroMsg: {
    fontSize: Font.sm, color: Colors.danger,
    backgroundColor: '#FDE8E8', borderRadius: Radius.sm,
    padding: 10, marginBottom: 14,
  },
  label: {
    fontSize: Font.sm, fontWeight: '600',
    color: Colors.textSecondary, marginBottom: 6,
  },
  input: {
    backgroundColor: Colors.bg,
    borderRadius: Radius.md, padding: 14,
    fontSize: Font.md, color: Colors.textPrimary,
    marginBottom: 16,
    borderWidth: 1, borderColor: Colors.border,
  },
  btn: {
    backgroundColor: Colors.accent,
    borderRadius: Radius.md, padding: 16,
    alignItems: 'center', marginTop: 4,
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08, shadowRadius: 6, elevation: 3,
  },
  btnText: {
    color: Colors.white, fontSize: Font.lg,
    fontWeight: '700', letterSpacing: 0.5,
  },
  linkBtn: { marginTop: 20, alignItems: 'center' },
  linkText: { fontSize: Font.md, color: Colors.textSecondary },
  linkBold: { color: Colors.primary, fontWeight: '700' },
  odsBadge: {
    marginTop: 28, paddingHorizontal: 16, paddingVertical: 8,
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderRadius: Radius.full,
  },
  odsText: { fontSize: Font.sm, color: '#A8CDE6' },
});
