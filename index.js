const CompanyImport = require('./lib/services/company-import');
const CompanyExport = require('./lib/services/company-export');

// exports.handler = async event => {
//     const csvUrl = event.csvUrl;
//     if (csvUrl) {
//         const companyImport = new CompanyImport();
//         const isSaved = await companyImport.doImportCompanyData(csvUrl);
//         if (isSaved) {
//             const companyExport = new CompanyExport();
//             const savedCompanyList = await companyExport.exportSavedData();
//             console.log(savedCompanyList)
//         }
//     }
//     return { status: 200, body: 'Ok' };
// };

async function snappy() {
    const event = {
        "csvUrl": "https://storage.googleapis.com/snappy-recruitment-test/faux_id_fake_companies.csv"
    }
    const csvUrl = event.csvUrl;
    if (csvUrl) {
        const companyImport = new CompanyImport();
        const isSaved = await companyImport.doImportCompanyData(csvUrl);
        if (isSaved) {
            const companyExport = new CompanyExport();
            const savedCompanyList = await companyExport.exportSavedData();
            console.log(savedCompanyList)
        }
    }
}
snappy();
