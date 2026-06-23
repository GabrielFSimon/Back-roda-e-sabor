BEGIN;

INSERT INTO usuarios (
  id,
  id_funcao,
  nome,
  email,
  senha_hash,
  cpf,
  telefone,
  pontos,
  created_at,
  updated_at
) VALUES (
  1,
  2,
  'Administrador',
  'admin@rodaesabor.com',
  'seed_admin_salt:54a649040578a9754d6079e998551604a421bc59414e8f4db469aa2fc85dc2d3b300a86eeab36cf552cd6180dfa9609cc55cf75536ce626868ee4d90e3c2c4bb',
  NULL,
  NULL,
  0,
  NOW(),
  NOW()
) ON CONFLICT (id) DO UPDATE SET
  id_funcao = EXCLUDED.id_funcao,
  nome = EXCLUDED.nome,
  email = EXCLUDED.email,
  senha_hash = EXCLUDED.senha_hash,
  cpf = EXCLUDED.cpf,
  telefone = EXCLUDED.telefone,
  pontos = EXCLUDED.pontos,
  updated_at = NOW();

INSERT INTO enderecos (
  id,
  usuario_id,
  logradouro,
  numero,
  bairro,
  complemento,
  referencia,
  created_at,
  updated_at
) VALUES (
  1,
  1,
  'Rua Exemplo',
  '100',
  'Centro',
  'Apto 10',
  'Proximo a padaria',
  NOW(),
  NOW()
) ON CONFLICT (id) DO UPDATE SET
  usuario_id = EXCLUDED.usuario_id,
  logradouro = EXCLUDED.logradouro,
  numero = EXCLUDED.numero,
  bairro = EXCLUDED.bairro,
  complemento = EXCLUDED.complemento,
  referencia = EXCLUDED.referencia,
  updated_at = NOW();

INSERT INTO cartoes_credito (
  id,
  usuario_id,
  numero_cartao,
  nome_cartao,
  data_validade,
  cvv,
  created_at,
  updated_at
) VALUES (
  1,
  1,
  '4111111111111111',
  'Administrador',
  '12/30',
  '123',
  NOW(),
  NOW()
) ON CONFLICT (id) DO UPDATE SET
  usuario_id = EXCLUDED.usuario_id,
  numero_cartao = EXCLUDED.numero_cartao,
  nome_cartao = EXCLUDED.nome_cartao,
  data_validade = EXCLUDED.data_validade,
  cvv = EXCLUDED.cvv,
  updated_at = NOW();

-- Perfil 2 = administrador no sistema atual.

INSERT INTO itens_menu (
  id,
  nome,
  descricao,
  preco,
  categoria,
  url_imagem,
  ativo,
  created_at,
  updated_at
) VALUES (
  1,
  'Hambúrguer da Casa',
  'Hambúrguer artesanal com queijo, molho especial e batata.',
  29.90,
  'Lanche',
  NULL,
  TRUE,
  NOW(),
  NOW()
) ON CONFLICT (id) DO UPDATE SET
  nome = EXCLUDED.nome,
  descricao = EXCLUDED.descricao,
  preco = EXCLUDED.preco,
  categoria = EXCLUDED.categoria,
  url_imagem = EXCLUDED.url_imagem,
  ativo = EXCLUDED.ativo,
  updated_at = NOW();

INSERT INTO premios_roleta (
  id,
  nome,
  descricao,
  desconto_percentual,
  probabilidade_vitoria,
  cor,
  ativo,
  created_at,
  updated_at
) VALUES (
  1,
  'Desconto de 10%',
  'Cupom simples gerado pela roleta.',
  10,
  100,
  '#ff8a00',
  TRUE,
  NOW(),
  NOW()
) ON CONFLICT (id) DO UPDATE SET
  nome = EXCLUDED.nome,
  descricao = EXCLUDED.descricao,
  desconto_percentual = EXCLUDED.desconto_percentual,
  probabilidade_vitoria = EXCLUDED.probabilidade_vitoria,
  cor = EXCLUDED.cor,
  ativo = EXCLUDED.ativo,
  updated_at = NOW();

INSERT INTO premios_usuario (
  id,
  usuario_id,
  premio_id,
  codigo,
  desconto_percentual,
  resgatado,
  resgatado_em,
  expira_em,
  created_at,
  updated_at
) VALUES (
  1,
  1,
  1,
  'CUPOM-SEED-001',
  10,
  FALSE,
  NULL,
  NOW() + INTERVAL '30 days',
  NOW(),
  NOW()
) ON CONFLICT (id) DO UPDATE SET
  usuario_id = EXCLUDED.usuario_id,
  premio_id = EXCLUDED.premio_id,
  codigo = EXCLUDED.codigo,
  desconto_percentual = EXCLUDED.desconto_percentual,
  resgatado = EXCLUDED.resgatado,
  resgatado_em = EXCLUDED.resgatado_em,
  expira_em = EXCLUDED.expira_em,
  updated_at = NOW();

INSERT INTO pedidos (
  id,
  usuario_id,
  cupom_id,
  valor_bruto,
  valor_desconto,
  preco_total,
  pontos_gerados,
  situacao,
  created_at,
  updated_at
) VALUES (
  1,
  1,
  1,
  29.90,
  2.99,
  26.91,
  27,
  'pago',
  NOW(),
  NOW()
) ON CONFLICT (id) DO UPDATE SET
  usuario_id = EXCLUDED.usuario_id,
  cupom_id = EXCLUDED.cupom_id,
  valor_bruto = EXCLUDED.valor_bruto,
  valor_desconto = EXCLUDED.valor_desconto,
  preco_total = EXCLUDED.preco_total,
  pontos_gerados = EXCLUDED.pontos_gerados,
  situacao = EXCLUDED.situacao,
  updated_at = NOW();

INSERT INTO itens_pedido (
  id,
  pedido_id,
  item_menu_id,
  quantidade,
  preco_unitario,
  subtotal,
  created_at,
  updated_at
) VALUES (
  1,
  1,
  1,
  1,
  29.90,
  29.90,
  NOW(),
  NOW()
) ON CONFLICT (id) DO UPDATE SET
  pedido_id = EXCLUDED.pedido_id,
  item_menu_id = EXCLUDED.item_menu_id,
  quantidade = EXCLUDED.quantidade,
  preco_unitario = EXCLUDED.preco_unitario,
  subtotal = EXCLUDED.subtotal,
  updated_at = NOW();

INSERT INTO pagamentos (
  id,
  pedido_id,
  metodo,
  valor,
  situacao,
  codigo_pix,
  created_at,
  updated_at
) VALUES (
  1,
  1,
  'pix',
  26.91,
  'aprovado',
  'PIX-SEED-001',
  NOW(),
  NOW()
) ON CONFLICT (id) DO UPDATE SET
  pedido_id = EXCLUDED.pedido_id,
  metodo = EXCLUDED.metodo,
  valor = EXCLUDED.valor,
  situacao = EXCLUDED.situacao,
  codigo_pix = EXCLUDED.codigo_pix,
  updated_at = NOW();

INSERT INTO transacoes_pontos (
  id,
  usuario_id,
  pedido_id,
  valor,
  tipo,
  descricao,
  created_at
) VALUES (
  1,
  1,
  1,
  27,
  'credito',
  'Credito inicial de visualizacao',
  NOW()
) ON CONFLICT (id) DO UPDATE SET
  usuario_id = EXCLUDED.usuario_id,
  pedido_id = EXCLUDED.pedido_id,
  valor = EXCLUDED.valor,
  tipo = EXCLUDED.tipo,
  descricao = EXCLUDED.descricao;

COMMIT;
