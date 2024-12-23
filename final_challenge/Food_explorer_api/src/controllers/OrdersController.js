const knex = require("../database/knex");
const AppError = require("../utils/AppError")

class OrdersController {
  async create(request, response) {
    const { cart, orderStatus, totalPrice, paymentMethod } = request.body;
    const user_id = request.user.id;

    const [order] = await knex("orders").insert({
      user_id,
      orderStatus,
      totalPrice,
      paymentMethod
    }).returning("id")

    const order_id = order.id;

    const itemsInsert = cart.map(item => {
      return {
        title: item.title,
        quantity: item.quantity,
        dish_id: item.id,
        order_id
      }
    })

    await knex("ordersItems").insert(itemsInsert);

    return response.status(201).json(order_id);
  }

  async index(request, response) {
    const user_id = request.user.id;

    const user = await knex("users").where({ id: user_id }).first();

    if (!user.isAdmin) {
      const orders = await knex("ordersItems").where({ user_id })
        .select([
          "orders.id",
          "orders.user_id",
          "orders.orderStatus",
          "orders.totalPrice",
          "orders.paymentMethod",
          "orders.created_at"
        ])
        .innerJoin("orders", "orders.id", "ordersItems.order_id")
        .groupBy("orders.id");

      const ordersItems = await knex("ordersItems")
      const ordersWithItems = orders.map(order => {
        const orderItem = ordersItems.filter(item => item.order_id === order.id)

        return {
          ...order,
          items: orderItem
        }
      })

      return response.status(200).json(ordersWithItems);
    }
    else {
      const orders = await knex("ordersItems")
        .select([
          "orders.id",
          "orders.user_id",
          "orders.orderStatus",
          "orders.totalPrice",
          "orders.paymentMethod",
          "orders.created_at"
        ])
        .innerJoin("orders", "orders.id", "ordersItems.order_id")
        .groupBy("orders.id");
      
      const ordersItems = await knex("ordersItems")
      const ordersWithItems = orders.map(order => {
        const orderItem = ordersItems.filter(item => item.order_id === order.id)

        return {
          ...order,
          items: orderItem
        }
      })

      return response.status(200).json(ordersWithItems);
    }
  }

  async update(request, response) {
    const { id, orderStatus } = request.body;

    try {
      await knex("orders")
        .where({ id })
        .update({ orderStatus });

      return response.status(201).json();
    } catch (error) {
      throw new AppError("Erro ao atualizar status do pedido", 400);
    }
  }
}

module.exports = OrdersController;