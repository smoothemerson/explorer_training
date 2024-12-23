import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const Container = styled.section`
  margin: 28px 0;

  #head {
    display: flex;
    align-items: center;
    justify-content: space-between;

    > h2 {
      color: ${({ theme }) => theme.COLORS.WHITE};
      font-size: 32px;
      font-weight: 400;
    }

    padding-bottom: 40px;
  }
`

export const NewNote = styled(Link)`
  background-color: ${({ theme }) => theme.COLORS.PINK};
  color: ${({ theme }) => theme.COLORS.BACKGROUND_900};
  padding: 16px 32px;
  border-radius: 8px;

  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    margin-right: 8px;
  }
`
