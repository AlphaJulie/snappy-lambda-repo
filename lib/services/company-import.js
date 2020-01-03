/* This class is to import the company data from csv file and save it to Relational Db */
const axios = require('axios');
const Models = require('../db/sequelize.js');

class CompanyImport {

  async doImportCompanyData(csv) {
    let isSaved = false;
    try{
      const result = await axios.get(csv);
    if(result.status === 200){
      isSaved = true;
      let companyList = result.data.toString().split('\n');
      companyList.shift();
      await CompanyImport.processCompanyData(companyList);
    }
    }catch(err){
      console.error(`Error: ${err}`)
    }
    return isSaved;
  }

  static async processCompanyData(companyList) {
    let company = {};
    for (let i in companyList) {
      const regex = (/,(?=\S)/);
      company['companyName'] = companyList[i].split(regex)[1];
      company['description'] = companyList[i].split(regex)[2];
      company['tagline'] = companyList[i].split(regex)[3];
      company['companyEmail'] = companyList[i].split(regex)[4];
      company['businessNumber'] = companyList[i].split(regex)[5];
      company['restricted'] = companyList[i].split(regex)[6].toString().toUpperCase().trim() === 'YES' ? 1 : 0;
      // Save data to database
     await Models.Company.create(company);
    }
  }
}
module.exports = CompanyImport;