import React, { PropsWithChildren, ReactElement } from 'react';
import StyledContainer from './container';
import { Grid, Row, Col } from 'react-flexbox-grid';

const Layout = ({ children }: PropsWithChildren<{}>): ReactElement => {
  return (
    <Grid>
      <Col>
        <Row>
          <Col xs>
            <StyledContainer>Header</StyledContainer>
          </Col>
        </Row>
        <Row>
          <Col md={10} xs={12}>
            <StyledContainer>{children}</StyledContainer>
          </Col>
          <Col md={2} xs={0}>
            <StyledContainer>aside</StyledContainer>
          </Col>
        </Row>
      </Col>
    </Grid>
  );
};

export default Layout;
