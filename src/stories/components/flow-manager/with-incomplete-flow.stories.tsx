import * as React from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import { flowManager } from '../../../components/flow-manager/hocs';
import { WithIncompleteFlowProps } from '../../../components/flow-manager/hocs/get-flow';

export default {
	title: 'withIncompleteFlow',
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
	const WithIncompleteFlow = flowManager.withIncompleteFlow({
		flowKey: FLOW.name,
		getEntityId: () => FLOW.mockEntityId,
	})(({ incompleteFlow }: WithIncompleteFlowProps) => (
		<div>
			<div style={whiteColorTextStyle}>
				<h2>With Incomplete Flow</h2>
				<p>
					By applying flowManager.withIncompleteFlow, your component can access
					to the data of incompleteFlow by flowKey. You have to provide: <br />
					<ul>
						<li>flowKey - string</li>
						<li>getEntityId: a func that tell how to get entity id by props</li>
					</ul>
				</p>
				Here is the incompleteFlow data:
				<code>{JSON.stringify(incompleteFlow)}</code>
			</div>
		</div>
	));
	return <WithIncompleteFlow />;
};
