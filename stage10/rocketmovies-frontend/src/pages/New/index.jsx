import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Textarea } from "../../components/Textarea";
import { NoteItem } from "../../components/NoteItem";
import { Section } from "../../components/Section";
import { Button } from "../../components/Button";
import { ButtonText } from "../../components/ButtonText";
import { Header } from "../../components/Header";
import { Input } from "../../components/Input";
import { IoMdArrowBack } from "react-icons/io";
import { Container, Form, StatusCard } from "./styles";

import { api } from "../../services/api";

export function New() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [rating, setRating] = useState(0);

  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState("");

  const [statusMessage, setStatusMessage] = useState("");
  const [isStatusVisible, setIsStatusVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  function handleBack() {
    navigate(-1);
  }

  function handleAddTag() {
    setTags((prevState) => [...prevState, newTag]);
    setNewTag("");
  }

  function handleRemoveTag(deleted) {
    setTags((prevState) => prevState.filter((tag) => tag !== deleted));
  }

  async function handleNewMovie() {
    if (!title) {
      setStatusMessage("Digite o título do filme");
      setIsStatusVisible(true);
      return;
    }

    if (!rating) {
      setStatusMessage("Digite uma nota para o filme.");
      setIsStatusVisible(true);
      return;
    }

    if (newTag.length < 1 && tags.length < 1) {
      setStatusMessage("Digite uma tag para o filme");
      setIsStatusVisible(true);
      return;
    }

    const validateRating = /^\d*$/.test(rating);
    if (validateRating) {
      if (Number(rating) < 0 || Number(rating) > 5) {
        setStatusMessage("A nota não pode ser menor que 0 ou maior que 5.");
        setIsStatusVisible(true);
        return;
      } else {
        setIsStatusVisible(false);
      }
    }

    if (!validateRating) {
      setStatusMessage("Nota inválida.");
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
    setStatusMessage("Criando filme...");

    try {
      await api.post("/movie_notes", {
        title,
        description,
        tags,
        rating: Number(rating),
      });

      setStatusMessage("Filme cadastrado com sucesso!");
      setIsStatusVisible(false);
      handleBack();
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
    setStatusMessage("");
  }

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === "Enter") {
        event.preventDefault();
        if (isStatusVisible && !isLoading) {
          handleCloseStatus();
        } else if (!isStatusVisible) {
          handleNewMovie();
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isStatusVisible, isLoading, title, description, rating, tags, newTag]);

  return (
    <Container>
      <Header />

      <main>
        <Form>
          <header>
            <IoMdArrowBack onClick={handleBack} />
            <ButtonText onClick={handleBack} title="Voltar" />
          </header>

          <h1>Novo filme</h1>

          <div id="movies">
            <Input
              placeholder="Título"
              onChange={(e) => setTitle(e.target.value)}
            />

            <Input
              placeholder="Sua nota (de 0 a 5)"
              onChange={(e) => setRating(e.target.value)}
            />
          </div>

          <Textarea
            placeholder="Observações"
            onChange={(e) => setDescription(e.target.value)}
          />

          <Section title="Marcadores" showNewNote={false}>
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
                placeholder="Novo marcador"
                onChange={(e) => setNewTag(e.target.value)}
                value={newTag}
                onClick={handleAddTag}
              />
            </div>
          </Section>

          <div className="buttons">
            <Button exclude title="Cancelar" onClick={handleBack} />
            <Button title="Salvar alterações" onClick={handleNewMovie} />
          </div>
        </Form>
      </main>

      {isStatusVisible && (
        <StatusCard>
          <p>{statusMessage}</p>
          {!isLoading && <Button title="OK" onClick={handleCloseStatus} />}
        </StatusCard>
      )}
    </Container>
  );
}
