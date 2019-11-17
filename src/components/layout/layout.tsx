import React, { PropsWithChildren, ReactElement } from 'react';
import { Grid } from 'react-styled-flexboxgrid';
import Header from './header';
import Body from './body';
import Footer from './footer';
import styled from 'styled-components';

const StyledGrid = styled(Grid)`
  padding-bottom: 1rem;
`;

const Layout = ({ children }: PropsWithChildren<{}>): ReactElement => {
  return (
    <StyledGrid>
      <Header />
      <Body>{children}</Body>
      <Footer />
    </StyledGrid>
  );
};

export default Layout;
