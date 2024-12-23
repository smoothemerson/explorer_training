import styled from 'styled-components'

export const Container = styled.button`
  width: 100%;
  background-color: ${({ theme }) => theme.COLORS.BACKGROUND_900};

  border: none;

  display: flex;
  flex-direction: column;
  gap: 40px;

  main {
    width: 100%;
    display: flex;
    gap: 8px;

    span {
      background-color: ${({ theme }) => theme.COLORS.BACKGROUND_800};
      color: ${({ theme }) => theme.COLORS.WHITE};
      
      text-align: center;
      font-size: 12px;
    }
  }

  p {
    color: ${({ theme }) => theme.COLORS.WHITE};

    text-align: justify;

    font-size: 16px;
  }
`
