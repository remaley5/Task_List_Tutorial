const { Router } = require("express");
const userRouter = require("./user.js");
const itemRouter = require('./item.js');

const apiRouter = new Router();

apiRouter.use("/user", userRouter);
apiRouter.use("/item", itemRouter);

module.exports = apiRouter;