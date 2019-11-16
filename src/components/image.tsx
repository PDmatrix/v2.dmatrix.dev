import React from 'react';
// @ts-ignore
import Img from 'react-image';
import styled from 'styled-components';

interface ImageProps {
  readonly real: string;
  readonly title: string;
  readonly placeholder: string;
  readonly alt: string;
}

const StyledImage = styled(Img)`
  display: block;
  margin-right: auto;
  margin-left: auto;
  max-width: 100%;
  ${({ title }) => title && `margin-bottom: 0`}
`;

const StyledSpan = styled.span`
  display: block;
  text-align: center;
  font-size: 0.8em;
`;

const Placeholder = styled.img`
  filter: blur(25px);
  width: 100%;
`;

const Image = ({
  title,
  alt,
  real,
  placeholder,
}: ImageProps): React.ReactElement => {
  return (
    <>
      <StyledImage
        title={title}
        alt={alt}
        decode={false}
        src={real}
        loader={<Placeholder src={placeholder} />}
      />
      {title && <StyledSpan>{title}</StyledSpan>}
    </>
  );
};

export default Image;
