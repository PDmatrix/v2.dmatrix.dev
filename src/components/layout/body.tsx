import React, { PropsWithChildren, ReactElement } from 'react';
import { Row, Col } from 'react-styled-flexboxgrid';

const Body = ({ children }: PropsWithChildren<{}>): ReactElement => {
  return (
    <Row>
      <Col xs>{children}</Col>
    </Row>
  );
};

export default Body;
