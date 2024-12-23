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
    overflow-y: auto;
  }

  .tags {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }
`

export const Form = styled.form`
  max-width: 1100px;
  margin: 38px auto;

  > header {
    display: flex;
    align-items: center;
    gap: 10px;

    margin-bottom: 36px;

    color: ${({ theme }) => theme.COLORS.PINK};

    a {
      font-size: 20px;
      color: ${({ theme }) => theme.COLORS.PINK};
      gap: 10px;
    }
  }

  #movies {
    margin: 40px 0;

    display: flex;
    justify-content: space-between;
    gap: 56px;
  }

  #buttons {
    display: flex;
    justify-content: space-between;
    gap: 40px;
  }
`
