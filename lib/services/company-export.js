/* This class is to export the saved company data */
const Models = require('../db/sequelize.js');

class CompanyExport {

  async exportSavedData(){
    let savedCompanyList = [];
    const response = await Models.Company.findAll();
    if(response){
      for(let data of response){
        savedCompanyList.push(data.dataValues);
      }
    }
    return savedCompanyList;
  }
}
module.exports = CompanyExport;