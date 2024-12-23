import { useEffect, useState } from "react";
import { FiMail, FiLock } from "react-icons/fi";
import { Link } from "react-router-dom";

import { useAuth } from "../../hooks/auth";

import { Input } from "../../components/Input";
import { Button } from "../../components/Button";

import { Container, Form, Background, StatusCard } from "./styles";

export function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const {
    signIn,
    statusMessage,
    isStatusVisible,
    isLoading,
    setStatusMessage,
    setIsStatusVisible,
  } = useAuth();

  function handleSignIn() {
    if (!email || !password) {
      setStatusMessage("Preencha todos os campos!");
      setIsStatusVisible(true);
      return;
    }

    signIn({ email, password });
  }

  function handleCloseStatus() {
    setIsStatusVisible(false);
    setStatusMessage("");
  }

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === "Enter") {
        if (isStatusVisible && !isLoading) {
          handleCloseStatus();
        } else if (!isStatusVisible) {
          handleSignIn();
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isStatusVisible, isLoading, email, password]);

  return (
    <Container>
      <Form>
        <h1>RocketNotes</h1>
        <p>Aplicação para salvar e gerenciar seus links úteis.</p>

        <h2>Faça seu login</h2>

        <Input
          placeholder="E-mail"
          type="text"
          icon={FiMail}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Input
          placeholder="Senha"
          type="password"
          icon={FiLock}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button title="Entrar" onClick={handleSignIn} />

        <Link to="/register">Criar conta</Link>
      </Form>

      {isStatusVisible && (
        <StatusCard>
          <p>{statusMessage}</p>
          {!isLoading && <Button title="OK" onClick={handleCloseStatus} />}
        </StatusCard>
      )}

      <Background />
    </Container>
  );
}
