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
  if (registro) { await registro.update(values); return registro; }
  return Model.create({ id, ...values });
}

export async function garantirSeedInicial() {
  // ── Usuário admin ────────────────────────────────────────
  const admin = await upsertById(Usuario, 1, {
    idFuncao: 2,
    nome: 'Administrador',
    email: 'admin@rodaesabor.com',
    senhaHash: hashSenha('admin123'),
    cpf: null,
    telefone: null,
    pontos: 500,
  });

  await upsertById(Endereco, 1, {
    usuarioId: admin.id,
    logradouro: 'Rua das Flores',
    numero: '100',
    bairro: 'Centro',
    complemento: 'Sala 1',
    referencia: 'Próximo à praça',
  });

  await upsertById(CartaoCredito, 1, {
    usuarioId: admin.id,
    numeroCartao: '4111111111111111',
    nomeCartao: 'Administrador',
    dataValidade: '12/30',
    cvv: '123',
  });

  // ════════════════════════════════════════════════════════
  // CARDÁPIO — LANCHES
  // ════════════════════════════════════════════════════════
  await upsertById(ItemMenu, 1, {
    nome: 'Hambúrguer da Casa',
    descricao: 'Blend 180g, queijo cheddar, alface, tomate, picles e molho especial da casa.',
    preco: 29.90,
    categoria: 'Lanche',
    urlImagem: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&q=80',
    ativo: true,
  });

  await upsertById(ItemMenu, 2, {
    nome: 'Duplo Bacon',
    descricao: 'Dois blends 120g, bacon crocante, queijo prato duplo, cebola caramelizada e maionese defumada.',
    preco: 38.90,
    categoria: 'Lanche',
    urlImagem: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=600&q=80',
    ativo: true,
  });

  await upsertById(ItemMenu, 3, {
    nome: 'Frango Crispy',
    descricao: 'Peito de frango empanado crocante, queijo mussarela, molho honey mustard e coleslaw.',
    preco: 27.90,
    categoria: 'Lanche',
    urlImagem: 'https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=600&q=80',
    ativo: true,
  });

  await upsertById(ItemMenu, 4, {
    nome: 'Veggie Especial',
    descricao: 'Blend de grão-de-bico e beterraba, queijo vegano, rúcula, tomate seco e pesto.',
    preco: 31.90,
    categoria: 'Lanche',
    urlImagem: 'https://images.unsplash.com/photo-1520072959219-c595dc870360?w=600&q=80',
    ativo: true,
  });

  await upsertById(ItemMenu, 5, {
    nome: 'X-Tudo Clássico',
    descricao: 'Blend 180g, ovo, presunto, bacon, queijo, alface, tomate e milho.',
    preco: 34.90,
    categoria: 'Lanche',
    urlImagem: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=600&q=80',
    ativo: true,
  });

  await upsertById(ItemMenu, 6, {
    nome: 'Mini Burger (2 un.)',
    descricao: 'Dois miniburgers de blend 80g, queijo cheddar e molho especial. Perfeito para entrada.',
    preco: 22.90,
    categoria: 'Lanche',
    urlImagem: 'https://images.unsplash.com/photo-1561758033-d89a9ad46330?w=600&q=80',
    ativo: true,
  });

  // ════════════════════════════════════════════════════════
  // CARDÁPIO — PRATOS PRONTOS
  // ════════════════════════════════════════════════════════
  await upsertById(ItemMenu, 7, {
    nome: 'Filé à Parmegiana',
    descricao: 'Filé de frango empanado ao molho de tomate artesanal, gratinado com mussarela. Acompanha arroz e fritas.',
    preco: 44.90,
    categoria: 'Prato',
    urlImagem: 'https://images.unsplash.com/photo-1632778149955-e80f8ceca2e8?w=600&q=80',
    ativo: true,
  });

  await upsertById(ItemMenu, 8, {
    nome: 'Frango Grelhado Fit',
    descricao: 'Peito de frango grelhado temperado com ervas, acompanha salada verde e arroz integral.',
    preco: 38.90,
    categoria: 'Prato',
    urlImagem: 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?w=600&q=80',
    ativo: true,
  });

  await upsertById(ItemMenu, 9, {
    nome: 'Picanha na Chapa',
    descricao: '200g de picanha grelhada ao ponto, com arroz, feijão tropeiro, farofa e vinagrete.',
    preco: 59.90,
    categoria: 'Prato',
    urlImagem: 'https://images.unsplash.com/photo-1558030006-450675393462?w=600&q=80',
    ativo: true,
  });

  await upsertById(ItemMenu, 10, {
    nome: 'Massa ao Molho Rosé',
    descricao: 'Penne ao cremoso molho rosé com champignon, presunto e ervilhas. Acompanha pão de alho.',
    preco: 36.90,
    categoria: 'Prato',
    urlImagem: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=600&q=80',
    ativo: true,
  });

  await upsertById(ItemMenu, 11, {
    nome: 'Salmão Grelhado',
    descricao: '180g de salmão grelhado com manteiga de ervas, acompanha purê de batata-doce e legumes no vapor.',
    preco: 62.90,
    categoria: 'Prato',
    urlImagem: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=600&q=80',
    ativo: true,
  });

  await upsertById(ItemMenu, 12, {
    nome: 'Strogonoff de Frango',
    descricao: 'Frango em tiras ao molho cremoso de tomate e creme de leite, com arroz e batata palha.',
    preco: 39.90,
    categoria: 'Prato',
    urlImagem: 'https://images.unsplash.com/photo-1604908177453-7462950a6a3b?w=600&q=80',
    ativo: true,
  });

  await upsertById(ItemMenu, 13, {
    nome: 'Marmita Executiva',
    descricao: 'Prato do dia com proteína, arroz, feijão, salada e sobremesa. Muda diariamente.',
    preco: 28.90,
    categoria: 'Prato',
    urlImagem: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=600&q=80',
    ativo: true,
  });

  // ════════════════════════════════════════════════════════
  // CARDÁPIO — ACOMPANHAMENTOS
  // ════════════════════════════════════════════════════════
  await upsertById(ItemMenu, 14, {
    nome: 'Batata Frita Clássica',
    descricao: 'Porção de fritas crocantes temperadas com sal e orégano. Para 1-2 pessoas.',
    preco: 14.90,
    categoria: 'Acompanhamento',
    urlImagem: 'https://images.unsplash.com/photo-1576107232684-1279f390859f?w=600&q=80',
    ativo: true,
  });

  await upsertById(ItemMenu, 15, {
    nome: 'Onion Rings',
    descricao: 'Anéis de cebola empanados e fritos, crocantes por fora e macios por dentro.',
    preco: 16.90,
    categoria: 'Acompanhamento',
    urlImagem: 'https://images.unsplash.com/photo-1639024471283-03518883512d?w=600&q=80',
    ativo: true,
  });

  await upsertById(ItemMenu, 16, {
    nome: 'Mandioca Frita',
    descricao: 'Mandioca cozida e frita com sal grosso. Crocante por fora, macia por dentro.',
    preco: 13.90,
    categoria: 'Acompanhamento',
    urlImagem: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?w=600&q=80',
    ativo: true,
  });

  // ════════════════════════════════════════════════════════
  // CARDÁPIO — BEBIDAS
  // ════════════════════════════════════════════════════════
  await upsertById(ItemMenu, 17, {
    nome: 'Refrigerante Lata',
    descricao: 'Coca-Cola, Guaraná, Sprite ou Fanta. Gelado.',
    preco: 6.90,
    categoria: 'Bebida',
    urlImagem: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=600&q=80',
    ativo: true,
  });

  await upsertById(ItemMenu, 18, {
    nome: 'Suco Natural 400ml',
    descricao: 'Laranja, Limão, Abacaxi com Hortelã ou Maracujá. Feito na hora.',
    preco: 11.90,
    categoria: 'Bebida',
    urlImagem: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=600&q=80',
    ativo: true,
  });

  await upsertById(ItemMenu, 19, {
    nome: 'Água Mineral 500ml',
    descricao: 'Água mineral sem gás ou com gás.',
    preco: 4.90,
    categoria: 'Bebida',
    urlImagem: null,
    ativo: true,
  });

  // ════════════════════════════════════════════════════════
  // CARDÁPIO — SOBREMESAS
  // ════════════════════════════════════════════════════════
  await upsertById(ItemMenu, 20, {
    nome: 'Brownie com Sorvete',
    descricao: 'Brownie de chocolate quente com uma bola de sorvete de creme e calda de chocolate.',
    preco: 18.90,
    categoria: 'Sobremesa',
    urlImagem: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600&q=80',
    ativo: true,
  });

  await upsertById(ItemMenu, 21, {
    nome: 'Pudim da Casa',
    descricao: 'Pudim de leite condensado artesanal com calda de caramelo.',
    preco: 12.90,
    categoria: 'Sobremesa',
    urlImagem: 'https://images.unsplash.com/photo-1615937657715-bc7b4b7962c1?w=600&q=80',
    ativo: true,
  });

  // ════════════════════════════════════════════════════════
  // ROLETA — 10 prêmios balanceados (com chance real de perder)
  // Total de pesos: 100 (= 100%). Interpretar como %.
  //
  // Resultado           | Desconto | Peso | % real
  // --------------------|----------|------|--------
  // Não foi dessa vez   |   0%     |  30  | 30.0%
  // Tente outra vez     |   0%     |  15  | 15.0%
  // 5% de desconto      |   5%     |  20  | 20.0%
  // 10% de desconto     |  10%     |  13  | 13.0%
  // 15% de desconto     |  15%     |   9  |  9.0%
  // 20% de desconto     |  20%     |   6  |  6.0%
  // Frete grátis*       |   0%     |   4  |  4.0%  (sem desconto $ = 0%)
  // 25% de desconto     |  25%     |   2  |  2.0%
  // 30% de desconto     |  30%     |  0.7 |  0.7%
  // JACKPOT 50%         |  50%     |  0.3 |  0.3%
  // Total               |          | 100  | 100 %
  // ════════════════════════════════════════════════════════

  await upsertById(PremioRoleta, 1, {
    nome: 'Não foi dessa vez',
    descricao: 'Continue acumulando pontos e tente novamente!',
    descontoPercentual: 0,
    probabilidadeVitoria: 30,
    cor: '#2a2218',
    ativo: true,
  });

  await upsertById(PremioRoleta, 2, {
    nome: 'Tente outra vez',
    descricao: 'Que pena! Mas cada pedido traz novos pontos.',
    descontoPercentual: 0,
    probabilidadeVitoria: 15,
    cor: '#1c1814',
    ativo: true,
  });

  await upsertById(PremioRoleta, 3, {
    nome: '5% OFF',
    descricao: 'Cupom de 5% de desconto no próximo pedido.',
    descontoPercentual: 5,
    probabilidadeVitoria: 20,
    cor: '#8a7a4f',
    ativo: true,
  });

  await upsertById(PremioRoleta, 4, {
    nome: '10% OFF',
    descricao: 'Cupom de 10% de desconto no próximo pedido.',
    descontoPercentual: 10,
    probabilidadeVitoria: 13,
    cor: '#d4af37',
    ativo: true,
  });

  await upsertById(PremioRoleta, 5, {
    nome: '15% OFF',
    descricao: 'Cupom de 15% de desconto no próximo pedido.',
    descontoPercentual: 15,
    probabilidadeVitoria: 9,
    cor: '#b8960c',
    ativo: true,
  });

  await upsertById(PremioRoleta, 6, {
    nome: '20% OFF',
    descricao: 'Cupom de 20% de desconto no próximo pedido.',
    descontoPercentual: 20,
    probabilidadeVitoria: 6,
    cor: '#c9a227',
    ativo: true,
  });

  await upsertById(PremioRoleta, 7, {
    nome: 'Frete Grátis',
    descricao: 'Entrega gratuita no próximo pedido (cupom especial).',
    descontoPercentual: 0,
    probabilidadeVitoria: 4,
    cor: '#4a7c59',
    ativo: true,
  });

  await upsertById(PremioRoleta, 8, {
    nome: '25% OFF',
    descricao: 'Cupom de 25% de desconto. Você teve muita sorte!',
    descontoPercentual: 25,
    probabilidadeVitoria: 2,
    cor: '#f2d680',
    ativo: true,
  });

  await upsertById(PremioRoleta, 9, {
    nome: '30% OFF',
    descricao: 'Cupom raro de 30%! Aproveite bem!',
    descontoPercentual: 30,
    probabilidadeVitoria: 0.7,
    cor: '#e8c547',
    ativo: true,
  });

  await upsertById(PremioRoleta, 10, {
    nome: '🎰 JACKPOT 50%',
    descricao: 'JACKPOT! 50% de desconto. Probabilidade rarissíma!',
    descontoPercentual: 50,
    probabilidadeVitoria: 0.3,
    cor: '#ff9d00',
    ativo: true,
  });

  // ── Pedido e registros de exemplo ───────────────────────
  const premioEx = await PremioRoleta.findByPk(4); // 10% OFF
  const cupomEx = await upsertById(PremioUsuario, 1, {
    usuarioId: admin.id,
    premioId: premioEx.id,
    codigo: 'CUPOM-SEED-001',
    descontoPercentual: 10,
    resgatado: false,
    resgatadoEm: null,
    expiraEm: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
  });

  const pedido = await upsertById(Pedido, 1, {
    usuarioId: admin.id,
    cupomId: cupomEx.id,
    valorBruto: 29.90,
    valorDesconto: 2.99,
    precoTotal: 26.91,
    pontosGerados: 27,
    situacao: 'pago',
  });

  await upsertById(ItemPedido, 1, {
    pedidoId: pedido.id,
    itemMenuId: 1,
    quantidade: 1,
    precoUnitario: 29.90,
    subtotal: 29.90,
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
    descricao: 'Crédito inicial de visualização',
  });

  console.log('✅ Seed garantida: 21 itens no cardápio, 10 prêmios na roleta, admin com 500 pts.');
}
