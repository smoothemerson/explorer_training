import styled from 'styled-components'
import backgroundImg from '../../assets/background.png'

export const Container = styled.div`
  height: 100vh;
  
  display: flex;
  align-items: stretch;
`

export const Form = styled.form`
  padding: 0 136px;
  
  display: flex;
  flex-direction: column;
  justify-content: center;

  > h1 {
    font-size: 48px;
    color: ${({ theme }) => theme.COLORS.PINK};
  }

  > h2 {
    font-size: 24px;
    margin: 48px 0;
  }

  > p {
    font-size: 14px;
    color: ${({ theme }) => theme.COLORS.GRAY_100};
  }

  footer {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;

    font-size: 14px;

    margin-top: 42px;

    svg, 
    a {
      color: ${({ theme }) => theme.COLORS.PINK};
    }
  }
`

export const Background = styled.div`
  flex: 1;
  background: url(${backgroundImg}) no-repeat center center;
  background-size: cover;
`

export const PasswordCriteria = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  p {
    font-weight: bold;
    margin-block: 10px;
    text-align: center;
  }

  ul {
    list-style-type: none;
    padding: 0;
    
    li {
      margin-bottom: 5px;
    }
  }
`

export const StatusCard = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px 40px;
  background: ${({ theme }) => theme.COLORS.BACKGROUND_950};
  color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  z-index: 10;
  text-align: center;
  font-size: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;

  > p {
    margin-bottom: 20px;
  }

  > button {
    background: ${({ theme }) => theme.COLORS.PINK};
    color: #fff;
    border: none;
    padding: 10px 20px;
    border-radius: 8px;
    cursor: pointer;
    font-size: 16px;
  }
`
