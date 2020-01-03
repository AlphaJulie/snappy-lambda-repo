const fs = require('fs');
const initSqlJs = require('sql.js');

const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
initSqlJs().then(SQL => {
    const db = new SQL.Database();
    sqlstr = "CREATE TABLE company(companyName char,description char,tagline char,companyEmail char,businessNumber char,restricted int);";
    db.run(sqlstr);
   const binaryArray = db.export();
   fs.writeFile("../snappy-lambda/lib/db/snappy.db", binaryArray, function(err) {
     
  }); 
  });
const config = require('../config/db-config.json')[env];
const sequelize = new Sequelize(config);

const CompanyModel = require('./company');
const models = { sequelize, Company: CompanyModel.init(sequelize, Sequelize) };
CompanyModel.removeAttribute('id');

module.exports = models;