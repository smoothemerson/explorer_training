import { Container } from './styles'

export function Button({ title, loading = false, exclude, ...rest }){
  return(
    <Container 
      type='button'
      $exclude={exclude}
      disabled={loading}
      {...rest}
    >
      { loading ? 'Carregando...' : title}
    </Container>
  )
}
