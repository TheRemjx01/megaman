import * as React from 'react';
import { Fragment, useEffect, useState } from 'react';
import { boolean, withKnobs } from '@storybook/addon-knobs';
import { withConsole } from '@storybook/addon-console';
import { get } from 'lodash';
import { flowManager, FlowManagerReminder, Hidden } from '../../../index';
import { MockBrowser, WithSetUrlProps } from '../../../components/mock-browser';
import { WithIncompleteFlowProps } from '../../../components/flow-manager/hocs/get-flow';
import { ReminderProps } from '../../../components/flow-manager/reminder';

const addConsole = (storyFn, context): void => withConsole()(storyFn)(context);

export default {
	title: 'Full FlowManager interaction',
	decorators: [withKnobs, addConsole],
};

const whiteColorTextStyle = { color: 'white' };

const FLOW = {
	name: 'demo-flow',
	step1: 'step-1',
	step2: 'step-2',
	mockEntityId: 1,
	pageUrl: 'flow-page',
};

const Step1 = flowManager.withSetFlowStepHandlers({
	flow: FLOW.name,
	step: FLOW.step1,
	getEntityId: () => FLOW.mockEntityId,
	getCurrentUrl: () => FLOW.pageUrl,
})(({ setFlowStep }) => {
	useEffect(() => {
		setFlowStep();
	}, []);

	return <p>Step 1</p>;
});

const Step2 = flowManager.withSetFlowStepHandlers({
	flow: FLOW.name,
	step: FLOW.step2,
	getEntityId: () => FLOW.mockEntityId,
	getCurrentUrl: () => FLOW.pageUrl,
})(({ setFlowStep }) => {
	useEffect(() => {
		setFlowStep();
	}, []);

	return <p>Step 2</p>;
});

const FlowPage = ({
	incompleteFlow,
}: WithIncompleteFlowProps): React.ReactElement => {
	const lastStep = get(incompleteFlow, 'currentStep');
	const [currentStep, setStep] = useState(lastStep);
	return (
		<div style={{ color: 'white' }}>
			<h2>Flow Page</h2>
			<div id="navigator-link">
				<span>Go to: </span>
				<button onClick={(): void => setStep(FLOW.step1)}>Step 1</button>
				<button onClick={(): void => setStep(FLOW.step2)}>Step 2</button>
			</div>
			<div id="page-content">
				<Hidden when={!!currentStep}>
					<div>
						<p>There is no current step...</p>
						<p>
							In restored mode, when you navigate between the pages. The steps
							will automatically restored when you come back
						</p>
						<p>
							<i>
								To active restored mode, go to Knobs tab, check the restoredMode
								checkbox{' '}
							</i>
						</p>
					</div>
				</Hidden>
				<Hidden when={currentStep != FLOW.step1}>
					<Step1 />
				</Hidden>
				<Hidden when={currentStep != FLOW.step2}>
					<Step2 />
				</Hidden>
			</div>
		</div>
	);
};

const RestoredFlowPage = flowManager.withIncompleteFlow({
	flowKey: FLOW.name,
	getEntityId: () => FLOW.mockEntityId,
})(FlowPage);

const SimpleReminder: React.FC<ReminderProps> = ({
	resetFlow,
	incompleteFlow,
	confirmRestoreIncompleteFlow,
	setUrl,
}: ReminderProps) => {
	const [visible, setVisible] = useState(true);
	const onResetFlowClick = (): void => {
		resetFlow();
		setVisible(false);
	};
	const reminderStyle = {
		color: 'white',
		backgroundColor: '#4e4e4e',
		border: '1px solid white',
		position: 'absolute',
		top: 25,
		right: 25,
		width: '30%',
		padding: 25,
	};
	return (
		<Hidden when={!visible}>
			<div style={reminderStyle}>
				<p>Incomplete flow reminder</p>
				<hr />
				<p style={{ background: 'black', padding: 10 }}>
					<code>{JSON.stringify(incompleteFlow)}</code>
				</p>
				<button onClick={onResetFlowClick}>Reset flow</button>
				<button onClick={(): void => confirmRestoreIncompleteFlow(setUrl)}>
					Confirm restore flow
				</button>
			</div>
		</Hidden>
	);
};
export type ReactRouterMatch = {
	params: {
		id: string | number;
	};
};

const mockWithRouter = (Component: any) => (props) => {
	const mockParentProps = { match: { params: { id: 1 } } };
	return <Component {...mockParentProps} {...props} />;
};

const ReminderPage = mockWithRouter((props) => {
	const getEntityId = (props: { match: ReactRouterMatch }): number =>
		props.match.params.id as number;
	return (
		<FlowManagerReminder
			flowKey={FLOW.name}
			getEntityId={getEntityId}
			Reminder={SimpleReminder}
			reminderProps={{ setUrl: props.setUrl }}
			{...props}
		>
			<div style={whiteColorTextStyle}>
				<h2>Reminder Page</h2>
				<p>
					The reminder modal on the right show info about your incomplete flow
				</p>
				<p>Click resetFlow to wipe all saved data related to this flow</p>
				<p>
					Click confirm restore flow to take action that help you go back to the
					incomplete page
				</p>
			</div>
		</FlowManagerReminder>
	);
});

const QuickAccess: React.FC<WithSetUrlProps> = ({
	setUrl,
}: WithSetUrlProps) => (
	<Fragment>
		<button onClick={(): void => setUrl('flow-page')}>Go to flow page</button>
		<button onClick={(): void => setUrl('reminder-page')}>
			Go to reminder page
		</button>
	</Fragment>
);

export const InteractDemo = () => {
	const withRestored = boolean('restoredMode', false);
	return (
		<MockBrowser
			style={whiteColorTextStyle}
			initialUrl="flow-page"
			QuickAccess={QuickAccess}
			Routes={[
				{
					url: FLOW.pageUrl,
					component: withRestored ? RestoredFlowPage : FlowPage,
				},
				{ url: 'reminder-page', component: ReminderPage },
			]}
		/>
	);
};
