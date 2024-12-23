import styled from "styled-components";

export const Container = styled.footer`
  width: 100%;
  height: 51.2rem;
  align-items: center;
  margin-bottom: 6.2rem;
`;

export const Content = styled.div`
  .swiper {
    width: 100%;
    height: 100%;
  }
  
  .swiper-slide {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 3.2rem;
  }
  
  .swiper-button-next,
  .swiper-button-prev {
    width: 9rem;
    height: 50.9rem;
    margin: -25.6rem -1rem;
    color: ${({ theme }) => theme.COLORS.BLUE};
    font-weight: bolder;
    mask-image: none;
  }

  .swiper-button-prev {
    background: linear-gradient(to left, transparent 0%, ${({ theme }) => theme.COLORS.BACKGROUND_900} 100% 0%, transparent 100%);
  }

  .swiper-button-next {
    background: linear-gradient(to right, transparent 0%, ${({ theme }) => theme.COLORS.BACKGROUND_900} 100% 0%, transparent 100%);
  }
`;
