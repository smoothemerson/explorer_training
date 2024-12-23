import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  
  display: grid;
  grid-template-rows: 105px auto;
  grid-template-areas: 
  "header"
  "content";

  > main {
    grid-area: content;
    overflow-y: scroll;
    padding: 64px 0;

    header {
      display: flex;
      align-items: center;
      gap: 10px;

      margin-bottom: 36px;

      color: ${({ theme }) => theme.COLORS.PINK};

      a {
        font-size: 16px;
        color: ${({ theme }) => theme.COLORS.PINK};
        gap: 10px;
      }
    }

    #title {
      display: flex;
      align-items: center;
      gap: 20px;

      img {
        width: 20px;
        height: 20px;
      }
    }

    #author {
      margin-top: 24px;
      margin-bottom: 40px;

      display: flex;
      align-items: center;
      gap: 10px;

      img {
        width: 16px;
        height: 16px;

        border-radius: 35px;
      }

      p {
        color: ${({ theme }) => theme.COLORS.WHITE};
      }

      svg {
        color: ${({ theme }) => theme.COLORS.PINK};
      }
    }
  }
`

export const Content = styled.div`
  max-width: 1100px;
  margin: 0 auto;

  display: flex;
  flex-direction: column;

  > button:first-child {
    align-self: end;
  }

  > h1 {
    font-size: 36px;
    font-weight: 500;
    padding-top: 64px;
  }

  > p {
    font-size: 16px;
    margin-top: 16px;
    text-align: justify;
  }
`
