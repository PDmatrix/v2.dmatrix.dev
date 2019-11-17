import React, { ReactElement } from 'react';
import { Row, Col } from 'react-styled-flexboxgrid';

const Footer = (): ReactElement => (
  <Row center={'xs'}>
    <Col xs={12} sm={11} md={10} lg={10}>
      <span>© 2019 | </span>
      <a href="https://github.com/PDmatrix">Github</a>
    </Col>
  </Row>
);

export default Footer;
