import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Container, Content, StatusCard } from "./styles";

import { Header } from "../../components/Header";
import { Section } from "../../components/Section";
import { Note } from "../../components/Note";

import { api } from "../../services/api";

export function Home() {
  const [search, setSearch] = useState("");
  const [movieNotes, setMovieNotes] = useState([]);

  const navigate = useNavigate();

  const [statusMessage, setStatusMessage] = useState("");
  const [isStatusVisible, setIsStatusVisible] = useState(false);

  function handleDetails(id) {
    navigate(`/details/${id}`);
  }

  useEffect(() => {
    async function fetchNotes() {
      setIsStatusVisible(true);
      setStatusMessage("Carregando filmes...");

      try {
        const response = await api.get(`/movie_notes?title=${search}`);
        setMovieNotes(response.data);
      } catch (error) {
        if (error.response) {
          setStatusMessage(error.response.data.message);
        } else {
          setStatusMessage("Não foi possível visualizar as notas");
        }
      } finally {
        setIsStatusVisible(false);
      }
    }

    fetchNotes();
  }, [search]);

  return (
    <Container>
      <Header search={search} setSearch={setSearch} />

      <Content>
        <Section title="Meus filmes">
          {movieNotes.map((movie_note) => (
            <Note
              key={String(movie_note.id)}
              data={movie_note}
              onClick={() => handleDetails(movie_note.id)}
            />
          ))}
        </Section>
      </Content>

      {isStatusVisible && (
        <StatusCard>
          <p>{statusMessage}</p>
        </StatusCard>
      )}
    </Container>
  );
}
