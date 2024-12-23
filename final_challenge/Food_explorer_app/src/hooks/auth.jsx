import { createContext, useContext, useState, useEffect } from "react";

import { api } from "../services/api";

export const AuthContext = createContext({});

function AuthProvider({ children }) {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  async function signIn({ email, password }) {
    try {
      setLoading(true);
      const response = await api.post(
        "/sessions",
        { email, password }
      );
      const { user, token } = response.data;

      localStorage.setItem("@food_explorer:user", JSON.stringify(user));
      localStorage.setItem("@food_explorer:token", token);

      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      setData({ user, token });

      setLoading(false);
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert("Não foi possível entrar.");
      }
      setLoading(false);
    }
  }

  function signOut() {
    localStorage.removeItem("@food_explorer:token");
    localStorage.removeItem("@food_explorer:user");

    setData({});
  }

  async function updateProfile({ user, avatarFile }) {
    try {
      if (avatarFile) {
        setLoading(true);
        const fileUploadForm = new FormData();
        fileUploadForm.append("avatar", avatarFile);

        const response = await api.patch("/users/avatar", fileUploadForm);
        user.avatar = response.data.avatar;
      }

      await api.put("/users", user);
      localStorage.setItem("@food_explorer:user", JSON.stringify(user));

      setData({
        user,
        token: data.token,
      });
      alert("Perfil atualizado com sucesso!");

      setLoading(false);
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert("Não foi possível atualizar o perfil.");
      }
      setLoading(false);
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("@food_explorer:token");
    const user = localStorage.getItem("@food_explorer:user");

    if (token && user) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      setData({
        token,
        user: JSON.parse(user),
      });
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signOut,
        loading,
        setLoading,
        updateProfile,
        user: data.user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);

  return context;
}

export { AuthProvider, useAuth };
