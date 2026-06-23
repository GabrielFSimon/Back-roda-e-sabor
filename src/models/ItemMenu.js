import { DataTypes } from 'sequelize';
import { sequelize } from '../config/index.js';

const ItemMenu = sequelize.define(
  'item_menu',
  {
    id: { field: 'id', type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true, allowNull: false },
    nome: { field: 'nome', type: DataTypes.STRING, allowNull: false },
    descricao: { field: 'descricao', type: DataTypes.TEXT, allowNull: true },
    preco: { field: 'preco', type: DataTypes.DECIMAL(10, 2), allowNull: false },
    categoria: { field: 'categoria', type: DataTypes.STRING, allowNull: false, defaultValue: 'Prato' },
    urlImagem: { field: 'url_imagem', type: DataTypes.STRING, allowNull: true },
    ativo: { field: 'ativo', type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
  },
  {
    tableName: 'itens_menu',
    freezeTableName: true,
    timestamps: true,
  },
);

export default ItemMenu;
