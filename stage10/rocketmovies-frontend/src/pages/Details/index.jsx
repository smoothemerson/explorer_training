import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { api } from "../../services/api";

import { useAuth } from "../../hooks/auth";

import { Tags } from "../../components/Tags";
import { Header } from "../../components/Header";
import { Button } from "../../components/Button";

import { FaClock } from "react-icons/fa";
import { FiArrowLeft } from "react-icons/fi";
import StarImg from "../../assets/star.svg";
import StarImgDisable from "../../assets/stardisable.svg";
import avatar_placeholder from "../../assets/avatar_placeholder.svg";
import { Container, Content, StatusCard } from "./styles";

export function Details() {
  const { user } = useAuth();

  const [data, setData] = useState(null);

  const [statusMessage, setStatusMessage] = useState("");
  const [isStatusVisible, setIsStatusVisible] = useState(false);

  const params = useParams();
  const navigate = useNavigate();

  const avatarURL = user.avatar
    ? `${api.defaults.baseURL}/files/${user.avatar}`
    : avatar_placeholder;

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <img
          key={i}
          src={i <= data.rating ? StarImg : StarImgDisable}
          alt="Avaliação do filme"
        />
      );
    }
    return stars;
  };

  function handleBack() {
    navigate(-1);
  }

  async function handleRemove() {
    setStatusMessage("Deseja realmente remover o filme?");
    setIsStatusVisible(true);
  }

  async function deleteNote() {
    try {
      await api.delete(`/movie_notes/${params.id}`);
      handleBack();
    } catch (error) {
      if (error.response) {
        setStatusMessage(error.response.data.message);
      } else {
        setStatusMessage("Não foi possível remover o filme");
      }
    } finally {
      setIsStatusVisible(false);
    }
  }

  function handleCloseStatus() {
    setIsStatusVisible(false);
    setStatusMessage("");
  }

  useEffect(() => {
    async function fetchNote() {
      setIsStatusVisible(true);
      setStatusMessage("Carregando filme...");

      try {
        const response = await api.get(`/movie_notes/${params.id}`);
        setData(response.data);
      } catch (error) {
        if (error.response) {
          setStatusMessage(error.response.data.message);
        } else {
          setStatusMessage("Não foi possível visualizar o filme");
        }
      } finally {
        setIsStatusVisible(false);
      }
    }

    fetchNote();
  }, []);

  return (
    <Container>
      <Header />

      {data && (
        <main>
          <Content>
            <header>
              <FiArrowLeft />
              <button onClick={handleBack}>Voltar</button>
            </header>

            <div className="title">
              <h1>{data.title}</h1>
              <div>{renderStars(data.rating)}</div>
              <button className="button" onClick={handleRemove}>
                Excluir filme
              </button>
            </div>

            <div className="author">
              <img src={avatarURL} alt="{data.name}" />

              <p>Por {user.name}</p>

              <FaClock />

              <p>{user.updated_at}</p>
            </div>

            {data.tags && <Tags data={data.tags} />}

            <p id="p">{data.description}</p>
          </Content>
        </main>
      )}

      {isStatusVisible && (
        <StatusCard>
          <p>{statusMessage}</p>

          {statusMessage === "Deseja realmente remover o filme?" && (
            <>
              <Button title="Sim" onClick={deleteNote} />
              <Button title="Não" onClick={handleCloseStatus} />
            </>
          )}
        </StatusCard>
      )}
    </Container>
  );
}
