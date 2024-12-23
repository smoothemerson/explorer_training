import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const Container = styled.header`
  height: 123px;
  width: 100%;

  border-bottom-width: 1px;
  border-bottom-style: solid;
  border-bottom-color: ${({ theme }) => theme.COLORS.BACKGROUND_700};

  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 0 123px;
`

export const Brand = styled.div`
  h1 {
    font-size: 24px;
    color: ${({ theme}) => theme.COLORS.PINK};
  }
`

export const Search = styled.div`
  width: 600px;
`

export const Profile = styled(Link)`
  display: flex;
  align-items: center;

  > img {
    width: 56px;
    height: 56px;
    border-radius: 50%;
  }

  > div {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    margin-right: 9px;
    line-height: 24px;

    span {
      font-size: 14px;
      color: ${({ theme }) => theme.COLORS.GRAY_300}
    }

    strong {
      font-size: 18px;
      color: ${({ theme }) => theme.COLORS.WHITE}
    }
  }
`


