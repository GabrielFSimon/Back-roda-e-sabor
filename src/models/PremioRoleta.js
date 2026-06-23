import { DataTypes } from 'sequelize';
import { sequelize } from '../config/index.js';

const PremioRoleta = sequelize.define(
  'premio_roleta',
  {
    id: { field: 'id', type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true, allowNull: false },
    nome: { field: 'nome', type: DataTypes.STRING, allowNull: false },
    descricao: { field: 'descricao', type: DataTypes.TEXT, allowNull: true },
    descontoPercentual: { field: 'desconto_percentual', type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    probabilidadeVitoria: { field: 'probabilidade_vitoria', type: DataTypes.FLOAT, allowNull: false },
    cor: { field: 'cor', type: DataTypes.STRING, allowNull: false, defaultValue: '#ff8a00' },
    ativo: { field: 'ativo', type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
  },
  {
    tableName: 'premios_roleta',
    freezeTableName: true,
    timestamps: true,
  },
);

export default PremioRoleta;
