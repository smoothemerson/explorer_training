import { Container } from './styles'

import { Tag } from '../Tag'

export function Tags({ data, ...rest }) {
  return(
    <Container {...rest}>
      {
        data.tags &&
        <main>
          {
            data.tags.map( tag=> <Tag key={tag.id} title={tag.name}/>)
          }

        </main>
      }

      <p>{data.description}</p>

      <p>{data.descriptions}</p>
    </Container>
  )
}
