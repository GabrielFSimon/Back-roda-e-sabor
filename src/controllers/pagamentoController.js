import { Pagamento } from '../models/index.js';
import { createRecord, findById, listAll, removeRecord, respondNotFound, updateRecord } from './dbHelpers.js';

const pagamentoAliases = {
  pedidoId: ['pedido_id'],
  codigoPix: ['codigo_pix'],
};

async function listar(req, res, next) {
  try {
    res.json(await listAll(Pagamento));
  } catch (error) {
    next(error);
  }
}

async function buscar(req, res, next) {
  try {
    const pagamento = await findById(Pagamento, req.params.id);
    if (!pagamento) return respondNotFound(res, 'Pagamento não encontrado.');
    res.json(pagamento);
  } catch (error) {
    next(error);
  }
}

async function criar(req, res, next) {
  try {
    res.status(201).json(await createRecord(Pagamento, req.body, pagamentoAliases));
  } catch (error) {
    next(error);
  }
}

async function atualizar(req, res, next) {
  try {
    const pagamento = await updateRecord(Pagamento, req.params.id, req.body, pagamentoAliases);
    if (!pagamento) return respondNotFound(res, 'Pagamento não encontrado.');
    res.json(pagamento);
  } catch (error) {
    next(error);
  }
}

async function remover(req, res, next) {
  try {
    const pagamento = await removeRecord(Pagamento, req.params.id);
    if (!pagamento) return respondNotFound(res, 'Pagamento não encontrado.');
    res.json({ mensagem: 'Pagamento removido com sucesso.', pagamento });
  } catch (error) {
    next(error);
  }
}

export { listar, buscar, criar, atualizar, remover };
