const Sequelize = require('sequelize');
class Company extends Sequelize.Model {
    static init(sequelize, DataTypes) {
        return super.init(
            {
                // companyID: {
                //     type: DataTypes.INTEGER, primaryKey: true,
                //     autoIncrement: true
                // }, 
                companyName: DataTypes.STRING,
                description: DataTypes.STRING,
                tagline: DataTypes.STRING,
                companyEmail: DataTypes.STRING,
                businessNumber: DataTypes.STRING,
                restricted: DataTypes.BOOLEAN
            },
            {
                tableName: 'company',
                freezeTableName: true,
                timestamps: false,
                sequelize
            }
        );
    }
}
module.exports = Company;