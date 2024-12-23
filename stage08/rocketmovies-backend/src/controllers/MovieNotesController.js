const knex = require("../database/knex")
const moment = require('moment-timezone');

class MovieNotesController {
  async create(request, response) {
    const { title, description, rating, tags } = request.body
    const user_id = request.user.id

    const now = moment().tz('America/Sao_Paulo').format('DD-MM-YYYY HH:mm:ss');

    const [note_id] = await knex("movie_notes").insert({
      title,
      description,
      rating,
      user_id,
      created_at: now,
      updated_at: now,
    })

    const tagsInsert = tags.map(name => {
      return {
        note_id,
        name,
        user_id
      }
    })

    await knex("movie_tags").insert(tagsInsert)

    return response.json()
  }

  async show(request, response) {
    const { id } = request.params

    const movie_note = await knex("movie_notes").where({ id }).first()
    const tags = await knex("movie_tags").where({ note_id: id }).orderBy("name")

    return response.json({
      ...movie_note,
      tags
    })

  }

  async delete(request, response) {
    const { id } = request.params

    await knex("movie_notes").where({ id }).delete()

    return response.json()
  }

  async index(request, response) {
    const { title, movie_tags } = request.query
    const user_id = request.user.id

    let movie_notes

    if (movie_tags) {
      const filterMovieTags = tags.split(',').map(movieTag => movieTag.trim())

      movie_notes = await knex("movie_tags")
        .select([
          "movie_notes.id",
          "movie_notes.title",
          "movie_notes.user_id"
        ])
        .where("movie_notes.user_id", user_id)
        .whereLike("movie_notes.title", `%${title}%`)
        .whereIn("name", filterMovieTags)
        .innerJoin("movie_notes", "movie_notes.id", "movie_tags.note_id")
        .groupBy("movie_notes.id")
        .orderBy("movie_notes.title")

    } else {
      movie_notes = await knex("movie_notes")
        .where({ user_id })
        .whereLike("title", `%${title}%`)
        .orderBy("title")
    }

    const userMovieTags = await knex("movie_tags").where({ user_id })
    const movieNotesWithMovieTags = movie_notes.map(movie_note => {
      const movieNoteMovieTags = userMovieTags.filter(movieTag => movieTag.note_id === movie_note.id)

      return {
        ...movie_note,
        tags: movieNoteMovieTags
      }
    })

    return response.json(movieNotesWithMovieTags)
  }
}

module.exports = MovieNotesController
