// src/screens/Perfil.js
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert,
} from 'react-native';

let AsyncStorage = null;
try {
  // tentativa de carregar o AsyncStorage comunitário (expo + react-native)
  // se não estiver instalado, caímos no fallback (null)
  // nota: se quiser persistência real, instale: npm install @react-native-async-storage/async-storage
  AsyncStorage = require('@react-native-async-storage/async-storage').default;
} catch (e) {
  console.warn(
    '[Perfil] @react-native-async-storage/async-storage não encontrado. Usando storage temporário (não persistente).'
  );
  AsyncStorage = null;
}

// chave para salvar o perfil
const STORAGE_KEY = '@cafeAroma_profile';

// fallback simples em memória (não persiste entre reloads)
const memoryStore = {};

async function storageGet(key) {
  if (AsyncStorage) {
    const raw = await AsyncStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  }
  return memoryStore[key] || null;
}

async function storageSet(key, value) {
  if (AsyncStorage) {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } else {
    memoryStore[key] = value;
  }
}

export default function Perfil({ onVoltar }) {
  // estado visível / edição
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);

  // dados do usuário
  const [profile, setProfile] = useState({
    name: 'João Café',
    email: 'joaocafe@example.com',
    phone: '',
  });

  // campos temporários de edição
  const [draft, setDraft] = useState(profile);

  // carrega do storage ao montar
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const saved = await storageGet(STORAGE_KEY);
        if (mounted && saved) {
          setProfile(saved);
          setDraft(saved);
        }
      } catch (err) {
        console.warn('[Perfil] erro ao carregar perfil:', err);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => (mounted = false);
  }, []);

  // util: pega iniciais para avatar
  const getInitials = (fullName) => {
    if (!fullName) return '';
    const parts = fullName.trim().split(/\s+/);
    const a = parts[0] ? parts[0][0] : '';
    const b = parts.length > 1 ? parts[parts.length - 1][0] : '';
    return (a + b).toUpperCase();
  };

  // validação simples
  const validateDraft = () => {
    if (!draft.name || draft.name.trim().length < 2) {
      Alert.alert('Nome inválido', 'Por favor, insira um nome com ao menos 2 caracteres.');
      return false;
    }
    if (draft.email && !draft.email.includes('@')) {
      Alert.alert('E-mail inválido', 'Por favor, insira um e-mail válido.');
      return false;
    }
    return true;
  };

  const onSave = async () => {
    if (!validateDraft()) return;
    try {
      await storageSet(STORAGE_KEY, draft);
      setProfile(draft);
      setEditing(false);
    } catch (err) {
      console.warn('[Perfil] erro ao salvar:', err);
      Alert.alert('Erro', 'Não foi possível salvar o perfil (veja console).');
    }
  };

  const onCancel = () => {
    setDraft(profile);
    setEditing(false);
  };

  const onEdit = () => {
    setDraft(profile);
    setEditing(true);
  };

  // layout de loading simples (não bloqueante)
  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.titulo}>Carregando perfil...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Meu Perfil</Text>

      {/* Avatar grande com iniciais */}
      <View style={styles.avatarContainer}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{getInitials(profile.name)}</Text>
        </View>
      </View>

      {/* Conteúdo */}
      {!editing ? (
        <>
          <View style={styles.infoContainer}>
            <Text style={styles.nome}>{profile.name}</Text>
            <Text style={styles.email}>{profile.email || 'E-mail não definido'}</Text>
            <Text style={styles.phone}>{profile.phone || 'Telefone não definido'}</Text>
          </View>

          <TouchableOpacity style={styles.primaryButton} onPress={onEdit}>
            <Text style={styles.primaryButtonText}>Editar Perfil</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.secondaryButton} onPress={onVoltar}>
            <Text style={styles.secondaryButtonText}>Voltar</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <View style={styles.form}>
            <Text style={styles.label}>Nome</Text>
            <TextInput
              value={draft.name}
              onChangeText={(t) => setDraft((s) => ({ ...s, name: t }))}
              style={styles.input}
              placeholder="Seu nome"
              placeholderTextColor="#9b7d62"
            />

            <Text style={styles.label}>E-mail</Text>
            <TextInput
              value={draft.email}
              onChangeText={(t) => setDraft((s) => ({ ...s, email: t }))}
              style={styles.input}
              placeholder="seu@email.com"
              keyboardType="email-address"
              placeholderTextColor="#9b7d62"
            />

            <Text style={styles.label}>Telefone</Text>
            <TextInput
              value={draft.phone}
              onChangeText={(t) => setDraft((s) => ({ ...s, phone: t }))}
              style={styles.input}
              placeholder="(xx) xxxxx-xxxx"
              keyboardType="phone-pad"
              placeholderTextColor="#9b7d62"
            />
          </View>

          <View style={styles.rowButtons}>
            <TouchableOpacity style={[styles.primaryButton, { marginRight: 12 }]} onPress={onSave}>
              <Text style={styles.primaryButtonText}>Salvar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.ghostButton} onPress={onCancel}>
              <Text style={styles.ghostButtonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF7ED',
    alignItems: 'center',
    padding: 20,
    paddingTop: 48,
  },
  titulo: {
    fontSize: 28,
    fontWeight: '700',
    color: '#5C3D2E',
    marginBottom: 18,
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  avatar: {
    width: 112,
    height: 112,
    borderRadius: 56,
    backgroundColor: '#D9A679',
    borderWidth: 3,
    borderColor: '#5C3D2E',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: '#5C3D2E',
    fontSize: 34,
    fontWeight: '800',
  },
  infoContainer: {
    alignItems: 'center',
    marginBottom: 18,
  },
  nome: {
    fontSize: 20,
    color: '#3E2723',
    fontWeight: '700',
    marginBottom: 6,
  },
  email: {
    fontSize: 15,
    color: '#7B5E57',
  },
  phone: {
    fontSize: 15,
    color: '#7B5E57',
  },
  primaryButton: {
    marginTop: 20,
    backgroundColor: '#5C3D2E',
    paddingVertical: 12,
    paddingHorizontal: 44,
    borderRadius: 24,
    elevation: 3,
  },
  primaryButtonText: {
    color: '#FFF7ED',
    fontSize: 16,
    fontWeight: '700',
  },
  secondaryButton: {
    marginTop: 12,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#5C3D2E',
    paddingVertical: 10,
    paddingHorizontal: 36,
    borderRadius: 22,
  },
  secondaryButtonText: {
    color: '#5C3D2E',
    fontSize: 15,
    fontWeight: '700',
  },
  form: {
    width: '100%',
    marginTop: 6,
  },
  label: {
    color: '#6b4f3d',
    marginBottom: 6,
    marginTop: 12,
    fontSize: 13,
    fontWeight: '600',
  },
  input: {
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e9d6c0',
    color: '#33261a',
  },
  rowButtons: {
    flexDirection: 'row',
    marginTop: 18,
  },
  ghostButton: {
    marginTop: 0,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#b59476',
    paddingVertical: 12,
    paddingHorizontal: 26,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ghostButtonText: {
    color: '#5C3D2E',
    fontWeight: '700',
  },
});
