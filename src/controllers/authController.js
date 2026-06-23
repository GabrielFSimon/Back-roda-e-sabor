import { Usuario } from '../models/index.js';
import { compararSenha, gerarToken, hashSenha, limparUsuario } from '../utils/auth.js';

async function cadastrar(req, res, next) {
  try {
    const { email, senha, senhaHash, senha_hash, ...resto } = req.body;

    if (!email || (!senha && !senhaHash && !senha_hash)) {
      return res.status(400).json({ mensagem: 'Informe email e senha para cadastrar.' });
    }

    const usuarioExistente = await Usuario.findOne({ where: { email } });
    if (usuarioExistente) {
      return res.status(409).json({ mensagem: 'Já existe um usuário cadastrado com este e-mail.' });
    }

    const usuario = await Usuario.create({
      ...resto,
      email,
      idFuncao: resto.idFuncao ?? resto.id_funcao ?? 1,
      senhaHash: hashSenha(senhaHash ?? senha_hash ?? senha),
    });

    res.status(201).json({
      usuario: limparUsuario(usuario),
      token: gerarToken(usuario),
    });
  } catch (error) {
    next(error);
  }
}

async function login(req, res, next) {
  try {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).json({ mensagem: 'Informe email e senha.' });
    }

    const usuario = await Usuario.findOne({ where: { email } });

    if (!usuario || !compararSenha(senha, usuario.senhaHash)) {
      return res.status(401).json({ mensagem: 'Email ou senha inválidos.' });
    }

    res.json({
      usuario: limparUsuario(usuario),
      token: gerarToken(usuario),
    });
  } catch (error) {
    next(error);
  }
}

async function me(req, res) {
  res.json({ usuario: limparUsuario(req.usuario) });
}

async function atualizarPerfil(req, res, next) {
  try {
    const { senha, senhaHash, senha_hash, idFuncao, id_funcao, ...dados } = req.body;
    const usuario = await req.usuario.update({
      ...dados,
      idFuncao: idFuncao ?? id_funcao ?? req.usuario.idFuncao,
    });
    res.json({ usuario: limparUsuario(usuario) });
  } catch (error) {
    next(error);
  }
}

async function atualizarSenha(req, res, next) {
  try {
    const { senha_atual, nova_senha, senhaAtual, novaSenha } = req.body;
    const senhaAtualValidada = senha_atual ?? senhaAtual;
    const novaSenhaValidada = nova_senha ?? novaSenha;

    if (!senhaAtualValidada || !novaSenhaValidada) {
      return res.status(400).json({ mensagem: 'Informe a senha atual e a nova senha.' });
    }

    if (!compararSenha(senhaAtualValidada, req.usuario.senhaHash)) {
      return res.status(400).json({ mensagem: 'Senha atual inválida.' });
    }

    req.usuario.senhaHash = hashSenha(novaSenhaValidada);
    await req.usuario.save();
    res.json({ mensagem: 'Senha atualizada com sucesso.' });
  } catch (error) {
    next(error);
  }
}

async function removerConta(req, res, next) {
  try {
    await req.usuario.destroy();
    res.json({ mensagem: 'Conta removida com sucesso.' });
  } catch (error) {
    next(error);
  }
}

export { cadastrar, login, me, atualizarPerfil, atualizarSenha, removerConta };
