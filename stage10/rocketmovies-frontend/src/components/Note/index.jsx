import { Container } from "./styles";
import { Tag } from "../Tag";
import StarImg from "../../assets/star.svg";
import StarImgDisable from "../../assets/stardisable.svg";

export function Note({ data, ...rest }) {
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
  
  return (
    <Container {...rest}>
      <h1>{data.title}</h1>
      <div>{renderStars(data.rating)}</div>
      <p>{data.description}</p>

      {data.tags && (
        <footer>
          {data.tags.map((tag) => (
            <Tag key={tag.id} title={tag.name} />
          ))}
        </footer>
      )}
    </Container>
  );
}
