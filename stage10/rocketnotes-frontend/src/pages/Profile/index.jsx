import { useState, useEffect } from "react";
import { FiArrowLeft, FiUser, FiMail, FiLock, FiCamera } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../hooks/auth";

import avatarPlaceholder from "../../assets/avatar_placeholder.svg";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { Container, Form, Avatar, StatusCard } from "./styles";

import { api } from "../../services/api";

export function Profile() {
  const {
    user,
    updateProfile,
    statusMessage,
    isStatusVisible,
    isLoading,
    setStatusMessage,
    setIsStatusVisible,
  } = useAuth();

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [originalEmail, setOriginalEmail] = useState(user.email);
  const [passwordOld, setPasswordOld] = useState("");
  const [passwordNew, setPasswordNew] = useState("");

  const avatarURL = user.avatar
    ? `${api.defaults.baseURL}/files/${user.avatar}`
    : avatarPlaceholder;
  const [avatar, setAvatar] = useState(avatarURL);
  const [originalAvatar, setOriginalAvatar] = useState(avatarURL);
  const [avatarFile, setAvatarFile] = useState(null);

  const [isChanged, setIsChanged] = useState(false);

  const navigate = useNavigate();

  function handleBack() {
    navigate(-1);
  }

  async function handleUpdate() {
    if (!isChanged) return;

    const updated = {
      name,
      email,
      password: passwordNew,
      old_password: passwordOld,
    };

    const userUpdated = Object.assign(user, updated);

    try {
      if (avatarFile) {
        await updateProfile({ user: userUpdated, avatarFile });

        const newAvatarURL = URL.createObjectURL(avatarFile);
        setAvatar(newAvatarURL);
        setOriginalAvatar(newAvatarURL);
        setAvatarFile(null);
      } else {
        await updateProfile({ user: userUpdated });
      }

      setOriginalEmail(email);
      setPasswordOld("");
      setPasswordNew("");
      setIsChanged(false);
    } catch (error) {
      setEmail(originalEmail);
      setIsChanged(false);
    }
  }

  function handleCloseStatus() {
    setIsStatusVisible(false);
    setStatusMessage("");
  }

  function handleChangeAvatar(event) {
    const file = event.target.files[0];
    setAvatarFile(file);

    const imagePreview = URL.createObjectURL(file);
    setAvatar(imagePreview);
  }

  useEffect(() => {
    const hasChanged =
      name !== user.name ||
      email !== originalEmail ||
      passwordOld ||
      passwordNew ||
      avatar !== originalAvatar;

    setIsChanged(hasChanged);
  }, [
    name,
    email,
    passwordOld,
    passwordNew,
    avatar,
    originalAvatar,
    user.name,
    originalEmail,
  ]);

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === "Enter") {
        event.preventDefault();
        if (isStatusVisible && !isLoading) {
          handleCloseStatus();
        } else if (!isStatusVisible && isChanged) {
          handleUpdate();
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isStatusVisible, isLoading, isChanged]);

  return (
    <Container>
      <header>
        <button type="button" onClick={handleBack}>
          <FiArrowLeft />
        </button>
      </header>

      <Form>
        <Avatar>
          <img src={avatar} alt="Foto do usuário" />

          <label htmlFor="avatar">
            <FiCamera />
            <input id="avatar" type="file" onChange={handleChangeAvatar} />
          </label>
        </Avatar>

        <Input
          placeholder="Nome"
          type="text"
          icon={FiUser}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <Input
          placeholder="E-mail"
          type="text"
          icon={FiMail}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Input
          placeholder="Senha atual"
          type="password"
          icon={FiLock}
          value={passwordOld}
          onChange={(e) => setPasswordOld(e.target.value)}
        />

        <Input
          placeholder="Nova senha"
          type="password"
          icon={FiLock}
          value={passwordNew}
          onChange={(e) => setPasswordNew(e.target.value)}
        />

        <Button
          title="Salvar"
          onClick={handleUpdate}
          className={isChanged ? "active" : "inactive"}
        />
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
