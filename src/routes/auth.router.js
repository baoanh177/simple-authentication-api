const authRouter = require("express").Router()
const authController = require("../controllers/auth.controller")

authRouter.post("/login", authController.login)

authRouter.post("/register", authController.register)

authRouter.get("/profile", authController.profile)

authRouter.post("/logout", authController.logout)

module.exports = authRouter