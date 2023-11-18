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

module.exports = itemRouter;