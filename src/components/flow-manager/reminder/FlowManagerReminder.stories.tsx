import * as React from 'react';
import { useState } from 'react';
import { withKnobs, text, number, boolean } from '@storybook/addon-knobs';
import FlowManagerReminder from './index';
import { ReminderProps } from './FlowManagerReminder';
import { prepareLocalStorage, ReactRouterMatch } from './setup.stories';
import { Hidden } from '../../../index';

export default {
	title: 'FlowManagerReminder',
	component: FlowManagerReminder,
	decorators: [withKnobs],
};

const SimpleReminder: React.FC<ReminderProps> = ({
	resetFlow,
	incompleteFlow,
	confirmRestoreIncompleteFlow,
	historyPush,
}: ReminderProps) => {
	const [visible, setVisible] = useState(true);
	const onResetFlowClick = (): void => {
		resetFlow();
		setVisible(false);
	};
	return (
		<Hidden when={!visible}>
			<div style={{ color: 'white', border: '1px solid white' }}>
				<p>Incomplete flow reminder</p>
				<p>
					<code>{JSON.stringify(incompleteFlow)}</code>
				</p>
				<button onClick={onResetFlowClick}>Reset flow</button>
				<button onClick={(): void => confirmRestoreIncompleteFlow(historyPush)}>
					Confirm restore flow
				</button>
			</div>
		</Hidden>
	);
};

export const whenHasIncompleteFlow: React.FC<void> = () => {
	const EXAMPLE_FLOW_ID = number('flow-id', 1);
	prepareLocalStorage({
		flowKey: text('flow-key', 'example-flow'),
		flowStep: text('flow-step', 'example-step'),
		flowId: EXAMPLE_FLOW_ID,
		flowUrl: text('flow-url', 'current-url'),
		clearStorage: boolean('clearStorage', false),
	});

	const mockParentProps = { match: { params: { id: EXAMPLE_FLOW_ID } } };

	const getEntityId = (props: { match: ReactRouterMatch }): number =>
		props.match.params.id as number;

	return (
		<FlowManagerReminder
			flowKey="example-flow"
			getEntityId={getEntityId}
			Reminder={SimpleReminder}
			{...mockParentProps}
		>
			<p style={{ color: 'white' }}>Page content</p>
		</FlowManagerReminder>
	);
};
