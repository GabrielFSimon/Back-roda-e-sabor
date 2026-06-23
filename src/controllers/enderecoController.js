import { Endereco } from '../models/index.js';
import { createRecord, findById, listAll, removeRecord, respondNotFound, updateRecord } from './dbHelpers.js';

const enderecoAliases = {
  usuarioId: ['usuario_id'],
};

function enderecoScope(req) {
  return req.usuario?.idFuncao === 2 ? {} : { usuarioId: req.usuario.id };
}

async function listar(req, res, next) {
  try {
    res.json(await listAll(Endereco, enderecoScope(req)));
  } catch (error) {
    next(error);
  }
}

async function buscar(req, res, next) {
  try {
    const endereco = await findById(Endereco, req.params.id, enderecoScope(req));
    if (!endereco) return respondNotFound(res, 'Endereço não encontrado.');
    res.json(endereco);
  } catch (error) {
    next(error);
  }
}

async function criar(req, res, next) {
  try {
    const payload = req.usuario?.idFuncao === 2 ? req.body : { ...req.body, usuarioId: req.usuario.id };
    const endereco = await createRecord(Endereco, payload, enderecoAliases);
    res.status(201).json(endereco);
  } catch (error) {
    next(error);
  }
}

async function atualizar(req, res, next) {
  try {
    const endereco = await updateRecord(Endereco, req.params.id, req.body, enderecoAliases, enderecoScope(req));
    if (!endereco) return respondNotFound(res, 'Endereço não encontrado.');
    res.json(endereco);
  } catch (error) {
    next(error);
  }
}

async function remover(req, res, next) {
  try {
    const endereco = await removeRecord(Endereco, req.params.id, enderecoScope(req));
    if (!endereco) return respondNotFound(res, 'Endereço não encontrado.');
    res.json({ mensagem: 'Endereço removido com sucesso.', endereco });
  } catch (error) {
    next(error);
  }
}

export { listar, buscar, criar, atualizar, remover };
