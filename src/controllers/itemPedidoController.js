import { ItemPedido } from '../models/index.js';
import { createRecord, findById, listAll, removeRecord, respondNotFound, updateRecord } from './dbHelpers.js';

const itemPedidoAliases = {
  pedidoId: ['pedido_id'],
  itemMenuId: ['item_menu_id'],
  precoUnitario: ['preco_unitario'],
};

async function listar(req, res, next) {
  try {
    res.json(await listAll(ItemPedido));
  } catch (error) {
    next(error);
  }
}

async function buscar(req, res, next) {
  try {
    const item = await findById(ItemPedido, req.params.id);
    if (!item) return respondNotFound(res, 'Item do pedido não encontrado.');
    res.json(item);
  } catch (error) {
    next(error);
  }
}

async function criar(req, res, next) {
  try {
    res.status(201).json(await createRecord(ItemPedido, req.body, itemPedidoAliases));
  } catch (error) {
    next(error);
  }
}

async function atualizar(req, res, next) {
  try {
    const item = await updateRecord(ItemPedido, req.params.id, req.body, itemPedidoAliases);
    if (!item) return respondNotFound(res, 'Item do pedido não encontrado.');
    res.json(item);
  } catch (error) {
    next(error);
  }
}

async function remover(req, res, next) {
  try {
    const item = await removeRecord(ItemPedido, req.params.id);
    if (!item) return respondNotFound(res, 'Item do pedido não encontrado.');
    res.json({ mensagem: 'Item do pedido removido com sucesso.', item });
  } catch (error) {
    next(error);
  }
}

export { listar, buscar, criar, atualizar, remover };