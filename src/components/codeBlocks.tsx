import React, { PropsWithChildren, ReactElement } from 'react';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import tomorrow from '../utils/tomorrow';

const CodeBlocks = ({
  children,
  className,
}: PropsWithChildren<{ className: string }>): ReactElement => {
  className = className || '';
  const language = className.replace(/language-/, '');
  return (
    <SyntaxHighlighter language={language} style={tomorrow}>
      {children}
    </SyntaxHighlighter>
  );
};

export default CodeBlocks;
