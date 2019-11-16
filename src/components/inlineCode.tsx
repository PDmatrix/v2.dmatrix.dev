import React, { PropsWithChildren, ReactElement } from 'react';
import styled from 'styled-components';

const StyledCode = styled.code`
  background-color: #0e1e25;
  color: #fff;
  padding: 0.1em;
  border-radius: 0.3em;
  white-space: normal;
`;

const InlineCode = ({ children }: PropsWithChildren<{}>): ReactElement => {
  return <StyledCode>{children}</StyledCode>;
};

export default InlineCode;
