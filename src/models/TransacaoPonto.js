import { DataTypes } from 'sequelize';
import { sequelize } from '../config/index.js';

const TransacaoPonto = sequelize.define(
  'transacao_ponto',
  {
    id: { field: 'id', type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true, allowNull: false },
    usuarioId: { field: 'usuario_id', type: DataTypes.INTEGER, allowNull: false },
    pedidoId: { field: 'pedido_id', type: DataTypes.INTEGER, allowNull: true },
    valor: { field: 'valor', type: DataTypes.INTEGER, allowNull: false },
    tipo: { field: 'tipo', type: DataTypes.ENUM('credito', 'debito'), allowNull: false, defaultValue: 'credito' },
    descricao: { field: 'descricao', type: DataTypes.STRING, allowNull: false },
  },
  {
    tableName: 'transacoes_pontos',
    freezeTableName: true,
    timestamps: true,
    updatedAt: false,
  },
);

export default TransacaoPonto;
