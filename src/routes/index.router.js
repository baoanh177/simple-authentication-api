const authRouter = require("./auth.router")

const indexRouter = require("express").Router()

indexRouter.use("/auth", authRouter)

module.exports = indexRouter