import { Container } from './styles'
import { ButtonText } from '../ButtonText'
import { RiArrowLeftSLine } from 'react-icons/ri';

import { useNavigate } from 'react-router-dom'
import { Link } from "react-router-dom";

export function PageError(){
  const navigate = useNavigate()

  function handleGoBack(){
      navigate("/")
  }

  return(
    <Container>
      <header>
        <Link to="/">
          <ButtonText title="Voltar" icon={RiArrowLeftSLine} onClick={handleGoBack}/>
        </Link>
      </header>

      <div className="content">
        <div>
          <span>Ops!</span>
          <h3>Você não possuí autorização para acessar esta página!</h3>
        </div>
      </div>
    </Container>
  )
}