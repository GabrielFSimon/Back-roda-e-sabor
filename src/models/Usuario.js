import { DataTypes } from 'sequelize';
import { sequelize } from '../config/index.js';

const Usuario = sequelize.define(
  'usuario',
  {
    id: {
      field: 'id',
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    idFuncao: {
      field: 'id_funcao',
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    nome: {
      field: 'nome',
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      field: 'email',
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: { isEmail: true },
    },
    senhaHash: {
      field: 'senha_hash',
      type: DataTypes.STRING,
      allowNull: false,
    },
    cpf: {
      field: 'cpf',
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },
    telefone: {
      field: 'telefone',
      type: DataTypes.STRING,
      allowNull: true,
    },
    pontos: {
      field: 'pontos',
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    tableName: 'usuarios',
    freezeTableName: true,
    timestamps: true,
  },
);

export default Usuario;
