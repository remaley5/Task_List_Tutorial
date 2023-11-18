const User = require("./user");
const Item = require("./item");

// Sequelize should automatically create the foreign key 
Item.belongsTo(User);
User.hasMany(Item);

module.exports = {
    User,
    Item,
}