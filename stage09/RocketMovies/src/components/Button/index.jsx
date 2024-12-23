import { Container } from './styles'

export function Button({ title, loading = false, exclude, ...rest }){
  return(
    <Container
      $exclude={exclude}
      type='button'
      disabled={loading}
      {...rest}
    >
      { loading ? 'Carregando...' : title}
    </Container>
  )
}
