import { sequelize, Pedido, ItemPedido, ItemMenu, PremioUsuario, TransacaoPonto, Pagamento } from '../models/index.js';
import { limparUsuario } from '../utils/auth.js';
import { createRecord, findById, listAll, removeRecord, respondNotFound, updateRecord } from './dbHelpers.js';

const pedidoAliases = {
  usuarioId: ['usuario_id'],
  cupomId: ['cupom_id'],
  valorBruto: ['valor_bruto'],
  valorDesconto: ['valor_desconto'],
  precoTotal: ['preco_total'],
  pontosGerados: ['pontos_gerados'],
};

const includeCompleto = [
  { model: ItemPedido, as: 'itens', include: [{ model: ItemMenu, as: 'item_menu' }] },
  { model: Pagamento },
  { model: PremioUsuario, as: 'cupom' },
];

async function listar(req, res, next) {
  try {
    const pedidos = await Pedido.findAll({
      where: { usuarioId: req.usuario.id },
      include: includeCompleto,
      order: [['id', 'DESC']],
    });
    res.json(pedidos);
  } catch (error) {
    next(error);
  }
}

async function listarTodos(req, res, next) {
  try {
    const pedidos = await Pedido.findAll({ include: includeCompleto, order: [['id', 'DESC']] });
    res.json(pedidos);
  } catch (error) {
    next(error);
  }
}

async function buscar(req, res, next) {
  try {
    const pedido = await Pedido.findOne({ where: { id: req.params.id }, include: includeCompleto });
    if (!pedido) return respondNotFound(res, 'Pedido não encontrado.');
    res.json(pedido);
  } catch (error) {
    next(error);
  }
}

async function criar(req, res, next) {
  try {
    const itens = Array.isArray(req.body.itens) ? req.body.itens : [];
    if (itens.length === 0) {
      return res.status(400).json({ mensagem: 'Informe ao menos um item para o pedido.' });
    }

    const resultado = await sequelize.transaction(async (transaction) => {
      const idsItens = itens.map((item) => item.itemMenuId ?? item.item_menu_id);
      const itensMenu = await ItemMenu.findAll({ where: { id: idsItens } });

      if (itensMenu.length !== idsItens.length) {
        throw Object.assign(new Error('Um ou mais itens do menu não foram encontrados.'), { status: 400 });
      }

      let valorBruto = 0;
      const itensPedido = [];

      for (const item of itens) {
        const itemMenuId = item.itemMenuId ?? item.item_menu_id;
        const quantidade = Number(item.quantidade ?? 1);
        const itemMenu = itensMenu.find((registro) => registro.id === Number(itemMenuId));
        const precoUnitario = Number(itemMenu.preco);
        const subtotal = precoUnitario * quantidade;
        valorBruto += subtotal;
        itensPedido.push({
          pedidoId: null,
          itemMenuId,
          quantidade,
          precoUnitario,
          subtotal,
        });
      }

      let cupom = null;
      let valorDesconto = 0;
      const cupomId = req.body.cupomId ?? req.body.cupom_id ?? null;

      if (cupomId) {
        cupom = await PremioUsuario.findOne({
          where: { id: cupomId, usuarioId: req.usuario.id },
          transaction,
        });

        if (!cupom) {
          throw Object.assign(new Error('Cupom não encontrado.'), { status: 404 });
        }

        if (cupom.resgatado) {
          throw Object.assign(new Error('Cupom já foi utilizado.'), { status: 400 });
        }

        valorDesconto = Number(((valorBruto * Number(cupom.descontoPercentual)) / 100).toFixed(2));
      }

      const precoTotal = Number((valorBruto - valorDesconto).toFixed(2));
      const pontosGerados = Math.floor(precoTotal);

      const pedido = await Pedido.create({
        usuarioId: req.usuario.id,
        cupomId,
        valorBruto,
        valorDesconto,
        precoTotal,
        pontosGerados,
        situacao: 'pendente',
      }, { transaction });

      for (const itemPedido of itensPedido) {
        itemPedido.pedidoId = pedido.id;
      }

      await ItemPedido.bulkCreate(itensPedido, { transaction });

      if (cupom) {
        cupom.resgatado = true;
        cupom.resgatadoEm = new Date();
        await cupom.save({ transaction });
      }

      await req.usuario.increment('pontos', { by: pontosGerados, transaction });
      await TransacaoPonto.create({
        usuarioId: req.usuario.id,
        pedidoId: pedido.id,
        valor: pontosGerados,
        tipo: 'credito',
        descricao: 'Pontos gerados pelo pedido.',
      }, { transaction });

      return {
        pedido: await Pedido.findByPk(pedido.id, { include: includeCompleto, transaction }),
        usuario: await req.usuario.reload({ transaction }),
      };
    });

    res.status(201).json({
      ...resultado.pedido.toJSON(),
      usuario: limparUsuario(resultado.usuario),
      message: `Pedido finalizado! Você ganhou ${resultado.pedido.pontosGerados} pontos.`,
    });
  } catch (error) {
    next(error);
  }
}

async function atualizar(req, res, next) {
  try {
    const pedido = await updateRecord(Pedido, req.params.id, req.body, pedidoAliases);
    if (!pedido) return respondNotFound(res, 'Pedido não encontrado.');
    res.json(pedido);
  } catch (error) {
    next(error);
  }
}

async function remover(req, res, next) {
  try {
    const pedido = await removeRecord(Pedido, req.params.id);
    if (!pedido) return respondNotFound(res, 'Pedido não encontrado.');
    res.json({ mensagem: 'Pedido removido com sucesso.', pedido });
  } catch (error) {
    next(error);
  }
}

export { listar, listarTodos, buscar, criar, atualizar, remover };
