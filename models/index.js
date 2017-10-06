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
    afterCreate: {
      function(instance){
        let title = [];
        instance.title.split(' ').forEach(function(element){
          title.push(element.slice(0, 1).toUpperCase() + element.slice(1));
        });
        return title.join(' ');
      }
    }
  }
});

Tea.findByCategory = function(category){
  return Tea.findAll({where: {category: category}});
};

Tea.prototype.findSimilar = function(){

};

module.exports = { db, Tea };
