import styled from 'styled-components'

export const Container = styled.section`
  margin: 28px 0;

  #head {
    display: flex;
    align-items: center;

    > h2 {
      color: ${({ theme }) => theme.COLORS.GRAY_200};
      font-size: 20px;
      font-weight: 400;
    }

    padding-bottom: 40px;
  }

  #marker {
    display: flex;
    align-items: center;
    gap: 24px;

    padding: 16px;

    border-radius: 8px;
    background-color: ${({ theme }) => theme.COLORS.BACKGROUND_950};
  }
`
