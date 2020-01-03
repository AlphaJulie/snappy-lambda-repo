require('./mocha.config');
const Models = require('../lib/db/sequelize');
const CompanyImport = require('../lib/services/company-import');

describe('class CompanyImport', () => {
    describe('doImportCompanyData()', async () => {
        it('should not call processCompanyData() to process company data if csvUrl is absent', async () => {
            const event = {
                "csvfile" : ""
            };
            const company = new CompanyImport(event);
            const companyStub = Sinon.stub(CompanyImport, 'processCompanyData');
            await company.doImportCompanyData();
            expect(companyStub).to.have.not.been.called;
        });
        it('should not call processCompanyData() to process company data if csvUrl is not valid', async () => {
            const event = {
                "csvfile" : "not valid"
            };
            const company = new CompanyImport(event);
            const companyStub = Sinon.stub(CompanyImport, 'processCompanyData');
            await company.doImportCompanyData();
            expect(companyStub).to.have.not.been.called;
        });
        it('should call processCompanyData() to process company data if csvUrl is proper', async () => {
            const event = {
                "csv" : "https://storage.googleapis.com/snappy-recruitment-test/faux_id_fake_companies.csv"
            };
            const company = new CompanyImport();
            const companyStub = Sinon.stub(CompanyImport, 'processCompanyData');
            await company.doImportCompanyData(event.csv);
            expect(companyStub).to.have.been.called;
        });
    });
    describe('processCompanyData()', async () => {
        it('should call Model.Company.create() to save company data', async () => {
            const companyStub = Sinon.stub(Models.Company, 'create');
            const list = ['1,companyName,description,tagline,companyEmail,businessNumber,No'];
            await CompanyImport.processCompanyData(list);
            expect(companyStub).to.have.been.called;
        });
        it('should not call Model.Company.create() if incoming companyList is empty', async () => {
            const companyStub = Sinon.stub(Models.Company, 'create');
            const list = [];
            await CompanyImport.processCompanyData(list);
            expect(companyStub).to.have.not.been.called;
        });
    });
});