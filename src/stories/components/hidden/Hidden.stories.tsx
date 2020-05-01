import * as React from 'react';
import { withKnobs, boolean } from '@storybook/addon-knobs';
import { Hidden } from '../../../index';

export default {
	title: 'Hidden',
	component: Hidden,
	decorators: [withKnobs],
};

const whiteColorTextStyle = { color: 'white' };

export const whenHidden: React.FC<void> = () => (
	<Hidden when={boolean('when', false)}>
		<h2 style={whiteColorTextStyle}>Hidden</h2>
		<p style={whiteColorTextStyle}>
			Instead of using multiple if else or tenary operation to toggle visible of
			component, you can use this component to replace them in a friendly React
			way
		</p>
		<p style={whiteColorTextStyle}>
			<i>Go to the under Knobs tab and start interaction</i>
		</p>
	</Hidden>
);
