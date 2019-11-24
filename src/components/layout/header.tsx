import React, { ReactElement } from 'react';
import { Row, Col } from 'react-styled-flexboxgrid';
import Link from 'next/link';
import styled from 'styled-components';

const StyledLink = styled.a`
  color: ${(props): string => props.theme.colors.textNormal};
  text-decoration: none;
  font-size: 2rem;

  &:hover {
    color: inherit;
  }
`;

const Header = (): ReactElement => {
  return (
    <Row center={'xs'}>
      <Col xs={12} sm={11} md={10} lg={10}>
        <header>
          <p>
            <Link href={'/'} passHref>
              <StyledLink>Dmatrix&apos;s thoughts</StyledLink>
            </Link>
          </p>
        </header>
      </Col>
    </Row>
  );
};

export default Header;
