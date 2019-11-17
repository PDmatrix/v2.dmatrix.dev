import React, { PropsWithChildren, ReactElement } from 'react';
import styled from 'styled-components';
import Head from 'next/head';

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
    <>
      <Head>
        <title>{meta.title} | Dmatrix&apos;s thoughts</title>
        <meta name="description" content={meta.description} />
        <meta name="keywords" content={meta.tags.join(', ')} />
      </Head>
      <div>
        <div>
          <h2>{meta.title}</h2>
          <StyledInfo>
            {new Date(meta.publishDate).toLocaleDateString()} |{' '}
            {meta.timeToRead}
          </StyledInfo>
        </div>
        <div>{children}</div>
      </div>
    </>
  );
};

export default PostWrapper;
