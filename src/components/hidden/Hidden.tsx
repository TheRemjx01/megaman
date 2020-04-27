import React, { ReactElement } from 'react';

interface HiddenProps {
	children: React.ReactElement;
}

const Hidden = ({ children }: HiddenProps): ReactElement => (
	<React.Fragment>{children}</React.Fragment>
);

export default Hidden;
