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
  AsyncStorage = require('@react-native-async-storage/async-storage').default;
} catch (e) {
  AsyncStorage = null;
}

const STORAGE_KEY = '@cafeAroma_profile';
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
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);

  const [profile, setProfile] = useState({
    name: 'João Café',
    email: 'joaocafe@example.com',
    phone: '',
  });

  const [draft, setDraft] = useState(profile);

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
        // ignore
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => (mounted = false);
  }, []);

  const getInitials = (fullName) => {
    if (!fullName) return '';
    const parts = fullName.trim().split(/\s+/);
    const a = parts[0]?.[0] || '';
    const b = parts.length > 1 ? parts[parts.length - 1][0] : '';
    return (a + b).toUpperCase();
  };

  const validateDraft = () => {
    if (!draft.name || draft.name.trim().length < 2) {
      Alert.alert('Nome inválido', 'Insira um nome com ao menos 2 caracteres.');
      return false;
    }
    if (draft.email && !draft.email.includes('@')) {
      Alert.alert('E-mail inválido', 'Insira um e-mail válido.');
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
      // volta para home para que HomeApp releia profile ao montar
      onVoltar && onVoltar();
    } catch (err) {
      Alert.alert('Erro', 'Não foi possível salvar o perfil.');
    }
  };

  const onCancel = () => {
    setDraft(profile);
    setEditing(false);
  };

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

      {!editing ? (
        <>
          <View style={styles.infoContainer}>
            <Text style={styles.nome}>{profile.name}</Text>
            <Text style={styles.email}>{profile.email || 'E-mail não definido'}</Text>
            <Text style={styles.phone}>{profile.phone || 'Telefone não definido'}</Text>
          </View>

          <TouchableOpacity style={styles.primaryButton} onPress={() => setEditing(true)}>
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
              placeholderTextColor="#8b6f51"
            />

            <Text style={styles.label}>E-mail</Text>
            <TextInput
              value={draft.email}
              onChangeText={(t) => setDraft((s) => ({ ...s, email: t }))}
              style={styles.input}
              placeholder="email@exemplo.com"
              keyboardType="email-address"
              placeholderTextColor="#8b6f51"
            />

            <Text style={styles.label}>Telefone</Text>
            <TextInput
              value={draft.phone}
              onChangeText={(t) => setDraft((s) => ({ ...s, phone: t }))}
              style={styles.input}
              placeholder="(xx) xxxxx-xxxx"
              keyboardType="phone-pad"
              placeholderTextColor="#8b6f51"
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
    backgroundColor: '#FBF7F2', // claro repaginado
    alignItems: 'center',
    padding: 20,
    paddingTop: 40,
  },
  titulo: {
    fontSize: 26,
    fontWeight: '700',
    color: '#4b2e1e',
    marginBottom: 14,
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 14,
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 56,
    backgroundColor: '#D9B89B', // caramelo suave
    borderWidth: 2,
    borderColor: '#C69A78',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: '#3b2418',
    fontSize: 32,
    fontWeight: '800',
  },
  infoContainer: {
    alignItems: 'center',
    marginBottom: 14,
  },
  nome: {
    fontSize: 20,
    color: '#3b2418',
    fontWeight: '700',
    marginBottom: 6,
  },
  email: {
    fontSize: 14,
    color: '#7b5e57',
  },
  phone: {
    fontSize: 14,
    color: '#7b5e57',
  },
  primaryButton: {
    marginTop: 18,
    backgroundColor: '#7b5d49',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 22,
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
  },
  secondaryButton: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#7b5d49',
    paddingVertical: 10,
    paddingHorizontal: 34,
    borderRadius: 22,
  },
  secondaryButtonText: {
    color: '#7b5d49',
    fontSize: 14,
    fontWeight: '700',
  },
  form: {
    width: '100%',
    marginTop: 6,
  },
  label: {
    color: '#7b5e57',
    marginBottom: 6,
    marginTop: 10,
    fontSize: 13,
    fontWeight: '600',
  },
  input: {
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#efe6db',
    color: '#3b2418',
  },
  rowButtons: {
    flexDirection: 'row',
    marginTop: 16,
  },
  ghostButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#cbb79b',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ghostButtonText: {
    color: '#7b5d49',
    fontWeight: '700',
  },
});
