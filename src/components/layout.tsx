import React, { PropsWithChildren, ReactElement } from 'react';
import styled from 'styled-components';
import StyledContainer from './container';

const StyledLayout = styled.div`
  margin-left: auto;
  margin-right: auto;
  max-width: 70vw;
  padding: 2.1rem 1.05rem;
  transition: color 0.2s ease-out 0s, background 0.2s ease-out 0s;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const StyledHeader = styled.header`
  display: flex;
`;

const StyledMain = styled.main`
  display: flex;
`;

const StyledSection = styled.section`
  display: flex;
  flex: 5;
`;

const StyledAside = styled.aside`
  display: flex;
  flex: 1;
`;

const Layout = ({ children }: PropsWithChildren<{}>): ReactElement => {
  return (
    <StyledLayout>
      <StyledContainer>
        <StyledHeader>Header</StyledHeader>
      </StyledContainer>
      <StyledMain>
        <StyledContainer>
          <StyledSection>{children}</StyledSection>
        </StyledContainer>
        <StyledContainer>
          <StyledAside>aside</StyledAside>
        </StyledContainer>
      </StyledMain>
    </StyledLayout>
  );
};

export default Layout;
