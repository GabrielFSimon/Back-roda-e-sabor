import { DataTypes } from 'sequelize';
import { sequelize } from '../config/index.js';

const PremioUsuario = sequelize.define(
  'premio_usuario',
  {
    id: { field: 'id', type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true, allowNull: false },
    usuarioId: { field: 'usuario_id', type: DataTypes.INTEGER, allowNull: false },
    premioId: { field: 'premio_id', type: DataTypes.INTEGER, allowNull: false },
    codigo: { field: 'codigo', type: DataTypes.STRING, allowNull: false, unique: true },
    descontoPercentual: { field: 'desconto_percentual', type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    resgatado: { field: 'resgatado', type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    resgatadoEm: { field: 'resgatado_em', type: DataTypes.DATE, allowNull: true },
    expiraEm: { field: 'expira_em', type: DataTypes.DATE, allowNull: false },
  },
  {
    tableName: 'premios_usuario',
    freezeTableName: true,
    timestamps: true,
  },
);

export default PremioUsuario;
