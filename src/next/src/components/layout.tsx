import React, {FC, PropsWithChildren} from 'react';


const Layout = ({children}: PropsWithChildren<any>)  => {
  return (
    <div>
      {children}
    </div>
  );
};

export default Layout;
