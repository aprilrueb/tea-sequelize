'use strict'

const Sequelize = require('sequelize');

const db = new Sequelize('postgres://localhost/teas', { logging: false });

const Tea = db.define('tea', {
  title: Sequelize.STRING,
  description: Sequelize.TEXT,
  price: Sequelize.INTEGER,
  category: Sequelize.ENUM('green', 'black', 'herbal')
}, {
  getterMethods: {
    dollarPrice() {
      return '$' + String(this.price).slice(0, 1) + '.' + String(this.price).slice(1);
    }
  },
  hooks: {
    beforeCreate:
      function(instance){
        let title = [];
        instance.title.split(' ').forEach(function(element){
          title.push(element.slice(0, 1).toUpperCase() + element.slice(1));
        });
        instance.title = title.join(' ');
      }
  }
});

Tea.findByCategory = function(category){
  return Tea.findAll({where: {category: category}});
};

const Op = Sequelize.Op;

Tea.prototype.findSimilar = function(){
  return Tea.findAll({
    where: {
      category: this.category,
      id: {
        [Op.ne]: this.id
      }
    }
  });
};

module.exports = { db, Tea };
