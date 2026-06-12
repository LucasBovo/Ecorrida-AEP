import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, KeyboardAvoidingView, Platform, ScrollView,
} from 'react-native';
import { Colors, Font, Radius } from '../utils/theme';

export default function LoginScreen({ navigation }: any) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');

  const handleLogin = () => {
    if (!email.trim() || !senha.trim()) {
      setErro('Preencha e-mail e senha para continuar.');
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

        {/* Marca */}
        <View style={styles.brand}>
          <View style={styles.logoMark}>
            <View style={styles.logoInner} />
          </View>
          <Text style={styles.appName}>ecorrida</Text>
          <Text style={styles.tagline}>Caronas universitárias inteligentes</Text>
        </View>

        {/* Formulário */}
        <View style={styles.form}>
          {erro ? <Text style={styles.erroMsg}>{erro}</Text> : null}

          <Text style={styles.label}>E-mail ou RA</Text>
          <TextInput
            style={styles.input}
            placeholder="seura@unicesumar.edu.br"
            placeholderTextColor={Colors.textMuted}
            value={email}
            onChangeText={(v) => { setEmail(v); setErro(''); }}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Text style={styles.label}>Senha</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite sua senha"
            placeholderTextColor={Colors.textMuted}
            value={senha}
            onChangeText={(v) => { setSenha(v); setErro(''); }}
            secureTextEntry
          />

          <TouchableOpacity style={styles.btn} onPress={handleLogin} activeOpacity={0.9}>
            <Text style={styles.btnText}>Entrar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.linkBtn}
            onPress={() => navigation.navigate('Register')}
          >
            <Text style={styles.linkText}>
              Ainda não tem conta?{'  '}
              <Text style={styles.linkBold}>Cadastre-se</Text>
            </Text>
          </TouchableOpacity>
        </View>

        {/* Rodapé ODS */}
        <Text style={styles.footer}>ODS 11 · Cidades e Comunidades Sustentáveis</Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.white },
  scroll: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 32,
    paddingVertical: 56,
  },
  brand: { alignItems: 'center', marginBottom: 48 },
  logoMark: {
    width: 52, height: 52,
    borderRadius: 14,
    backgroundColor: Colors.primary,
    justifyContent: 'center', alignItems: 'center',
    marginBottom: 16,
  },
  logoInner: {
    width: 22, height: 22,
    borderRadius: 11,
    backgroundColor: Colors.accent,
  },
  appName: {
    fontSize: Font.hero,
    fontWeight: '700',
    color: Colors.textPrimary,
    letterSpacing: -0.5,
  },
  tagline: {
    fontSize: Font.sm,
    color: Colors.textMuted,
    marginTop: 6,
  },
  form: { width: '100%' },
  erroMsg: {
    fontSize: Font.sm,
    color: Colors.danger,
    backgroundColor: '#FEF2F2',
    borderRadius: Radius.sm,
    padding: 12,
    marginBottom: 16,
  },
  label: {
    fontSize: Font.sm,
    fontWeight: '600',
    color: Colors.textSecondary,
    marginBottom: 8,
    marginTop: 4,
  },
  input: {
    backgroundColor: Colors.bg,
    borderRadius: Radius.md,
    padding: 15,
    fontSize: Font.md,
    color: Colors.textPrimary,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  btn: {
    backgroundColor: Colors.primary,
    borderRadius: Radius.md,
    padding: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  btnText: {
    color: Colors.white,
    fontSize: Font.md,
    fontWeight: '600',
  },
  linkBtn: { marginTop: 24, alignItems: 'center' },
  linkText: { fontSize: Font.sm, color: Colors.textMuted },
  linkBold: { color: Colors.primary, fontWeight: '600' },
  footer: {
    fontSize: Font.xs,
    color: Colors.textMuted,
    textAlign: 'center',
    marginTop: 48,
    letterSpacing: 0.3,
  },
});
