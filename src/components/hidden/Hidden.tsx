import * as React from 'react';

interface HiddenProps {
	children: React.ReactElement;
}

const Hidden: React.FC<HiddenProps> = ({ children }: HiddenProps) => (
	<React.Fragment>{children}</React.Fragment>
);

export default Hidden;
