import { Container, NewNote } from "./styles";
import { FiPlus } from "react-icons/fi";

export function Section({ title, children, showNewNote = true }) {
  return (
    <Container>
      <div id='head'>
        <h2>{title}</h2>
        {showNewNote && (
          <NewNote to="/new">
            <FiPlus />
            <p>Adicionar filme</p>
          </NewNote>
        )}
      </div>
      {children}
    </Container>
  );
}
