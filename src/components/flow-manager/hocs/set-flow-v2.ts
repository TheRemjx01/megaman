import { getUpdateExtraProps } from './extra-props';
import { get } from 'lodash';
import { FlowManager, GetEntityId } from './types';
import { withHandlers, withProps } from 'recompose';
import {
	getFlowManager,
	setFlowManager,
} from './flow-manager';

interface GetUpdateFlowParams {
	flow: string;
	step: string;
	extraProps: string[];
	flowManager: any;
}

export const getUpdateFlow = ({
	flow,
	step,
	extraProps = [],
	flowManager,
}: GetUpdateFlowParams) => (props: object): FlowManager => {
	const currentUrl = get(props, 'match.url');
	const updateFlow = get(flowManager, `[${flow}]`, {});
	updateFlow.currentStep = step;
	updateFlow.currentUrl = currentUrl;

	updateFlow.extraProps = getUpdateExtraProps(
		updateFlow.extraProps,
		extraProps,
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
	extraProps?: any[];
}

export const setStep = ({
	flow,
	step,
	getEntityId,
	extraProps = [],
}: SetStepParams) => (props: object): void => {
	const entityId = getEntityId(props);
	const flowManager = getFlowManager();
	const targetFlow = get(flowManager, `${entityId}`, {});

	const body = {
		...flowManager,
		[entityId]: getUpdateFlow({
			flow,
			step,
			extraProps,
			flowManager: targetFlow,
		})(props),
	};

	setFlowManager(body as FlowManager);
};

export const withSaveCurrentStepV2 = ({
	flow,
	step,
	getEntityId,
	extraProps,
}: SetStepParams) =>
	withProps(setStep({ flow, step, getEntityId, extraProps }));

interface WithSetLocalStorageProps {
	setLocalStorageStep: (props: SetStepParams) => any;
}

type WithSetLocalStorageHOC = (
	Component: any,
) => (props: WithSetLocalStorageProps) => any;

export const withSetLocalStorageStepHandlersV2 = ({
	flow,
	step,
	getEntityId,
	extraProps,
}: SetStepParams): WithSetLocalStorageHOC =>
	withHandlers({
		setLocalStorageStep: setStep({
			flow,
			step,
			getEntityId,
			extraProps,
		}),
	});
