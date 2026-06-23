import { DataTypes } from 'sequelize';
import { sequelize } from '../config/index.js';

const Pagamento = sequelize.define(
  'pagamento',
  {
    id: { field: 'id', type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true, allowNull: false },
    pedidoId: { field: 'pedido_id', type: DataTypes.INTEGER, allowNull: false },
    metodo: { field: 'metodo', type: DataTypes.ENUM('cartao_credito', 'pix', 'dinheiro'), allowNull: false },
    valor: { field: 'valor', type: DataTypes.DECIMAL(10, 2), allowNull: false },
    situacao: { field: 'situacao', type: DataTypes.ENUM('pendente', 'aprovado', 'rejeitado'), allowNull: false, defaultValue: 'aprovado' },
    codigoPix: { field: 'codigo_pix', type: DataTypes.STRING, allowNull: true },
  },
  {
    tableName: 'pagamentos',
    freezeTableName: true,
    timestamps: true,
  },
);

export default Pagamento;
