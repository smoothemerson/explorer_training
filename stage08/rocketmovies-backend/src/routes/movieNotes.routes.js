const { Router } = require("express")

const MovieNotesController = require("../controllers/MovieNotesController")
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")

const movie_notesRoutes = Router()

const movieNotesController = new MovieNotesController()

movie_notesRoutes.use(ensureAuthenticated)

movie_notesRoutes.post("/", movieNotesController.create)
movie_notesRoutes.get("/:id", movieNotesController.show)
movie_notesRoutes.delete("/:id", movieNotesController.delete)
movie_notesRoutes.get("/", movieNotesController.index)

module.exports = movie_notesRoutes
