import { FiPlus } from 'react-icons/fi'

import { Container, NewNote } from "./styles"

export function Section({ title, children }){
  return(
    <Container>
      <div id='head'>
        <h2>{title}</h2>
        <NewNote to="/new">
          <FiPlus />
          <p>Adicionar filme</p>
        </NewNote>
      </div>

      {children}
    </Container>
  )
}
