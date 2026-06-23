import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import '../config/env.js';

const TOKEN_EXPIRATION_MS = 1000 * 60 * 60 * 12;

function hashSenha(senha) {
  return bcrypt.hashSync(String(senha), 10);
}

function compararSenha(senha, senhaHash) {
  if (!senhaHash) return false;

  if (senhaHash.startsWith('$2a$') || senhaHash.startsWith('$2b$') || senhaHash.startsWith('$2y$')) {
    return bcrypt.compareSync(String(senha), senhaHash);
  }

  if (!senhaHash.includes(':')) return false;

  const [salt, originalHash] = senhaHash.split(':');
  const novoHash = crypto.pbkdf2Sync(String(senha), salt, 10000, 64, 'sha512').toString('hex');
  if (originalHash.length !== novoHash.length) return false;
  return crypto.timingSafeEqual(Buffer.from(originalHash), Buffer.from(novoHash));
}

function base64Url(input) {
  return Buffer.from(JSON.stringify(input)).toString('base64url');
}

function assinar(conteudo) {
  return crypto
    .createHmac('sha256', process.env.JWT_SECRET || 'roda_sabor_secret')
    .update(conteudo)
    .digest('base64url');
}

function gerarToken(usuario) {
  const header = { alg: 'HS256', typ: 'JWT' };
  const payload = {
    id: usuario.id,
    nome: usuario.nome,
    email: usuario.email,
    idFuncao: usuario.idFuncao ?? usuario.id_funcao,
    exp: Date.now() + TOKEN_EXPIRATION_MS,
  };
  const body = `${base64Url(header)}.${base64Url(payload)}`;
  return `${body}.${assinar(body)}`;
}

function verificarToken(token) {
  if (!token || token.split('.').length !== 3) return null;
  const [header, payload, assinatura] = token.split('.');
  const body = `${header}.${payload}`;
  const assinaturaEsperada = assinar(body);

  if (assinatura !== assinaturaEsperada) return null;

  const dados = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'));
  if (dados.exp < Date.now()) return null;
  return dados;
}

function limparUsuario(usuario) {
  if (!usuario) return null;
  const plain = typeof usuario.get === 'function' ? usuario.get({ plain: true }) : { ...usuario };
  delete plain.senhaHash;
  delete plain.senha_hash;
  return plain;
}

export {
  hashSenha,
  compararSenha,
  gerarToken,
  verificarToken,
  limparUsuario,
};
