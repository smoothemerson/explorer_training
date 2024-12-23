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

    header {
      display: flex;
      align-items: center;
      gap: 10px;

      margin-bottom: 36px;

      color: ${({ theme }) => theme.COLORS.PINK};

      button {
        color: ${({ theme }) => theme.COLORS.PINK};
      }
      
      svg {
        cursor: pointer;
      }
    }
  }
`

export const Form = styled.form`
  max-width: 1100px;
  margin: 38px auto;

  #movies {
    margin: 40px 0;

    display: flex;
    justify-content: space-between;
    gap: 56px;
  }

  .tags {
    padding: 16px;
    background-color: ${({ theme }) => theme.COLORS.BACKGROUND_950};
    border-radius: 8px;

    display: flex;
    justify-content: flex-start;
    gap: 24px;
  }

  .buttons {
    display: flex;
    justify-content: space-between;
    gap: 40px;
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
