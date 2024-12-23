const { Router } = require("express")

const MovieTagsController = require("../controllers/MovieTagsController")

const movie_tagsRoutes = Router()

const movieTagsController = new MovieTagsController()

movie_tagsRoutes.get("/:user_id", movieTagsController.index)

module.exports = movie_tagsRoutes
