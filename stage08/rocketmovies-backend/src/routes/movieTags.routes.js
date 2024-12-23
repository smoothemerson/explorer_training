const { Router } = require("express")

const MovieTagsController = require("../controllers/MovieTagsController")
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")

const movie_tagsRoutes = Router()

const movieTagsController = new MovieTagsController()

movie_tagsRoutes.get("/", ensureAuthenticated, movieTagsController.index)

module.exports = movie_tagsRoutes
