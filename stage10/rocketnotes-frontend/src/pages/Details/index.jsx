import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { Tag } from "../../components/Tag";
import { Button } from "../../components/Button";
import { Header } from "../../components/Header";
import { Section } from "../../components/Section";
import { ButtonText } from "../../components/ButtonText";
import { Container, Links, Content, StatusCard } from "./styles";

import { api } from "../../services/api";

export function Details() {
  const [data, setData] = useState(null);

  const [statusMessage, setStatusMessage] = useState("");
  const [isStatusVisible, setIsStatusVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const params = useParams();
  const navigate = useNavigate();

  function handleBack() {
    navigate(-1);
  }

  function handleRemove() {
    setStatusMessage("Deseja realmente remover a nota?");
    setIsStatusVisible(true);
  }

  async function deleteNote() {
    try {
      await api.delete(`/notes/${params.id}`);
      handleBack();
      setIsStatusVisible(false);
    } catch (error) {
      if (error.response) {
        setStatusMessage(error.response.data.message);
      } else {
        setStatusMessage("Não foi possível remover a nota");
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
    async function fetchNote() {
      setIsLoading(true);
      setIsStatusVisible(true);
      setStatusMessage("Carregando nota...");

      try {
        const response = await api.get(`/notes/${params.id}`);
        setData(response.data);
        setIsStatusVisible(false);
      } catch (error) {
        if (error.response) {
          setStatusMessage(error.response.data.message);
        } else {
          setStatusMessage("Não foi possível visualizar a nota");
        }
      } finally {
        setIsLoading(false);
      }
    }

    fetchNote();
  }, [params.id]);

  return (
    <Container>
      <Header />
      {data && (
        <main>
          <Content>
            <div className="title">
              <h1>{data.title}</h1>
              <ButtonText title="Excluir nota" onClick={handleRemove} />
            </div>

            <p>{data.description}</p>

            {data.links && (
              <Section title="Links úteis">
                <Links>
                  {data.links.map((link) => (
                    <li key={String(link.id)}>
                      <a href={link.url} target="_blank">
                        {link.url}
                      </a>
                    </li>
                  ))}
                </Links>
              </Section>
            )}

            {data.tags && (
              <Section title="Marcadores">
                {data.tags.map((tag) => (
                  <Tag key={String(tag.id)} title={tag.name} />
                ))}
              </Section>
            )}

            <Button title="Voltar" onClick={handleBack} />
          </Content>
        </main>
      )}

      {isStatusVisible && (
        <StatusCard>
          <p>{statusMessage}</p>
          
          {statusMessage === "Deseja realmente remover a nota?" ? (
            <>
              <Button title="Sim" onClick={deleteNote} />
              <Button title="Não" onClick={handleCloseStatus} />
            </>
          ) : (
            !isLoading && <Button title="OK" onClick={handleCloseStatus} />
          )}
        </StatusCard>
      )}
    </Container>
  );
}
