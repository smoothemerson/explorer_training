import styled from 'styled-components'

export const Container = styled.button`
  width: 100%;
  background-color: ${({ theme }) => theme.COLORS.BACKGROUND_600};

  border: none;
  border-radius: 16px;

  padding: 32px;
  margin-bottom: 24px;

  display: flex;
  flex-direction: column;
  gap: 15px;

  h1 {
    flex: 1;
    text-align: left;
    font-weight: 700;
    font-size: 24px;
    color: ${({ theme }) => theme.COLORS.WHITE};
  }

  div {
    display: flex;
    gap: 10px;

    img {
      width: 15px;
      height: 15px;
    }
  }

  p {
    color: ${({ theme }) => theme.COLORS.GRAY_200};

    text-align: justify;

    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  footer {
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
`
