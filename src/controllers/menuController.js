import { ItemMenu } from '../models/index.js';
import { createRecord, findById, listAll, removeRecord, respondNotFound, updateRecord } from './dbHelpers.js';

const menuAliases = {
  urlImagem: ['url_imagem'],
};

async function listar(req, res, next) {
  try {
    res.json(await listAll(ItemMenu));
  } catch (error) {
    next(error);
  }
}

async function buscar(req, res, next) {
  try {
    const item = await findById(ItemMenu, req.params.id);
    if (!item) return respondNotFound(res, 'Item do menu não encontrado.');
    res.json(item);
  } catch (error) {
    next(error);
  }
}

async function criar(req, res, next) {
  try {
    res.status(201).json(await createRecord(ItemMenu, req.body, menuAliases));
  } catch (error) {
    next(error);
  }
}

async function atualizar(req, res, next) {
  try {
    const item = await updateRecord(ItemMenu, req.params.id, req.body, menuAliases);
    if (!item) return respondNotFound(res, 'Item do menu não encontrado.');
    res.json(item);
  } catch (error) {
    next(error);
  }
}

async function remover(req, res, next) {
  try {
    const item = await removeRecord(ItemMenu, req.params.id);
    if (!item) return respondNotFound(res, 'Item do menu não encontrado.');
    res.json({ mensagem: 'Item removido com sucesso.', item });
  } catch (error) {
    next(error);
  }
}

export { listar, buscar, criar, atualizar, remover };
