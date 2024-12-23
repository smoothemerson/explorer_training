import { createContext, useContext, useState, useEffect } from "react";

import { api } from "../services/api";

export const AuthContext = createContext({});

function AuthProvider({ children }) {
  const [data, setData] = useState({});

  const [statusMessage, setStatusMessage] = useState("");
  const [isStatusVisible, setIsStatusVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function signIn({ email, password }) {
    try {
      setIsLoading(true);
      setIsStatusVisible(true);
      setStatusMessage("Carregando...");

      const response = await api.post("/sessions", { email, password });
      const { user, token } = response.data;

      localStorage.setItem("@rocketnotes:user", JSON.stringify(user));
      localStorage.setItem("@rocketnotes:token", token);

      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      setData({ user, token });
      setStatusMessage("");
      setIsStatusVisible(false);
    } catch (error) {
      setIsLoading(false);
      setIsStatusVisible(true);
      if (error.response) {
        setStatusMessage(error.response.data.message);
      } else {
        setStatusMessage("Não foi possível entrar.");
      }
    }
  }

  function signOut() {
    localStorage.removeItem("@rocketnotes:token");
    localStorage.removeItem("@rocketnotes:user");

    setData({});
  }

  async function updateProfile({ user, avatarFile }) {
    try {
      setIsLoading(true);
      setIsStatusVisible(true);
      setStatusMessage("Atualizando perfil...");

      if (avatarFile) {
        const fileUploadForm = new FormData();
        fileUploadForm.append("avatar", avatarFile);

        const response = await api.patch("/users/avatar", fileUploadForm);
        user.avatar = response.data.avatar;
      }

      await api.put("/users", user);
      localStorage.setItem("@rocketnotes:user", JSON.stringify(user));

      setData({ user, token: data.token });
      setStatusMessage("Perfil Atualizado!");
      setIsStatusVisible(true);
    } catch (error) {
      setIsLoading(false);
      setIsStatusVisible(true);
      if (error.response) {
        if (error.response.status === 401) {
          setStatusMessage("O e-mail já existe.");
        } else {
          setStatusMessage(error.response.data.message);
        }
      } else {
        setStatusMessage("Não foi possível atualizar o perfil.");
      }
      throw error;
    } finally {
      setIsLoading(false);
      setIsStatusVisible(true);
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("@rocketnotes:token");
    const user = localStorage.getItem("@rocketnotes:user");

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
        updateProfile,
        user: data.user,
        statusMessage,
        isStatusVisible,
        isLoading,
        setStatusMessage,
        setIsStatusVisible,
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
