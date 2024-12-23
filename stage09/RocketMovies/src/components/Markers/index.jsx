import { Container } from "./styles"

export function Markers({ title, children }){
  return(
    <Container>
      <div id='head'>
        <h2>{title}</h2>
      </div>
      
      <div id="marker">
        {children}
      </div>
    </Container>
  )
}
