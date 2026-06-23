import { DataTypes } from 'sequelize';
import { sequelize } from '../config/index.js';

const Pedido = sequelize.define(
  'pedido',
  {
    id: { field: 'id', type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true, allowNull: false },
    usuarioId: { field: 'usuario_id', type: DataTypes.INTEGER, allowNull: false },
    cupomId: { field: 'cupom_id', type: DataTypes.INTEGER, allowNull: true },
    valorBruto: { field: 'valor_bruto', type: DataTypes.DECIMAL(10, 2), allowNull: false, defaultValue: 0 },
    valorDesconto: { field: 'valor_desconto', type: DataTypes.DECIMAL(10, 2), allowNull: false, defaultValue: 0 },
    precoTotal: { field: 'preco_total', type: DataTypes.DECIMAL(10, 2), allowNull: false, defaultValue: 0 },
    pontosGerados: { field: 'pontos_gerados', type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    situacao: {
      field: 'situacao',
      type: DataTypes.ENUM('pendente', 'pago', 'preparando', 'entregue', 'cancelado'),
      allowNull: false,
      defaultValue: 'pendente',
    },
  },
  {
    tableName: 'pedidos',
    freezeTableName: true,
    timestamps: true,
  },
);

export default Pedido;
