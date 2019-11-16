import React, { PropsWithChildren, ReactElement } from 'react';
import { Grid } from 'react-styled-flexboxgrid';
import Header from './header';
import Body from './body';

const Layout = ({ children }: PropsWithChildren<{}>): ReactElement => {
  return (
    <Grid>
      <Header />
      <Body>{children}</Body>
    </Grid>
  );
};

export default Layout;
