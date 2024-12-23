import { Container } from './styles'

import { Tag } from '../Tag'
import StarImg from '../../assets/star.svg'
import StarImgDisable from '../../assets/stardisable.svg'

export function Note({ data, ...rest }) {
  return(
    <Container {...rest}>
      <h1>{data.title}</h1>
      
      <div>
        <img src={StarImg} alt="Avaliação do filme" />
        <img src={StarImg} alt="Avaliação do filme" />
        <img src={StarImg} alt="Avaliação do filme" />
        <img src={StarImg} alt="Avaliação do filme" />
        <img src={StarImgDisable} alt="Avaliação do filme" />
      </div>

      <p>{data.description}</p>

      {
        data.tags &&
        <footer>
          {
            data.tags.map( tag=> <Tag key={tag.id} title={tag.name}/>)
          }

        </footer>
      }
    </Container>
  )
}
