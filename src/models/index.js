import { sequelize } from '../config/index.js';
import Usuario from './Usuario.js';
import Endereco from './Endereco.js';
import CartaoCredito from './CartaoCredito.js';
import ItemMenu from './ItemMenu.js';
import Pedido from './Pedido.js';
import ItemPedido from './ItemPedido.js';
import Pagamento from './Pagamento.js';
import PremioRoleta from './PremioRoleta.js';
import PremioUsuario from './PremioUsuario.js';
import TransacaoPonto from './TransacaoPonto.js';

Usuario.hasMany(Endereco, { foreignKey: 'usuarioId' });
Endereco.belongsTo(Usuario, { foreignKey: 'usuarioId' });

Usuario.hasMany(CartaoCredito, { foreignKey: 'usuarioId' });
CartaoCredito.belongsTo(Usuario, { foreignKey: 'usuarioId' });

Usuario.hasMany(Pedido, { foreignKey: 'usuarioId' });
Pedido.belongsTo(Usuario, { foreignKey: 'usuarioId' });

Pedido.hasMany(ItemPedido, { foreignKey: 'pedidoId', as: 'itens' });
ItemPedido.belongsTo(Pedido, { foreignKey: 'pedidoId' });
ItemMenu.hasMany(ItemPedido, { foreignKey: 'itemMenuId' });
ItemPedido.belongsTo(ItemMenu, { foreignKey: 'itemMenuId', as: 'item_menu' });

Pedido.hasOne(Pagamento, { foreignKey: 'pedidoId' });
Pagamento.belongsTo(Pedido, { foreignKey: 'pedidoId' });

Usuario.hasMany(PremioUsuario, { foreignKey: 'usuarioId', as: 'cupons' });
PremioUsuario.belongsTo(Usuario, { foreignKey: 'usuarioId' });
PremioRoleta.hasMany(PremioUsuario, { foreignKey: 'premioId' });
PremioUsuario.belongsTo(PremioRoleta, { foreignKey: 'premioId', as: 'premio' });
Pedido.belongsTo(PremioUsuario, { foreignKey: 'cupomId', as: 'cupom' });

Usuario.hasMany(TransacaoPonto, { foreignKey: 'usuarioId', as: 'extrato_pontos' });
TransacaoPonto.belongsTo(Usuario, { foreignKey: 'usuarioId' });
Pedido.hasMany(TransacaoPonto, { foreignKey: 'pedidoId' });
TransacaoPonto.belongsTo(Pedido, { foreignKey: 'pedidoId' });

export async function syncModels(options = {}) {
  await sequelize.authenticate();
  await sequelize.sync(options);
}

export {
  sequelize,
  Usuario,
  Endereco,
  CartaoCredito,
  ItemMenu,
  Pedido,
  ItemPedido,
  Pagamento,
  PremioRoleta,
  PremioUsuario,
  TransacaoPonto,
};

export default {
  sequelize,
  syncModels,
  Usuario,
  Endereco,
  CartaoCredito,
  ItemMenu,
  Pedido,
  ItemPedido,
  Pagamento,
  PremioRoleta,
  PremioUsuario,
  TransacaoPonto,
};
