import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Note } from "../../components/Note";
import { Input } from "../../components/Input";
import { Header } from "../../components/Header";
import { Section } from "../../components/Section";
import { ButtonText } from "../../components/ButtonText";
import { FiPlus, FiSearch } from "react-icons/fi";
import {
  Container,
  Brand,
  Menu,
  Search,
  Content,
  NewNote,
  StatusCard,
} from "./styles";

import { api } from "../../services/api";

export function Home() {
  const [search, setSearch] = useState("");
  const [tags, setTags] = useState([]);
  const [tagsSelected, setTagsSelected] = useState([]);
  const [notes, setNotes] = useState([]);

  const [statusMessage, setStatusMessage] = useState("");
  const [isStatusVisible, setIsStatusVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  function handleTagSelected(tagName) {
    if (tagName === "all") {
      return setTagsSelected([]);
    }

    const alreadySelected = tagsSelected.includes(tagName);

    if (alreadySelected) {
      const filteredTags = tagsSelected.filter((tag) => tag !== tagName);
      setTagsSelected(filteredTags);
    } else {
      setTagsSelected((prevState) => [...prevState, tagName]);
    }
  }

  function handleDetails(id) {
    navigate(`/details/${id}`);
  }

  useEffect(() => {
    async function fetchTags() {
      const response = await api.get("/tags");
      setTags(response.data);
      setIsStatusVisible(false);
    }

    fetchTags();
  }, []);

  useEffect(() => {
    async function fetchNotes() {
      setIsLoading(true);
      setIsStatusVisible(true);
      setStatusMessage("Carregando notas...");

      try {
        const response = await api.get(
          `/notes?title=${search}&tags=${tagsSelected}`
        );
        setNotes(response.data);
      } catch (error) {
        if (error.response) {
          setStatusMessage(error.response.data.message);
        } else {
          setStatusMessage("Não foi possível visualizar as notas");
        }
      } finally {
        setIsLoading(false);
        setIsStatusVisible(false)
      }
    }

    fetchNotes();
  }, [tagsSelected, search]);

  return (
    <Container>
      <Brand>
        <h1>RocketNotes</h1>
      </Brand>

      <Header />

      <Menu>
        <li>
          <ButtonText
            title="Todos"
            onClick={() => handleTagSelected("all")}
            $isactive={tagsSelected.length === 0}
          />
        </li>
        {tags &&
          tags.map((tag) => (
            <li key={String(tag.id)}>
              <ButtonText
                title={tag.name}
                onClick={() => handleTagSelected(tag.name)}
                $isactive={tagsSelected.includes(tag.name)}
              />
            </li>
          ))}
      </Menu>

      <Search>
        <Input
          placeholder="Pesquisar pelo título"
          icon={FiSearch}
          onChange={(e) => setSearch(e.target.value)}
        />
      </Search>

      <Content>
        <Section title="Minhas notas">
          {notes.map((note) => (
            <Note
              key={String(note.id)}
              data={note}
              onClick={() => handleDetails(note.id)}
            />
          ))}
        </Section>
      </Content>

      <NewNote to="/new">
        <FiPlus />
        Criar nota
      </NewNote>

      {isStatusVisible && (
        <StatusCard>
          <p>{statusMessage}</p>
        </StatusCard>
      )}
    </Container>
  );
}
