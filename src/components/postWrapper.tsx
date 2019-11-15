import React, { PropsWithChildren, ReactElement } from 'react';
import styled from 'styled-components';

const StyledInfo = styled.p`
  font-size: 0.87055rem;
  line-height: 1.4rem;
  display: block;
  margin-bottom: 1.4rem;
  margin-top: -1.4rem;
`;

const PostWrapper = ({
  children,
  meta,
}: PropsWithChildren<any>): ReactElement => {
  return (
    <div>
      <div>
        <h2>{meta.title}</h2>
        <StyledInfo>
          {new Date(meta.publishDate).toLocaleDateString()} | {meta.timeToRead}
        </StyledInfo>
      </div>
      <div>{children}</div>
    </div>
  );
};

export default PostWrapper;
