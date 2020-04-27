import React from 'react';

interface HiddenProps {
  children: React.ReactNode
}

const Hidden = ({ children }: HiddenProps) => <React.Fragment>{children}</React.Fragment>;


export default Hidden;
