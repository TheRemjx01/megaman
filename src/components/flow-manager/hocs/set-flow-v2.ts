import { getUpdateExtraProps } from './extra-props';
import { get } from 'lodash';
import { FlowManager, GetEntityId } from './types';
import { withHandlers, withProps } from 'recompose';
import { getFlowManager, setFlowManager } from './flow-manager';

type GetCurrentUrl = (props: object) => any;

interface GetUpdateFlowParams {
	flow: string;
	step: string;
	extraProps: string[];
	flowManager: any;
	getCurrentUrl: GetCurrentUrl;
}

export const getUpdateFlow = ({
	flow,
	step,
	extraProps = [],
	flowManager,
	getCurrentUrl,
}: GetUpdateFlowParams) => (props: object): FlowManager => {
	const currentUrl = getCurrentUrl(props);
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
	getCurrentUrl: GetCurrentUrl;
}

export const setStep = ({
	flow,
	step,
	getEntityId,
	extraProps = [],
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
			extraProps,
			flowManager: targetFlow,
			getCurrentUrl,
		})(props),
	};

	setFlowManager(body as FlowManager);
};

export const withSaveCurrentStepV2 = ({
	flow,
	step,
	getEntityId,
	extraProps,
	getCurrentUrl,
}: SetStepParams) =>
	withProps(setStep({ flow, step, getEntityId, extraProps, getCurrentUrl }));

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
	getCurrentUrl,
}: SetStepParams): WithSetLocalStorageHOC =>
	withHandlers({
		setLocalStorageStep: setStep({
			flow,
			step,
			getEntityId,
			extraProps,
			getCurrentUrl,
		}),
	});
