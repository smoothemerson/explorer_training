import styled from 'styled-components'

export const Container = styled.div`
  background-color: ${({ theme, $isNew }) => $isNew ? "transparent" : theme.COLORS.BACKGROUND_600};
  border: ${({ theme, $isNew }) => $isNew ? `2px dashed ${theme.COLORS.GRAY_300}` : "none"};
  
  margin-bottom: 8px;
  border-radius: 10px;
  padding-right: 16px;

  > input {
    height: 56px;
    padding-left: 12px;
    min-width: 0;
    max-width: 150px;

    color: ${({ theme }) => theme.COLORS.WHITE};
    background: transparent;
    border: none;

    &::placeholder {
      color: ${({ theme }) => theme.COLORS.GRAY_300};
    }
  }

  > button {
    border: none;
    background: none;
  }

  .button-delete,
  .button-add {
    color: ${({ theme }) => theme.COLORS.PINK};
  }
`
