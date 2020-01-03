/*global expect*/
'use strict';

require('./mocha.config');
const Models = require('../lib/db/sequelize');
const CompanyExport = require('../lib/services/company-export');

describe('class CompanyExport', () => {
  describe('exportSavedData()', async () => {
    it('should call Models.Company.findAll() to get the saved companyList', async () => {
      const company = new CompanyExport();
      const companyStub = Sinon.stub(Models.Company,'findAll').returns();
      await company.exportSavedData();
      expect(companyStub).to.have.been.called;
    });
    it('should return null when saved companyList is empty', async () => {
      const company = new CompanyExport();
      const companyStub = Sinon.stub(Models.Company,'findAll').returns([{}]);
      const response = await company.exportSavedData();
      expect(companyStub).to.have.been.called;
      expect(response[0]).to.be.undefined;
    });
    it('should return saved companyList when there is data', async () => {
      const company = new CompanyExport();
      const companyStub = Sinon.stub(Models.Company,'findAll').returns([{dataValues:'value'}]);
      const response = await company.exportSavedData();
      expect(companyStub).to.have.been.called;
      expect(response[0]).to.be.equal('value');
    });
  });
});