import { createContext, useContext, useState, useEffect } from 'react';

export const FavoritesContext = createContext({});

function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem(`food_explorer:favorites`)) || []);

  function addDishToFavorite(dish) {
    setFavorites([...favorites, dish]);
  }

  function removeDishFromFavorite(dish) {
    setFavorites(favorites.filter((favorite) => favorite.id !== dish.id));
  }

  useEffect(() => {
    localStorage.setItem(`food_explorer:favorites`, JSON.stringify(favorites));
  }, [favorites]);

  return (
    <FavoritesContext.Provider 
      value={{ 
        favorites, 
        addDishToFavorite, 
        removeDishFromFavorite 
      }}>
        {children}
    </FavoritesContext.Provider>
  )
}

function useFavorites() {
  const context = useContext(FavoritesContext);

  return context;
}

export { FavoritesProvider, useFavorites };