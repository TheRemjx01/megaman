import Hidden from './index';
import * as React from 'react';
import { withKnobs, boolean, text } from '@storybook/addon-knobs';

export default {
	title: 'Hidden',
	component: Hidden,
	decorators: [withKnobs],
};

export const whenHidden: React.FC<void> = () => (
	<Hidden when={boolean('when', false)}>
		<p style={{ color: 'white' }}>{text('children', 'Demo text')}</p>
	</Hidden>
);

export const whenNotHidden: React.FC<void> = () => (
	<Hidden when={false}>
		<p style={{ color: 'white' }}>See ya</p>
	</Hidden>
);
