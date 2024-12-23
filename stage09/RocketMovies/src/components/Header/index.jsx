import { FiSearch } from 'react-icons/fi'

import { Container, Brand, Profile, Search } from './style'

import { Input } from '../../components/Input'

export function Header(){
  return(
    <Container>
        <Brand>
          <h1>RocketMovies</h1>
        </Brand>

        <Search>
          <Input placeholder="Pesquisar pelo título" icon={FiSearch}/>
        </Search>

        <Profile to="/profile">
          <div>
            <strong>Emerson Rocha</strong>
            <span>sair</span>
          </div>

          <img
            src="https://github.com/smoothemerson.png"
            alt='Foto do usuário'
            />
        </Profile>

    </Container>
  )
}
