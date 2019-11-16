import React, { PropsWithChildren, ReactElement } from 'react';
import { Row, Col } from 'react-styled-flexboxgrid';

const Body = ({ children }: PropsWithChildren<{}>): ReactElement => {
  return (
    <Row center={'xs'}>
      <Col xs={12} sm={11} md={10} lg={10}>
        {children}
      </Col>
    </Row>
  );
};

export default Body;
