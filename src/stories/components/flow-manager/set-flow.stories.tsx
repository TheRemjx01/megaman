import * as React from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import { withConsole } from '@storybook/addon-console';
import { FlowManagerReminder, Hidden } from '../../../index';
import { Fragment, useState } from 'react';
import { get } from 'lodash';
import {
	withIncompleteFlow,
	withSetLocalStorageStepHandlers,
} from '../../../components/flow-manager/hocs';
import { ReminderProps } from '../../../components/flow-manager/reminder/FlowManagerReminder';
import {
	MockBrowser,
	WithSetUrlProps,
} from '../../../components/mock-browser/MockBrowser';

const addConsole = (storyFn, context): void => withConsole()(storyFn)(context);

export default {
	title: 'SetFlowHOC',
	decorators: [withKnobs, addConsole],
};

const Step1 = withSetLocalStorageStepHandlers({
	flow: 'demo-flow',
	step: 'step-1',
	getEntityId: () => 1,
	getCurrentUrl: () => './flow-page',
})(({ setLocalStorageStep }) => {
	setLocalStorageStep();
	return <p>Step 1</p>;
});

const Step2 = withSetLocalStorageStepHandlers({
	flow: 'demo-flow',
	step: 'step-2',
	getEntityId: () => 1,
	getCurrentUrl: () => './flow-page',
	extraPropKeys: ['step'],
})(({ setLocalStorageStep }) => {
	setLocalStorageStep();
	return <p>Step 2</p>;
});

const FlowPage = ({ incompleteFlow }): React.ReactElement => {
	const lastStep = get(incompleteFlow, 'currentStep');
	const [currentStep, setStep] = useState(lastStep);
	return (
		<div style={{ color: 'white' }}>
			<h2>Flow Page</h2>
			<div id="navigator-link">
				<span>Go to: </span>
				<button onClick={(): void => setStep('step-1')}>Step 1</button>
				<button onClick={(): void => setStep('step-2')}>Step 2</button>
			</div>
			<div id="page-content">
				<Hidden when={!!currentStep}>There is no current step...</Hidden>
				<Hidden when={currentStep != 'step-1'}>
					<Step1 />
				</Hidden>
				<Hidden when={currentStep != 'step-2'}>
					<Step2 />
				</Hidden>
			</div>
		</div>
	);
};

const RestoredFlowPage = withIncompleteFlow({
	flowKey: 'demo-flow',
	getEntityId: () => 1,
})(FlowPage);

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
					backgroundColor: '#4e4e4e',
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
		<div style={{ color: 'white' }}>
			<h2>Reminder Page</h2>
			<FlowManagerReminder
				flowKey="demo-flow"
				getEntityId={getEntityId}
				Reminder={SimpleReminder}
				{...props}
			>
				<p style={{ color: 'white' }}>Page content</p>
			</FlowManagerReminder>
		</div>
	);
});

export const withMockBrowser = () => {
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
	return (
		<MockBrowser
			initialUrl="flow-page"
			QuickAccess={QuickAccess}
			Routes={[
				{ url: 'flow-page', component: RestoredFlowPage },
				{ url: 'reminder-page', component: ReminderPage },
			]}
		/>
	);
};
