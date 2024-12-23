import { Link } from 'react-router-dom'

import { Textarea } from '../../components/Textarea'
import { NoteItem } from '../../components/NoteItem'
import { Markers } from '../../components/Markers'
import { Button } from '../../components/Button'
import { Header } from '../../components/Header'
import { Input } from '../../components/Input'

import { IoMdArrowBack } from "react-icons/io";

import { Container, Form } from './styles'

export function New() {
  return(
    <Container>
      <Header />

      <main>
        <Form >
          <header>
            <IoMdArrowBack />
            <Link to="/">
              voltar
            </Link>
          </header>
          
          <h1>Novo filme</h1>

          <div id='movies'>
            <Input 
              placeholder="Título"
            />
            <Input 
              placeholder="Sua nota (de 0 a 5)"
            />
          </div>

          <Textarea 
            placeholder="Observações"
          />

          <Markers title="Marcadores">
            <NoteItem value="React"/>
            <NoteItem isNew placeholder="Novo marcador" />
          </Markers>

          <div id='buttons'>
            <Button exclude title="Excluir filme" />
            <Button title="Salvar alterações" />
          </div>
        </Form>
      </main>
    </Container>
  )
}
