import { Usuario } from '../models/index.js';
import { hashSenha, limparUsuario } from '../utils/auth.js';
import { createRecord, findById, listAll, removeRecord, respondNotFound, updateRecord } from './dbHelpers.js';

const usuarioAliases = {
  idFuncao: ['id_funcao'],
  senhaHash: ['senha_hash', 'senha'],
};

async function listar(req, res, next) {
  try {
    const usuarios = await listAll(Usuario);
    res.json(usuarios.map(limparUsuario));
  } catch (error) {
    next(error);
  }
}

async function buscar(req, res, next) {
  try {
    const usuario = await findById(Usuario, req.params.id);
    if (!usuario) return respondNotFound(res, 'Usuário não encontrado.');
    res.json(limparUsuario(usuario));
  } catch (error) {
    next(error);
  }
}

async function criar(req, res, next) {
  try {
    const { email, senha, senhaHash, senha_hash, ...resto } = req.body;

    if (!email || (!senha && !senhaHash && !senha_hash)) {
      return res.status(400).json({ mensagem: 'Informe email e senha para criar o usuário.' });
    }

    const usuarioExistente = await Usuario.findOne({ where: { email } });
    if (usuarioExistente) {
      return res.status(409).json({ mensagem: 'Já existe um usuário cadastrado com este e-mail.' });
    }

    const usuario = await createRecord(Usuario, {
      ...resto,
      email,
      senhaHash: hashSenha(senhaHash ?? senha_hash ?? senha),
      idFuncao: resto.idFuncao ?? resto.id_funcao ?? 1,
    }, usuarioAliases);
    res.status(201).json(limparUsuario(usuario));
  } catch (error) {
    next(error);
  }
}

async function atualizar(req, res, next) {
  try {
    const { senha, senhaHash, senha_hash, email, ...resto } = req.body;
    const payload = { ...resto };

    if (email) {
      payload.email = email;
    }

    if (senha || senhaHash || senha_hash) {
      payload.senhaHash = hashSenha(senhaHash ?? senha_hash ?? senha);
    }

    const usuario = await updateRecord(Usuario, req.params.id, payload, usuarioAliases);
    if (!usuario) return respondNotFound(res, 'Usuário não encontrado.');
    res.json(limparUsuario(usuario));
  } catch (error) {
    next(error);
  }
}

async function remover(req, res, next) {
  try {
    const usuario = await removeRecord(Usuario, req.params.id);
    if (!usuario) return respondNotFound(res, 'Usuário não encontrado.');
    res.json({ mensagem: 'Usuário removido com sucesso.', usuario: limparUsuario(usuario) });
  } catch (error) {
    next(error);
  }
}

export { listar, buscar, criar, atualizar, remover };
