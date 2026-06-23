import { Usuario } from '../models/index.js';
import { hashSenha } from '../utils/auth.js';

const DEFAULT_ADMIN = {
  nome: process.env.ADMIN_NOME || 'Administrador',
  email: process.env.ADMIN_EMAIL || 'admin@rodaesabor.com',
  senha: process.env.ADMIN_SENHA || 'admin123',
};

export async function garantirAdminInicial() {
  const email = String(DEFAULT_ADMIN.email).trim().toLowerCase();
  if (!email) return;

  const adminExistente = await Usuario.findOne({ where: { email } });
  if (adminExistente) {
    if (adminExistente.idFuncao !== 2) {
      await adminExistente.update({ idFuncao: 2 });
      console.log(`Perfil de admin garantido para: ${email}`);
    }
    return;
  }

  await Usuario.create({
    nome: DEFAULT_ADMIN.nome,
    email,
    senhaHash: hashSenha(DEFAULT_ADMIN.senha),
    idFuncao: 2,
    pontos: 0,
  });

  console.log(`Admin inicial criado: ${email}`);
}
