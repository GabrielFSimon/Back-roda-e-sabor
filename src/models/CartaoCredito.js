import { DataTypes } from 'sequelize';
import { sequelize } from '../config/index.js';

const CartaoCredito = sequelize.define(
  'cartao_credito',
  {
    id: { field: 'id', type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true, allowNull: false },
    usuarioId: { field: 'usuario_id', type: DataTypes.INTEGER, allowNull: false },
    numeroCartao: { field: 'numero_cartao', type: DataTypes.STRING, allowNull: false },
    nomeCartao: { field: 'nome_cartao', type: DataTypes.STRING, allowNull: false },
    dataValidade: { field: 'data_validade', type: DataTypes.STRING, allowNull: false },
    cvv: { field: 'cvv', type: DataTypes.STRING, allowNull: false },
  },
  {
    tableName: 'cartoes_credito',
    freezeTableName: true,
    timestamps: true,
  },
);

export default CartaoCredito;
