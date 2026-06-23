import {
  CartaoCredito,
  Endereco,
  ItemMenu,
  ItemPedido,
  Pagamento,
  Pedido,
  PremioRoleta,
  PremioUsuario,
  TransacaoPonto,
  Usuario,
} from '../models/index.js';
import { hashSenha } from '../utils/auth.js';

async function upsertById(Model, id, values) {
  const registro = await Model.findByPk(id);

  if (registro) {
    await registro.update(values);
    return registro;
  }

  return Model.create({ id, ...values });
}

export async function garantirSeedInicial() {
  const admin = await upsertById(Usuario, 1, {
    idFuncao: 2,
    nome: 'Administrador',
    email: 'admin@rodaesabor.com',
    senhaHash: hashSenha('admin123'),
    cpf: null,
    telefone: null,
    pontos: 0,
  });

  await upsertById(Endereco, 1, {
    usuarioId: admin.id,
    logradouro: 'Rua Exemplo',
    numero: '100',
    bairro: 'Centro',
    complemento: 'Apto 10',
    referencia: 'Proximo a padaria',
  });

  await upsertById(CartaoCredito, 1, {
    usuarioId: admin.id,
    numeroCartao: '4111111111111111',
    nomeCartao: 'Administrador',
    dataValidade: '12/30',
    cvv: '123',
  });

  const itemMenu = await upsertById(ItemMenu, 1, {
    nome: 'Hamburguer da Casa',
    descricao: 'Hamburguer artesanal com queijo, molho especial e batata.',
    preco: 29.9,
    categoria: 'Lanche',
    urlImagem: null,
    ativo: true,
  });

  const premio = await upsertById(PremioRoleta, 1, {
    nome: 'Desconto de 10%',
    descricao: 'Cupom simples gerado pela roleta.',
    descontoPercentual: 10,
    probabilidadeVitoria: 100,
    cor: '#ff8a00',
    ativo: true,
  });

  const premioUsuario = await upsertById(PremioUsuario, 1, {
    usuarioId: admin.id,
    premioId: premio.id,
    codigo: 'CUPOM-SEED-001',
    descontoPercentual: 10,
    resgatado: false,
    resgatadoEm: null,
    expiraEm: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
  });

  const pedido = await upsertById(Pedido, 1, {
    usuarioId: admin.id,
    cupomId: premioUsuario.id,
    valorBruto: 29.9,
    valorDesconto: 2.99,
    precoTotal: 26.91,
    pontosGerados: 27,
    situacao: 'pago',
  });

  await upsertById(ItemPedido, 1, {
    pedidoId: pedido.id,
    itemMenuId: itemMenu.id,
    quantidade: 1,
    precoUnitario: 29.9,
    subtotal: 29.9,
  });

  await upsertById(Pagamento, 1, {
    pedidoId: pedido.id,
    metodo: 'pix',
    valor: 26.91,
    situacao: 'aprovado',
    codigoPix: 'PIX-SEED-001',
  });

  await upsertById(TransacaoPonto, 1, {
    usuarioId: admin.id,
    pedidoId: pedido.id,
    valor: 27,
    tipo: 'credito',
    descricao: 'Credito inicial de visualizacao',
  });

  console.log('Seed inicial garantida: admin, hamburguer e registros de exemplo.');
}
