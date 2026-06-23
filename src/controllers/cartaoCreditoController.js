import { CartaoCredito } from '../models/index.js';
import { createRecord, findById, listAll, removeRecord, respondNotFound, updateRecord } from './dbHelpers.js';

const cartaoAliases = {
  usuarioId: ['usuario_id'],
  numeroCartao: ['numero_cartao'],
  nomeCartao: ['nome_cartao'],
  dataValidade: ['data_validade'],
};

function cartaoScope(req) {
  return req.usuario?.idFuncao === 2 ? {} : { usuarioId: req.usuario.id };
}

async function listar(req, res, next) {
  try {
    res.json(await listAll(CartaoCredito, cartaoScope(req)));
  } catch (error) {
    next(error);
  }
}

async function buscar(req, res, next) {
  try {
    const cartao = await findById(CartaoCredito, req.params.id, cartaoScope(req));
    if (!cartao) return respondNotFound(res, 'Cartão não encontrado.');
    res.json(cartao);
  } catch (error) {
    next(error);
  }
}

async function criar(req, res, next) {
  try {
    const payload = req.usuario?.idFuncao === 2 ? req.body : { ...req.body, usuarioId: req.usuario.id };
    const cartao = await createRecord(CartaoCredito, payload, cartaoAliases);
    res.status(201).json(cartao);
  } catch (error) {
    next(error);
  }
}

async function atualizar(req, res, next) {
  try {
    const cartao = await updateRecord(CartaoCredito, req.params.id, req.body, cartaoAliases, cartaoScope(req));
    if (!cartao) return respondNotFound(res, 'Cartão não encontrado.');
    res.json(cartao);
  } catch (error) {
    next(error);
  }
}

async function remover(req, res, next) {
  try {
    const cartao = await removeRecord(CartaoCredito, req.params.id, cartaoScope(req));
    if (!cartao) return respondNotFound(res, 'Cartão não encontrado.');
    res.json({ mensagem: 'Cartão removido com sucesso.', cartao });
  } catch (error) {
    next(error);
  }
}

export { listar, buscar, criar, atualizar, remover };
