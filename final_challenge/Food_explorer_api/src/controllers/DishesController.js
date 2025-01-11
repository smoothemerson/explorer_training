// Dish Controller
const knex = require("../database/knex")
const AppError = require("../utils/AppError")
const DiskStorage = require("../providers/DiskStorage")

class DishesController {
  // Create a new dish
  async create(request, response) {
    const { title, description, category, price, ingredients } = request.body

    if (!title || !description || !category || !price || !ingredients) {
      throw new AppError("Preencha os campos necessários.")
    }
    
    const checkDishAlreadyExists = await knex("dishes").where({ title }).first()
    
    if (checkDishAlreadyExists) {
      throw new AppError("Este prato já existe.")
    }

    const imageFileName = request.file.filename
    const diskStorage = new DiskStorage()
    const filename = await diskStorage.saveFile(imageFileName)

    const [dish] = await knex("dishes").insert({
      image: filename,
      title,
      description,
      price,
      category
    }).returning('id')

    const dish_id = dish.id

    // Logic to insert ingredients
    
    const hasOnlyOneIngredient = typeof(ingredients) === "string"

    let ingredientsInsert

    if (hasOnlyOneIngredient) {
      ingredientsInsert = {
        name: ingredients,
        dish_id
      }
    }
    else if (ingredients.length > 1) {
      ingredientsInsert = ingredients.map(name => {
        return {
          name,
          dish_id
        }
      })
    }

    await knex("ingredients").insert(ingredientsInsert)

    return response.status(201).json()
  }

  // Method to update a dish
  async update(request, response) {
    const { title, description, category, price, ingredients, image } = request.body
    const { id } = request.params

    const imageFileName = request.file.filename

    const diskStorage = new DiskStorage()

    const dish = await knex("dishes").where({ id }).first()

    if (dish.image) {
      await diskStorage.deleteFile(dish.image)
    }

    const filename = await diskStorage.saveFile(imageFileName)

    dish.image = image ?? filename
    dish.title = title ?? dish.title
    dish.description = description ?? dish.description
    dish.category = category ?? dish.category
    dish.price = price ?? dish.price

    await knex("dishes").where({ id }).update(dish)

    const hasOnlyOneIngredient = typeof(ingredients) === "string"

    let ingredientsInsert

    if (hasOnlyOneIngredient) {
      ingredientsInsert = {
        name: ingredients,
        dish_id: dish.id
      }
    }
    else if (ingredients.length > 1) {
      ingredientsInsert = ingredients.map(ingredient => {
        return {
          dish_id: dish.id,
          name: ingredient
        }
      })
    }

    await knex("ingredients").where({ dish_id: dish.id }).delete()
    await knex("ingredients").where({ dish_id: dish.id }).insert(ingredientsInsert)

    return response.status(201).json()
  }

  // Method to show a dish
  async show(request, response) {
    const { id } = request.params

    const dish = await knex("dishes").where({ id }).first()
    const ingredients = await knex("ingredients").where({ dish_id: id }).orderBy("name")

    return response.json({
      ...dish,
      ingredients
    })
  }

  // Method to list all dishes
  async index(request, response) {
    const { title, ingredients } = request.query

    let dishes

    // Logic to filter dishes by title and ingredients
    if (ingredients) {
      const splitIngredients = ingredients.split(",")
      const filterIngredients = splitIngredients.map(ingredient => ingredient.trim())

      dishes = await knex("ingredients")
        .select([
          "dishes.id",
          "dishes.image",
          "dishes.title",
          "dishes.description",
          "dishes.price",
          "dishes.category"
        ])
        .whereLike("dishes.title", `%${title}%`)
        .whereIn("name", filterIngredients)
        .innerJoin("dishes", "dishes.id", "ingredients.dish_id")
        .groupBy("dishes.id")
        .orderBy("dishes.title")
    }
    else {
      dishes = await knex("dishes")
        .whereLike("title", `%${title}%`)
        .orderBy("title")
    }

    const dishesIngredients = await knex("ingredients")
    const dishesWithIngredients = dishes.map(dish => {
      const dishIngredient = dishesIngredients.filter(ingredient => ingredient.dish_id === dish.id)
    
      return {
        ...dish,
        ingredients: dishIngredient
      }
    })

    return response.status(200).json(dishesWithIngredients)
  }

  // Method to delete a dish
  async delete(request, response) {
    const { id } = request.params

    await knex("dishes").where({ id }).delete()

    return response.json()
  }
}

module.exports = DishesController