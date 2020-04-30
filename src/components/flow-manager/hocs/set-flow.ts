import { getUpdateExtraProps } from './extra-props';
import { get } from 'lodash';
import { FlowManager, GetEntityId } from './types';
import { withHandlers } from 'recompose';
import { getFlowManager, setFlowManager } from './flow-manager';
import * as React from 'react';

type GetCurrentUrl = (props: object) => any;

interface GetUpdateFlowParams {
	flow: string;
	step: string;
	extraPropKeys: string[];
	flowManager: any;
	getCurrentUrl: GetCurrentUrl;
}

export const getUpdateFlow = ({
	flow,
	step,
	extraPropKeys = [],
	flowManager,
	getCurrentUrl,
}: GetUpdateFlowParams) => (props: object): FlowManager => {
	const currentUrl = getCurrentUrl(props);
	const updateFlow = get(flowManager, `[${flow}]`, {});
	updateFlow.currentStep = step;
	updateFlow.currentUrl = currentUrl;

	updateFlow.extraProps = getUpdateExtraProps(
		updateFlow.extraProps,
		extraPropKeys,
	)(props);

	return {
		...flowManager,
		[flow]: updateFlow,
	};
};

interface SetStepParams {
	flow: string;
	step: string;
	getEntityId: GetEntityId;
	extraPropKeys?: any[];
	getCurrentUrl: GetCurrentUrl;
}

export const setStep = ({
	flow,
	step,
	getEntityId,
	extraPropKeys = [],
	getCurrentUrl,
}: SetStepParams) => (props: object): void => {
	const entityId = getEntityId(props);
	const flowManager = getFlowManager();
	const targetFlow = get(flowManager, `${entityId}`, {});

	const body = {
		...flowManager,
		[entityId]: getUpdateFlow({
			flow,
			step,
			extraPropKeys,
			flowManager: targetFlow,
			getCurrentUrl,
		})(props),
	};

	setFlowManager(body as FlowManager);
};

interface WithSetLocalStorageProps {
	setLocalStorageStep: () => void;
}

type WithSetLocalStorageHOC = (
	Component: React.FC<WithSetLocalStorageProps>,
) => (props) => any;

export const withSetLocalStorageStepHandlers = ({
	flow,
	step,
	getEntityId,
	extraPropKeys,
	getCurrentUrl,
}: SetStepParams): WithSetLocalStorageHOC =>
	withHandlers({
		setLocalStorageStep: (props) => (): void =>
			setStep({
				flow,
				step,
				getEntityId,
				extraPropKeys,
				getCurrentUrl,
			})(props),
	});
