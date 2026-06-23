import { PremioUsuario } from '../models/index.js';
import { createRecord, findById, listAll, removeRecord, respondNotFound, updateRecord } from './dbHelpers.js';

const premioUsuarioAliases = {
  usuarioId: ['usuario_id'],
  premioId: ['premio_id'],
  descontoPercentual: ['desconto_percentual'],
  resgatadoEm: ['resgatado_em'],
  expiraEm: ['expira_em'],
};

async function listar(req, res, next) {
  try {
    res.json(await listAll(PremioUsuario));
  } catch (error) {
    next(error);
  }
}

async function buscar(req, res, next) {
  try {
    const premioUsuario = await findById(PremioUsuario, req.params.id);
    if (!premioUsuario) return respondNotFound(res, 'Cupom não encontrado.');
    res.json(premioUsuario);
  } catch (error) {
    next(error);
  }
}

async function criar(req, res, next) {
  try {
    res.status(201).json(await createRecord(PremioUsuario, req.body, premioUsuarioAliases));
  } catch (error) {
    next(error);
  }
}

async function atualizar(req, res, next) {
  try {
    const premioUsuario = await updateRecord(PremioUsuario, req.params.id, req.body, premioUsuarioAliases);
    if (!premioUsuario) return respondNotFound(res, 'Cupom não encontrado.');
    res.json(premioUsuario);
  } catch (error) {
    next(error);
  }
}

async function remover(req, res, next) {
  try {
    const premioUsuario = await removeRecord(PremioUsuario, req.params.id);
    if (!premioUsuario) return respondNotFound(res, 'Cupom não encontrado.');
    res.json({ mensagem: 'Cupom removido com sucesso.', premioUsuario });
  } catch (error) {
    next(error);
  }
}

export { listar, buscar, criar, atualizar, remover };