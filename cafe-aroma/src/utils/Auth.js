// src/utils/Auth.js
import AsyncStorage from '@react-native-async-storage/async-storage';

// Salva um usuário
export async function cadastrarUsuario(nome, email, senha) {
  const usuario = { nome, email, senha };

  try {
    await AsyncStorage.setItem('@usuario', JSON.stringify(usuario));
    return true; // <-- ESSENCIAL!
  } catch (e) {
    return false;
  }
}

// Retorna o usuário salvo
export async function getUsuario() {
  const data = await AsyncStorage.getItem('@usuario');
  return data ? JSON.parse(data) : null;
}

// Busca por email
export async function getUsuarioPorEmail(email) {
  const usuario = await getUsuario();
  if (!usuario) return null;
  return usuario.email === email ? usuario : null;
}

// Validação de login
export async function loginUsuario(email, senha) {
  const usuario = await getUsuario();

  if (!usuario) {
    return { ok: false, msg: "Nenhum usuário cadastrado." };
  }

  if (usuario.email !== email) {
    return { ok: false, msg: "Email não encontrado." };
  }

  if (usuario.senha !== senha) {
    return { ok: false, msg: "Senha incorreta." };
  }

  return { ok: true, usuario };
}
