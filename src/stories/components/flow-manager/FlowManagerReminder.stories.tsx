import * as React from 'react';
import { useState } from 'react';
import { withKnobs, text, number, boolean } from '@storybook/addon-knobs';
import { prepareIncompleteFlow, ReactRouterMatch } from './setup.stories';
import { FlowManagerReminder, Hidden } from '../../../index';
import { ReminderProps } from '../../../components/flow-manager/reminder/FlowManagerReminder';

export default {
	title: 'FlowManagerReminder',
	component: FlowManagerReminder,
	decorators: [withKnobs],
};

const whiteColorTextStyle = { color: 'white' };

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
			<div
				style={{
					color: 'white',
					border: '1px solid white',
					position: 'absolute',
					top: 25,
					right: 25,
					width: '30%',
					padding: 25,
				}}
			>
				<p>Incomplete flow reminder</p>
				<p style={{ background: 'black', padding: 10 }}>
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
	prepareIncompleteFlow({
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
		<div style={whiteColorTextStyle}>
			<FlowManagerReminder
				flowKey="example-flow"
				getEntityId={getEntityId}
				Reminder={SimpleReminder}
				{...mockParentProps}
			>
				<h2>FlowManagerReminder</h2>
				<p>
					Features:
					<ul>
						<li>Auto detect incomplete flow by flowKey</li>
						<li>
							By accept Reminder as a prop, you can custom UI/UX as well as use
							action that FlowManagerReminder provide: <br />
							[resetFlow, confirmRestoreIncompleteFlow, incompleteFlow]
						</li>
					</ul>
				</p>
			</FlowManagerReminder>
		</div>
	);
};
