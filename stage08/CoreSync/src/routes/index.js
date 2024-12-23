const { Router } = require("express")

const usersRoutes = require("./users.routes")
const movie_notesRoutes = require("./movieNotes.routes")
const movie_tagsRoutes = require("./movieTags.routes")

const routes = Router()
routes.use("/users", usersRoutes)
routes.use("/movie_notes", movie_notesRoutes)
routes.use("/movie_tags", movie_tagsRoutes)

module.exports = routes
