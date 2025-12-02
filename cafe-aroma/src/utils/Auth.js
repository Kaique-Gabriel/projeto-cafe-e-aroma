// src/utils/Auth.js

import AsyncStorage from '@react-native-async-storage/async-storage';

/* -------------------------------------------
   🔥 BUSCA A LISTA COMPLETA DE USUÁRIOS
------------------------------------------- */
export async function getUsuarios() {
  const data = await AsyncStorage.getItem('@usuarios');
  return data ? JSON.parse(data) : [];
}

/* -------------------------------------------
   🔥 SALVA A LISTA COMPLETA DE USUÁRIOS
------------------------------------------- */
async function salvarUsuarios(lista) {
  await AsyncStorage.setItem('@usuarios', JSON.stringify(lista));
}

/* -------------------------------------------
   🔥 CADASTRAR USUÁRIO (AGORA MULTI-USUÁRIO)
------------------------------------------- */
export async function cadastrarUsuario(nome, email, senha) {
  const usuarios = await getUsuarios();

  // Verifica email duplicado
  const jaExiste = usuarios.some((u) => u.email === email);
  if (jaExiste) {
    return { ok: false, msg: "Email já cadastrado." };
  }

  const novo = {
    id: Date.now(),
    nome,
    email,
    senha,
  };

  usuarios.push(novo);
  await salvarUsuarios(usuarios);

  return { ok: true, usuario: novo };
}

/* -------------------------------------------
   🔥 BUSCAR USUÁRIO POR EMAIL
------------------------------------------- */
export async function getUsuarioPorEmail(email) {
  const usuarios = await getUsuarios();
  return usuarios.find((u) => u.email === email) || null;
}

/* -------------------------------------------
   🔥 LOGIN MULTI-USUÁRIO
------------------------------------------- */
export async function loginUsuario(email, senha) {
  const usuarios = await getUsuarios();

  if (!usuarios || usuarios.length === 0) {
    return { ok: false, msg: "Nenhum usuário cadastrado." };
  }

  const user = usuarios.find((u) => u.email === email);

  if (!user) {
    return { ok: false, msg: "Email não encontrado." };
  }

  if (user.senha !== senha) {
    return { ok: false, msg: "Senha incorreta." };
  }

  // Salvar usuário logado
  await setUsuarioLogado(user);

  return { ok: true, usuario: user };
}

/* -------------------------------------------
   🔥 PEGAR USUÁRIO ATUAL
------------------------------------------- */
export async function setUsuarioLogado(user) {
  await AsyncStorage.setItem('@usuario_logado', JSON.stringify(user));
}

export async function getUsuarioLogado() {
  const data = await AsyncStorage.getItem('@usuario_logado');
  return data ? JSON.parse(data) : null;
}

export async function logoutUsuario() {
  await AsyncStorage.removeItem('@usuario_logado');
}
