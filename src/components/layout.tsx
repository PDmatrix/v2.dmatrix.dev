import React, { PropsWithChildren, ReactElement } from 'react';

const Layout = ({ children }: PropsWithChildren<{}>): ReactElement => {
  return (
    <div style={{ padding: '20px', background: 'tomato' }}>{children}</div>
  );
};

export default Layout;
