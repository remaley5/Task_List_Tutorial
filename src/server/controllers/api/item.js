const {Router} = require("express");

const itemRouter = new Router();
const {Item} = require('../../models');
const auth = require('../../middleware/auth');


itemRouter.post('/', auth, async (req, res) => {
    const {title} = req.body;
    
    const newItem = await Item.create({
        title,
        UserId: req.user_id,
    });
    
    return res.status(200).json({
        id: newItem.id,
    });
});

itemRouter.get('/foruser', auth, async (req, res) => {
    const items = await Item.findAll({
        where: {
            userId: req.user_id,
        },
    });

    // Items come out as complex sequelize instances
    const plainItems = items.map((item) => item.get({plan: true}));

    res.status(200).json(plainItems);
});

module.exports = itemRouter;