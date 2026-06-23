import { TransacaoPonto } from '../models/index.js';
import { createRecord, findById, listAll, removeRecord, respondNotFound, updateRecord } from './dbHelpers.js';

const transacaoAliases = {
  usuarioId: ['usuario_id'],
  pedidoId: ['pedido_id'],
};

async function extrato(req, res, next) {
  try {
    const extratoPontos = await listAll(TransacaoPonto, { usuarioId: req.usuario.id });
    res.json(extratoPontos);
  } catch (error) {
    next(error);
  }
}

async function listar(req, res, next) {
  try {
    res.json(await listAll(TransacaoPonto));
  } catch (error) {
    next(error);
  }
}

async function buscar(req, res, next) {
  try {
    const transacao = await findById(TransacaoPonto, req.params.id);
    if (!transacao) return respondNotFound(res, 'Transação não encontrada.');
    res.json(transacao);
  } catch (error) {
    next(error);
  }
}

async function criar(req, res, next) {
  try {
    res.status(201).json(await createRecord(TransacaoPonto, req.body, transacaoAliases));
  } catch (error) {
    next(error);
  }
}

async function atualizar(req, res, next) {
  try {
    const transacao = await updateRecord(TransacaoPonto, req.params.id, req.body, transacaoAliases);
    if (!transacao) return respondNotFound(res, 'Transação não encontrada.');
    res.json(transacao);
  } catch (error) {
    next(error);
  }
}

async function remover(req, res, next) {
  try {
    const transacao = await removeRecord(TransacaoPonto, req.params.id);
    if (!transacao) return respondNotFound(res, 'Transação não encontrada.');
    res.json({ mensagem: 'Transação removida com sucesso.', transacao });
  } catch (error) {
    next(error);
  }
}

export { extrato, listar, buscar, criar, atualizar, remover };
