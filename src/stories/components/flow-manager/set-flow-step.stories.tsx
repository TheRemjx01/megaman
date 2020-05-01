import * as React from 'react';
import { useEffect } from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import { flowManager } from '../../../components/flow-manager/hocs';

export default {
	title: 'withSetFlowStepHandlers',
	decorators: [withKnobs],
};

const whiteColorTextStyle = { color: 'white' };

const FLOW = {
	name: 'demo-flow',
	step1: 'step-1',
	step2: 'step-2',
	mockEntityId: 1,
	pageUrl: 'flow-page',
};

export const basicUsage = () => {
	const WithSetFlowStep = flowManager.withSetFlowStepHandlers({
		flow: FLOW.name,
		step: FLOW.step1,
		getEntityId: () => 1,
		getCurrentUrl: () => FLOW.pageUrl,
	})(({ setFlowStep }) => {
		useEffect(() => {
			setFlowStep();
		}, []);
		return (
			<div style={whiteColorTextStyle}>
				<h2>Set flow step</h2>
				<p>
					By applying withSetFlowStepHandlers, your component will have
					setFlowStep function as a prop <br />
					By execute setFlowStep, your flow data is saved to localStorage then
					you can restore them using withIncompleteFlow
				</p>
				<p>
					You can check data by open Developer Console then open
					localStorage.flowManager
				</p>
			</div>
		);
	});

	return <WithSetFlowStep />;
};
