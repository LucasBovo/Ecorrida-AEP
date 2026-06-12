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
      setErro('RA inválido. Formato: 25362250-2'); return;
    }
    setErro('');
    navigation.navigate('Login');
  };

  return (
    <KeyboardAvoidingView
      style={styles.root}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        <View style={styles.topBar}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Text style={styles.backTxt}>← Voltar</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.brand}>
          <Text style={styles.appName}>Ecorrida</Text>
          <Text style={styles.tagline}>Crie sua conta universitária</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Cadastro</Text>

          {erro ? <Text style={styles.erroMsg}>{erro}</Text> : null}

          {[
            { label: 'Nome completo',         value: nome,     setter: setNome,     placeholder: 'Gabriel Felipe dos Santos',    keyboard: 'default' as const,        secure: false },
            { label: 'RA (Registro Acadêmico)', value: ra,     setter: setRA,       placeholder: '25362250-2',                   keyboard: 'default' as const,        secure: false },
            { label: 'E-mail institucional',  value: email,    setter: setEmail,    placeholder: 'gabriel@uni.edu',              keyboard: 'email-address' as const,  secure: false },
            { label: 'Senha',                 value: senha,    setter: setSenha,    placeholder: '••••••••',                     keyboard: 'default' as const,        secure: true  },
            { label: 'Confirmar senha',       value: confirmar,setter: setConfirmar,placeholder: '••••••••',                     keyboard: 'default' as const,        secure: true  },
          ].map((f) => (
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

          <TouchableOpacity style={styles.btn} onPress={handleRegister} activeOpacity={0.85}>
            <Text style={styles.btnText}>Criar conta</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.linkBtn} onPress={() => navigation.navigate('Login')}>
            <Text style={styles.linkText}>
              Já tem conta? <Text style={styles.linkBold}>Fazer login</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.primary },
  scroll: { flexGrow: 1, alignItems: 'center', paddingHorizontal: 24, paddingBottom: 40 },
  topBar: { width: '100%', paddingTop: 56, paddingBottom: 8 },
  backBtn: { alignSelf: 'flex-start' },
  backTxt: { color: '#A8CDE6', fontSize: Font.md, fontWeight: '600' },
  brand: { alignItems: 'center', marginBottom: 24, marginTop: 8 },
  appName: { fontSize: Font.xxl + 6, fontWeight: '800', color: Colors.white },
  tagline: { fontSize: Font.md, color: '#A8CDE6', marginTop: 4 },
  card: {
    width: '100%', maxWidth: 380,
    backgroundColor: Colors.white,
    borderRadius: Radius.xl, padding: 28,
    shadowColor: '#000', shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12, shadowRadius: 12, elevation: 6,
  },
  cardTitle: { fontSize: Font.xl, fontWeight: '700', color: Colors.textPrimary, marginBottom: 20 },
  erroMsg: {
    fontSize: Font.sm, color: Colors.danger,
    backgroundColor: '#FDE8E8', borderRadius: Radius.sm,
    padding: 10, marginBottom: 14,
  },
  label: { fontSize: Font.sm, fontWeight: '600', color: Colors.textSecondary, marginBottom: 6, marginTop: 4 },
  input: {
    backgroundColor: Colors.bg,
    borderRadius: Radius.md, padding: 14,
    fontSize: Font.md, color: Colors.textPrimary,
    marginBottom: 12,
    borderWidth: 1, borderColor: Colors.border,
  },
  btn: {
    backgroundColor: Colors.accent,
    borderRadius: Radius.md, padding: 16,
    alignItems: 'center', marginTop: 8,
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08, shadowRadius: 6, elevation: 3,
  },
  btnText: { color: Colors.white, fontSize: Font.lg, fontWeight: '700' },
  linkBtn: { marginTop: 20, alignItems: 'center' },
  linkText: { fontSize: Font.md, color: Colors.textSecondary },
  linkBold: { color: Colors.primary, fontWeight: '700' },
});
