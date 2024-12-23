import { Container, Links, Content } from './styles'

import { Tag } from '../../components/Tag'
import { Button } from '../../components/Button'
import { Header } from '../../components/Header'
import { Section } from '../../components/Section'
import { ButtonText } from '../../components/ButtonText'

export function Details(){

  return(
    <Container>
      <Header />

      <main>
        <Content>

          <ButtonText title="Excluir nota"/>

          <h1>
            Introdução ao React
          </h1>

          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. 
            Error ullam dicta ex quod eligendi quam nobis a vitae quidem, 
            facere incidunt ipsam sunt rem minus optio tenetur unde cum adipisci.
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Doloribus 
            fuga modi facere nam. Autem, minima officia expedita quae tenetur 
            sequi quaerat quidem sint? Deleniti magni, ipsum ex ab et dolores.
          </p>

          <Section title="Links úteis">
            <Links>
              <li><a href="#">https://www.rocketseat.com.br</a></li>
              <li><a href="#">https://www.rocketseat.com.br</a></li>
            </Links>
          </Section>

          <Section title="Marcadores">
            <Tag title="express" />
            <Tag title="nodejs" />
          </Section>

          <Button title="Voltar"/>
        </Content>
      </main>
    </Container>
  )
}
