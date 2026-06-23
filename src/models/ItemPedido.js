import { DataTypes } from 'sequelize';
import { sequelize } from '../config/index.js';

const ItemPedido = sequelize.define(
  'item_pedido',
  {
    id: { field: 'id', type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true, allowNull: false },
    pedidoId: { field: 'pedido_id', type: DataTypes.INTEGER, allowNull: false },
    itemMenuId: { field: 'item_menu_id', type: DataTypes.INTEGER, allowNull: false },
    quantidade: { field: 'quantidade', type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 },
    precoUnitario: { field: 'preco_unitario', type: DataTypes.DECIMAL(10, 2), allowNull: false },
    subtotal: { field: 'subtotal', type: DataTypes.DECIMAL(10, 2), allowNull: false },
  },
  {
    tableName: 'itens_pedido',
    freezeTableName: true,
    timestamps: true,
  },
);

export default ItemPedido;
