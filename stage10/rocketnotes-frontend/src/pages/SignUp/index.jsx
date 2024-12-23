import { useEffect, useState } from "react";
import { FiMail, FiLock, FiUser } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";

import { api } from "../../services/api";

import { Input } from "../../components/Input";
import { Button } from "../../components/Button";

import {
  Container,
  Form,
  Background,
  PasswordCriteria,
  StatusCard,
} from "./styles";

export function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [passwordCriteria, setPasswordCriteria] = useState({
    length: false,
    upperCase: false,
    lowerCase: false,
    number: false,
    specialChar: false,
  });

  const showPasswordCriteria = !Object.values(passwordCriteria).every(Boolean);

  const [statusMessage, setStatusMessage] = useState("");
  const [isStatusVisible, setIsStatusVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  function validatePassword(password) {
    const lengthCriteria = /.{8,}/;
    const upperCaseCriteria = /[A-Z]/;
    const lowerCaseCriteria = /[a-z]/;
    const numberCriteria = /[0-9]/;
    const specialCharCriteria = /[!@#$%^&*(),.?":{}|<>]/;

    return {
      length: lengthCriteria.test(password),
      upperCase: upperCaseCriteria.test(password),
      lowerCase: lowerCaseCriteria.test(password),
      number: numberCriteria.test(password),
      specialChar: specialCharCriteria.test(password),
    };
  }

  function handlePasswordChange(event) {
    const newPassword = event.target.value;
    setPassword(newPassword);
    setPasswordCriteria(validatePassword(newPassword));
  }

  async function handleSignUp() {
    if (!name || !email || !password) {
      setStatusMessage("Preencha todos os campos!");
      setIsStatusVisible(true);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setStatusMessage("O e-mail fornecido não é válido.");
      setIsStatusVisible(true);
      return;
    }

    if (showPasswordCriteria) {
      setStatusMessage("A senha deve atender a todos os critérios.");
      setIsStatusVisible(true);
      return;
    }

    setIsLoading(true);
    setIsStatusVisible(true);
    setStatusMessage("Cadastrando usuário...");

    try {
      await api.post("/users", { name, email, password });
      setStatusMessage("Usuário cadastrado com sucesso!");
    } catch (error) {
      if (error.response) {
        setStatusMessage(error.response.data.message);
      } else {
        setStatusMessage("Não foi possível cadastrar");
      }
    } finally {
      setIsLoading(false);
    }
  }

  function handleCloseStatus() {
    setIsStatusVisible(false);
    if (statusMessage === "Usuário cadastrado com sucesso!") {
      navigate("/");
    }
  }

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === "Enter") {
        event.preventDefault();
        if (isStatusVisible && !isLoading) {
          handleCloseStatus();
        } else if (!isStatusVisible) {
          handleSignUp();
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isStatusVisible, isLoading, name, email, password]);

  return (
    <Container>
      <Background />

      <Form>
        <h1>RocketNotes</h1>
        <p>Aplicação para salvar e gerenciar seus links úteis.</p>

        <h2>Crie sua conta</h2>

        <Input
          placeholder="Nome"
          type="text"
          icon={FiUser}
          onChange={(e) => setName(e.target.value)}
        />

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
          onChange={handlePasswordChange}
        />
        {showPasswordCriteria && (
          <PasswordCriteria>
            <p>Critérios da senha:</p>
            <ul>
              <li style={{ color: passwordCriteria.length ? "green" : "red" }}>
                Pelo menos 8 caracteres
              </li>
              <li
                style={{ color: passwordCriteria.upperCase ? "green" : "red" }}
              >
                Pelo menos uma letra maiúscula
              </li>
              <li
                style={{ color: passwordCriteria.lowerCase ? "green" : "red" }}
              >
                Pelo menos uma letra minúscula
              </li>
              <li style={{ color: passwordCriteria.number ? "green" : "red" }}>
                Pelo menos um número
              </li>
              <li
                style={{
                  color: passwordCriteria.specialChar ? "green" : "red",
                }}
              >
                Pelo menos um caractere especial
              </li>
            </ul>
          </PasswordCriteria>
        )}

        <Button title="Cadastrar" onClick={handleSignUp} />

        <Link to="/">Voltar para o login</Link>
      </Form>

      {isStatusVisible && (
        <StatusCard>
          <p>{statusMessage}</p>
          {!isLoading && <Button title="OK" onClick={handleCloseStatus} />}
        </StatusCard>
      )}
    </Container>
  );
}
