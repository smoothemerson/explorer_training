import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/auth";

import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { Container, Form, Logo } from "./styles";

export function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signIn, loading } = useAuth();

  function handleSignIn() {
    signIn({ email, password });
  }

  return (
    <Container>
      <Logo>
        <div className="logo">
          <svg width="26" height="30" viewBox="0 0 26 30" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M13.0635 0.306641L25.7096 7.60782V22.2102L13.0635 29.5114L0.417527 22.2102V7.60782L13.0635 0.306641Z" fill="#065E7C"/>
          </svg>
          <h1>food explorer</h1>
        </div>
      </Logo>
      
      <Form>
        <div className="inputs">
          <p>Email</p>
          <Input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Exemplo: exemplo@exemplo.com.br"
          />
        </div>

        <div className="inputs">
          <p>Senha</p>
          <Input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="No mínimo 6 caracteres"
          />
        </div>

        <Button
          title={!loading ? "Carregando..." : "Entrar"}
          onClick={handleSignIn}
        />

        <Link to="/register">
          Criar uma conta
        </Link>
      </Form>
    </Container>
  );
}
