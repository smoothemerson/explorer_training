import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Container, Form, Logo } from "./styles";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";

import { api } from "../../services/api";

export function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  function handleBack() {
    navigate(-1);
  }

  async function handleSignUp() {
    if (!name || !email || !password) {
      return alert("Preencha todos os campos");
    }

    setLoading(true);

    try {
      await api.post("/users", { name, email, password });
      alert("Usuário cadastrado com sucesso!");
      handleBack();
      setLoading(false);
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert("Erro ao cadastrar usuário");
      }
      setLoading(false);
    }
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
          <p>Seu nome</p>
          <Input
            type="text"
            placeholder="Exemplo: Maria da Silva"
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="inputs">
          <p>Email</p>
          <Input
            type="email"
            placeholder="Exemplo: exemplo@exemplo.com.br"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="inputs">
          <p>Senha</p>
          <Input
            type="password"
            placeholder="No mínimo 6 caracteres"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <Button
          title={loading ? "Carregando..." : "Criar conta"}
          onClick={handleSignUp}
          disabled={loading}
        />

        <Link onClick={handleBack}>
          Já tenho uma conta
        </Link>
      </Form>
    </Container>
  );
}
