import React, { ReactNode } from 'react';
import {Progress} from "@nextui-org/react";


interface CenteredContainerProps {
  children: ReactNode;
}

const CenteredContainer: React.FC<CenteredContainerProps> = ({ children }) => (
  <div
    style={{
      display: 'flex',

      alignItems: 'center',
      height: '60vh',
      flexDirection: 'column',
    }}
  >
    <div className="flex flex-col gap-6 w-full max-w-md">
  <Progress size="sm" aria-label="Loading..." value={30} />
  <Progress size="md" value={40} />
  <Progress size="lg" aria-label="Loading..." value={50} />
</div> 
    {children}
  </div>
);

export default CenteredContainer;
