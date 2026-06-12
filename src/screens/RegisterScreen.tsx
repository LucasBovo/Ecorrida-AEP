import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, KeyboardAvoidingView, Platform, ScrollView,
} from 'react-native';
import { Colors, Font, Radius } from '../utils/theme';

export default function RegisterScreen({ navigation }: any) {
  const [nome, setNome] = useState('');
  const [ra, setRA] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmar, setConfirmar] = useState('');
  const [erro, setErro] = useState('');

  const handleRegister = () => {
    if (!nome || !ra || !email || !senha || !confirmar) {
      setErro('Preencha todos os campos.'); return;
    }
    if (senha !== confirmar) {
      setErro('As senhas não coincidem.'); return;
    }
    if (!/^\d{8}-\d$/.test(ra.trim())) {
      setErro('RA inválido. Formato esperado: 25362250-2'); return;
    }
    setErro('');
    navigation.navigate('Login');
  };

  const campos = [
    { label: 'Nome completo',          value: nome,      setter: setNome,      placeholder: 'Gabriel Felipe dos Santos',  keyboard: 'default' as const,       secure: false },
    { label: 'RA',                     value: ra,        setter: setRA,        placeholder: '25362250-2',                 keyboard: 'default' as const,       secure: false },
    { label: 'E-mail institucional',   value: email,     setter: setEmail,     placeholder: 'gabriel@unicesumar.edu.br',  keyboard: 'email-address' as const, secure: false },
    { label: 'Senha',                  value: senha,     setter: setSenha,     placeholder: 'Mínimo 6 caracteres',        keyboard: 'default' as const,       secure: true  },
    { label: 'Confirmar senha',        value: confirmar, setter: setConfirmar, placeholder: 'Repita a senha',             keyboard: 'default' as const,       secure: true  },
  ];

  return (
    <KeyboardAvoidingView
      style={styles.root}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backTxt}>← Voltar</Text>
        </TouchableOpacity>

        <Text style={styles.title}>Criar conta</Text>
        <Text style={styles.subtitle}>Estudante UniCesumar · Maringá</Text>

        {erro ? <Text style={styles.erroMsg}>{erro}</Text> : null}

        {campos.map((f) => (
          <View key={f.label}>
            <Text style={styles.label}>{f.label}</Text>
            <TextInput
              style={styles.input}
              placeholder={f.placeholder}
              placeholderTextColor={Colors.textMuted}
              value={f.value}
              onChangeText={(v) => { f.setter(v); setErro(''); }}
              keyboardType={f.keyboard}
              autoCapitalize={f.keyboard === 'email-address' ? 'none' : 'words'}
              secureTextEntry={f.secure}
            />
          </View>
        ))}

        <TouchableOpacity style={styles.btn} onPress={handleRegister} activeOpacity={0.9}>
          <Text style={styles.btnText}>Criar conta</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.linkBtn} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.linkText}>
            Já tem conta?{'  '}<Text style={styles.linkBold}>Fazer login</Text>
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.white },
  scroll: { flexGrow: 1, paddingHorizontal: 28, paddingTop: 56, paddingBottom: 40 },
  backBtn: { marginBottom: 32 },
  backTxt: { fontSize: Font.sm, color: Colors.primary, fontWeight: '600' },
  title: { fontSize: Font.hero, fontWeight: '700', color: Colors.textPrimary, letterSpacing: -0.5 },
  subtitle: { fontSize: Font.sm, color: Colors.textMuted, marginTop: 6, marginBottom: 32 },
  erroMsg: {
    fontSize: Font.sm, color: Colors.danger,
    backgroundColor: '#FEF2F2', borderRadius: Radius.sm,
    padding: 12, marginBottom: 16,
  },
  label: {
    fontSize: Font.sm, fontWeight: '600',
    color: Colors.textSecondary, marginBottom: 8, marginTop: 4,
  },
  input: {
    backgroundColor: Colors.bg,
    borderRadius: Radius.md, padding: 15,
    fontSize: Font.md, color: Colors.textPrimary,
    marginBottom: 16, borderWidth: 1, borderColor: Colors.border,
  },
  btn: {
    backgroundColor: Colors.primary,
    borderRadius: Radius.md, padding: 16,
    alignItems: 'center', marginTop: 8,
  },
  btnText: { color: Colors.white, fontSize: Font.md, fontWeight: '600' },
  linkBtn: { marginTop: 24, alignItems: 'center' },
  linkText: { fontSize: Font.sm, color: Colors.textMuted },
  linkBold: { color: Colors.primary, fontWeight: '600' },
});
