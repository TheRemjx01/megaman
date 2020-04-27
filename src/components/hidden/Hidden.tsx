import React, { ReactElement } from 'react';

interface HiddenProps {
  children: React.ReactNode;
}

const Hidden = ({ children }: HiddenProps): ReactElement =>
	<React.Fragment>{children}</React.Fragment>;


export default Hidden;
