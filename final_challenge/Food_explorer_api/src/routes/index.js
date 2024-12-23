const { Router } = require("express")

const usersRoutes = require("./users.routes")
const dishesRoutes = require("./dishes.routes")
const ordersRoutes = require("./orders.routes")
const sessionRoutes = require("./sessions.routes")

const routes = Router()

routes.use("/users", usersRoutes)
routes.use("/sessions", sessionRoutes)
routes.use("/dishes", dishesRoutes)
routes.use("/orders", ordersRoutes)

module.exports = routes
