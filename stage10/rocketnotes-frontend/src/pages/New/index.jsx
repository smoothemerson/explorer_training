import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Textarea } from "../../components/Textarea";
import { NoteItem } from "../../components/NoteItem";
import { Section } from "../../components/Section";
import { Button } from "../../components/Button";
import { ButtonText } from "../../components/ButtonText";
import { Header } from "../../components/Header";
import { Input } from "../../components/Input";
import { Container, Form, StatusCard } from "./styles";

import { api } from "../../services/api";

export function New() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [links, setLinks] = useState([]);
  const [newLink, setNewLink] = useState("");

  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState("");

  const [statusMessage, setStatusMessage] = useState("");
  const [isStatusVisible, setIsStatusVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  function handleBack() {
    navigate(-1);
  }

  function handleAddLink() {
    setLinks((prevState) => [...prevState, newLink]);
    setNewLink("");
  }

  function handleRemoveLink(deleted) {
    setLinks((prevState) => prevState.filter((link) => link !== deleted));
  }

  function handleAddTag() {
    setTags((prevState) => [...prevState, newTag]);
    setNewTag("");
  }

  function handleRemoveTag(deleted) {
    setTags((prevState) => prevState.filter((tag) => tag !== deleted));
  }

  async function handleNewNote() {
    if (!title) {
      setStatusMessage("Digite o título da nota");
      setIsStatusVisible(true);
      return;
    }

    if (newLink.length < 1 && links.length < 1) {
      setStatusMessage("Digite um link para a nota");
      setIsStatusVisible(true);
      return;
    }

    if (newTag.length < 1 && tags.length < 1) {
      setStatusMessage("Digite uma tag para a nota");
      setIsStatusVisible(true);
      return;
    }

    if (newLink) {
      setStatusMessage(
        "Você deixou um link no campo para adicionar, mas não clicou em adicionar. Clique para adicionar ou deixe o campo vazio."
      );
      setIsStatusVisible(true);
      return;
    }

    if (newTag) {
      setStatusMessage(
        "Você deixou uma tag no campo para adicionar, mas não clicou em adicionar. Clique para adicionar ou deixe o campo vazio."
      );
      setIsStatusVisible(true);
      return;
    }

    setIsLoading(true);
    setIsStatusVisible(true);
    setStatusMessage("Criando nota...");

    try {
      await api.post("/notes", {
        title,
        description,
        tags,
        links,
      });
      setStatusMessage("Nota cadastrada com sucesso!");
      setIsStatusVisible(false)
      handleBack()
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
    setStatusMessage("")
  }

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === "Enter") {
        event.preventDefault();
        if (isStatusVisible && !isLoading) {
          handleCloseStatus();
        } else if (!isStatusVisible) {
          handleNewNote();
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [
    isStatusVisible,
    isLoading,
    title,
    description,
    links,
    newLink,
    tags,
    newTag,
  ]);

  return (
    <Container>
      <Header />

      <main>
        <Form>
          <header>
            <h1>Criar nota</h1>
            <ButtonText title="Voltar" onClick={handleBack} />
          </header>

          <Input
            placeholder="Título"
            onChange={(e) => setTitle(e.target.value)}
          />

          <Textarea
            placeholder="Observações"
            onChange={(e) => setDescription(e.target.value)}
          />

          <Section title="Links úteis">
            {links.map((link, index) => (
              <NoteItem
                key={String(index)}
                value={link}
                onClick={() => handleRemoveLink(link)}
              />
            ))}
            <NoteItem
              $isNew
              placeholder="Novo link"
              value={newLink}
              onChange={(e) => setNewLink(e.target.value)}
              onClick={handleAddLink}
            />
          </Section>

          <Section title="Marcadores">
            <div className="tags">
              {tags.map((tag, index) => (
                <NoteItem
                  key={String(index)}
                  value={tag}
                  onClick={() => handleRemoveTag(tag)}
                />
              ))}
              <NoteItem
                $isNew
                placeholder="Nova tag"
                onChange={(e) => setNewTag(e.target.value)}
                value={newTag}
                onClick={handleAddTag}
              />
            </div>
          </Section>

          <Button title="Salvar" onClick={handleNewNote} />
        </Form>
      </main>

      {isStatusVisible && (
        <StatusCard>
          <p>{statusMessage}</p>
        </StatusCard>
      )}
    </Container>
  );
}
