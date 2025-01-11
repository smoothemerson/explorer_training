// User Controller
const { hash, compare } = require("bcryptjs");
const AppError = require("../utils/AppError");

const sqliteConnection = require("../database/sqlite");

class UsersController {
  // Create a new user
  async create(request, response) {
    const { name, email, password } = request.body;
    
    if(!name || !email || !password) {
      throw new AppError("Preencha todos os campos")
    }

    if (name.length < 3) {
      throw new AppError("O nome deve ter no mínimo 3 caracteres")
    }
    
    if (!email.includes("@", ".") || !email.includes(".")) {
      throw new AppError("E-mail inválido")
    }

    if (password.length < 6) {
      throw new AppError("A senha deve ter no mínimo 6 caracteres")
    }

    const database = await sqliteConnection()
    const checkUserExists = await database.get("SELECT * FROM users WHERE email = (?)", [email])

    if (checkUserExists) {
      throw new AppError("Este e-mail já está em uso")
    }

    // Hash the password
    const hashedPassword = await hash(password, 8)

    await database.run(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      [name, email, hashedPassword]
    )

    return response.status(201).json();
  }

  async update(request, response) {
    const { name, email, password, old_password } = request.body;
    const user_id = request.user.id;

    if (password && !old_password) {
      throw new AppError("Você precisa informar a senha antiga para definir a nova senha")
    }

    const database = await sqliteConnection()
    const user = await database.get("SELECT * FROM users WHERE id = (?)", [user_id])

    if (!user) {
      throw new AppError("Usuário não encontrado")
    }

    const userWithUpdatedEmail = await database.get("SELECT * FROM users WHERE email = (?)", [email])

    if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id) {
      throw new AppError("Este e-mail já está em uso")
    }

    user.name = name
    user.email = email

    if (password && old_password) {
      const checkOldPassword = await compare(old_password, user.password)

      if (!checkOldPassword) {
        throw new AppError("A senha antiga não confere")
      }

      user.password = await hash(password, 8)
    }

    await database.run(`
      UPDATE users SET 
      name = ?,
      email = ?,
      password = ?,
      updated_at = DATETIME('now')
      WHERE id = ?`,
      [user.name, user.email, user.password, user_id]
    )

    return response.status(201).json()
  }
}

module.exports = UsersController;
