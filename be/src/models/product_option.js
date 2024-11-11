'use-strict';

const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class product_option extends Model {
    static associate(models) {
      product_option.belongsTo(models.product, { foreignKey: 'product_id' });
      product_option.hasMany(models.order_item, { foreignKey: 'product_option_id' });
      product_option.hasMany(models.cart_item, { foreignKey: 'product_option_id' });
    }
  }
  product_option.init({
    product_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    price: DataTypes.DECIMAL,
    stock: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'product_option',
    timestamps: true
  });

  return product_option;
};