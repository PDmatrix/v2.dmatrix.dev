import React, { PropsWithChildren, ReactElement } from 'react';
import { Grid, Row, Col } from 'react-styled-flexboxgrid';

const Layout = ({ children }: PropsWithChildren<{}>): ReactElement => {
  return (
    <Grid>
      <Col>
        <Row>
          <Col xs>
            <Row>
              <Col xs={2}>Daa</Col>
              <Col xs={10}>Baa</Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col xs>{children}</Col>
        </Row>
      </Col>
    </Grid>
  );
};

export default Layout;
