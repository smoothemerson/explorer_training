import { createContext, useContext, useState, useEffect } from 'react';

export const CartContext = createContext({});

function CartProvider({ children }) {
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem(`@food_explorer:cart`)) || []);

  const [orders, setOrders] = useState([]);

  function handleAddDishToCart(data, quantity, image) {
    try {
      const { id, title, price } = data;

      const order = {
        id,
        title,
        price,
        quantity,
        image
      };

      const orderExists = cart.some((userOrder) => userOrder.id === order.id);

      if (orderExists) {
        return alert('Este prato já está no carrinho');
      }

      setCart(prevState => [...prevState, order]);
      alert('Prato adicionado ao carrinho');
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        alert(error.response.data.message);
      } else {
        alert('Erro ao adicionar prato ao carrinho');
      }
    }
  }

  function handleRemoveDishFromCart(deleted) {
    setCart(prevState => prevState.filter(item => item.id !== deleted));
  }

  const total = cart.reduce((value, item) => {
    return value + item.price;
  }, 0);

  async function handleResetCart() {
    localStorage.removeItem(`@food_explorer:cart`);
    setCart([]);
  }

  useEffect(() => {
    localStorage.setItem(`@food_explorer:cart`, JSON.stringify(cart));
  }, [cart]);

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        orders,
        setOrders,
        handleAddDishToCart,
        handleRemoveDishFromCart,
        handleResetCart,
        total: String(total.toFixed(2)).replace('.', ',')
      }}>
        {children}
    </CartContext.Provider>
  );
}

function useCart() {
  const context = useContext(CartContext);

  return context;
}

export { CartProvider, useCart };