import React from 'react';
// @ts-ignore
import Img from 'react-image';
import styled from 'styled-components';

interface ImageProps {
  readonly real: string;
  readonly placeholder: string;
  readonly alt: string;
}

const StyledImage = styled(Img)`
  display: block;
  margin-right: auto;
  margin-left: auto;
  max-width: 100%;
`;

const Placeholder = styled.img`
  filter: blur(25px);
  width: 100%;
`;

const Image = ({ alt, real, placeholder }: ImageProps): React.ReactElement => {
  return (
    <StyledImage
      alt={alt}
      decode={false}
      src={real}
      loader={<Placeholder src={placeholder} />}
    />
  );
};

export default Image;
