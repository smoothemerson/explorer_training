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
  align-items: center;

  text-align: center;

  > h1 {
    font-size: 48px;
    color: ${({ theme }) => theme.COLORS.ORANGE};
  }

  > h2 {
    font-size: 24px;
    margin: 48px 0;
  }

  > p {
    font-size: 14px;
    color: ${({ theme }) => theme.COLORS.GRAY_100};
  }

  > a {
    margin-top: 124px;
    color: ${({ theme }) => theme.COLORS.ORANGE};
  }
`

export const StatusCard = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px 40px;
  background: rgba(0, 0, 0, 0.8);
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
    background: ${({ theme }) => theme.COLORS.ORANGE};
    color: #fff;
    border: none;
    padding: 10px 20px;
    border-radius: 8px;
    cursor: pointer;
    font-size: 16px;
  }
`

export const Background = styled.div`
  flex: 1;
  background: url(${backgroundImg}) no-repeat center center;
  background-size: cover;
`
