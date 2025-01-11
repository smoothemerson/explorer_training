// Session Controller
const { compare } = require("bcryptjs")
const { sign } = require("jsonwebtoken")

const knex = require("../database/knex")
const AppError = require("../utils/AppError")
const authConfig = require("../configs/auth")

class SessionsController {
  // Create Session
  async create(request, response){
    const { email, password } = request.body

    const user = await knex("users").where({ email }).first()

    // Check if user exists
    if(!user) {
      throw new AppError("E-mail e/ou senha incorreta", 401)
    }

    // Compare password
    const passwordMatched = await compare(password, user.password)

    if(!passwordMatched) {
      throw new AppError("E-mail e/ou senha incorreta", 401)
    }

    // Generate Token
    const { secret, expiresIn } = authConfig.jwt

    const token = sign({}, secret, {
      subject: String(user.id),
      expiresIn
    })

    response.status(201).json({ user, token });
  }
}

module.exports = SessionsController
