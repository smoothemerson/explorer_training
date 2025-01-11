// Middleware to verify if the user is authorized to access the route
const AppError = require("../utils/AppError")
const knex = require("../database/knex")

async function verifyUserAuthorization(request, response, next) {
  const user_id = request.user.id;

  const user = await knex('users').where({id: user_id}).first();

  if (!user.isAdmin) {
    throw new AppError('User not authorized', 401)
  }

  next()
}

module.exports = verifyUserAuthorization