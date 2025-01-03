import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 53rem;

  > .buttons {
    display: flex;
    height: 8.1rem;
  }

  > .buttons button {
    width: 100%;
    background-color: transparent;
    color: ${({ theme }) => theme.COLORS.GRAY_300};
    border: 1px solid ${({ theme }) => theme.COLORS.GRAY_200};
    border-bottom: none;
    font-size: 1.6rem;
    line-height: 2.4rem;
  }

  .buttons button.active {
    top: 2px;
    left: 1px;
    box-shadow: none;
    background-color: ${({ theme }) => theme.COLORS.GRAY_400};
  }

  > .buttons img {
    margin-right: 1.4rem;
    vertical-align: middle;
  }

  > .buttons button:first-child {
    border-radius: 0.8rem 0 0 0;
  }

  > .buttons button:last-child {
    border-radius: 0 0.8rem 0 0.8rem;
  }
`;

export const Content = styled.div`
  width: 100%;
  max-width: 53rem;
  max-height: 48rem;
  font-family: 'Roboto', sans-serif;
  padding: 5.9rem clamp(3rem, 3rem + 5.5vw, 9.1rem) 4.8rem;
  border: 1px solid ${({ theme }) => theme.COLORS.GRAY_200};
  border-radius: 0 0 0.8rem 0.8rem;

  .validTo {
    display: flex;
    gap: 1.7rem;
    margin: 3.7rem 0;
  }

  .paymentCredit p {
    margin-bottom: 0.8rem;
  }

  .paymentPix {
    text-align: center;
  }

  .qr {
    margin: 0 4rem;
  }

  .paymentPix img {
    width: 100%;
    max-width: 27rem;
    margin-bottom: 2rem;
  }

  .clock,
  .approved,
  .delivered,
  .cart {
    width: 100%;
    text-align: center;
    color: ${({ theme }) => theme.COLORS.GRAY_300};
  }

  .clock p,
  .approved p,
  .delivered p,
  .cart p {
    font-size: 2.4rem;
    margin-top: 3rem;
  }

  .hide {
    display: none;
  }
`;
