import { verificarToken } from '../utils/auth.js';
import { Usuario } from '../models/index.js';

async function autenticar(req, res, next) {
  try {
    const authHeader = req.headers.authorization || '';
    const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;
    const payload = verificarToken(token);

    if (!payload) {
      return res.status(401).json({ mensagem: 'Token inválido ou expirado.' });
    }

    const usuario = await Usuario.findByPk(payload.id);
    if (!usuario) {
      return res.status(401).json({ mensagem: 'Usuário não encontrado.' });
    }

    req.usuario = usuario;
    next();
  } catch (error) {
    return res.status(401).json({ mensagem: 'Não foi possível autenticar a requisição.' });
  }
}

function exigirAdmin(req, res, next) {
    if (!req.usuario || (req.usuario.idFuncao ?? req.usuario.id_funcao) !== 2) {
    return res.status(403).json({ mensagem: 'Acesso permitido apenas para administradores.' });
  }
  next();
}

export {
  autenticar,
  exigirAdmin,
};
