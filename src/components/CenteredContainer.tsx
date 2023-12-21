import React, { ReactNode } from 'react';
import { Progress } from "@nextui-org/react";

interface CenteredContainerProps {
  children: ReactNode;
}

const CenteredContainer: React.FC<CenteredContainerProps> = ({ children }) => (
  <div className="flex items-center flex-col">
    <div className="flex flex-col gap-6 w-full max-w-md">
    </div>
    {children}
  </div>
);

export default CenteredContainer;