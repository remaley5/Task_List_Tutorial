const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const sequelize = require("../config/connection");

class User extends Model { }

User.init(
    {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        }, 
        password: {
            type: DataTypes.STRING, 
            allowNull: false,
        }
    }, {
        hooks: {
            // Hash password before adding to db  - install bcrypt
            beforeCreate: async (data) => {
                data.password = await bcrypt.hashSync(data.password,  10);
                return data;
            }
        }, 
    // Sequelize connection
        sequelize,
    }
);

module.exports = User;