import { DataTypes } from 'sequelize';
import { sequelize } from '../config/index.js';

const Endereco = sequelize.define(
  'endereco',
  {
    id: { field: 'id', type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true, allowNull: false },
    usuarioId: { field: 'usuario_id', type: DataTypes.INTEGER, allowNull: false },
    logradouro: { field: 'logradouro', type: DataTypes.STRING, allowNull: false },
    numero: { field: 'numero', type: DataTypes.STRING, allowNull: false },
    bairro: { field: 'bairro', type: DataTypes.STRING, allowNull: false },
    complemento: { field: 'complemento', type: DataTypes.STRING, allowNull: true },
    referencia: { field: 'referencia', type: DataTypes.STRING, allowNull: true },
  },
  {
    tableName: 'enderecos',
    freezeTableName: true,
    timestamps: true,
  },
);

export default Endereco;
