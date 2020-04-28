import {
	CURRENT_STEP,
	CURRENT_URL,
	EXTRA_PROPS,
	FLOW_MANAGER,
} from '@helpers/flow-manager/constants';
import { getItemFromLocalStorage } from '@helpers/flow-manager/local-storage';
import { get } from 'lodash';
import { GetEntityId } from '@helpers/flow-manager/types';
import { withHandlers } from 'recompose';
import * as React from 'react';

interface RestoreCurrentStepParams {
	flowKey: string;
	getEntityId: GetEntityId;
}

interface RestoreCurrentStepOutput {
	currentUrl?: string;
	currentStep: string;
	flowExtraProps?: object;
}

interface WithRestoreCurrentStepProps {
	restoreCurrentStep: () => void;
}

type RestoreCurrentStepHOC = (
	Component: React.FunctionComponent,
) => React.FunctionComponent<WithRestoreCurrentStepProps>;

export const restoreCurrentStep = ({
	flowKey,
	getEntityId,
}: RestoreCurrentStepParams) => (props: object): RestoreCurrentStepOutput => {
	const entityId = getEntityId(props);
	const defaultStep = -1;
	const flowManager = getItemFromLocalStorage({ item: FLOW_MANAGER });
	const currentFlow = get(flowManager, `${entityId}[${flowKey}]`, null);
	if (!currentFlow) {
		return {
			currentStep: undefined,
		};
	}
	const currentStep = get(currentFlow, CURRENT_STEP, defaultStep);
	const currentUrl = get(currentFlow, CURRENT_URL);
	const extraProps = get(currentFlow, EXTRA_PROPS, {});
	return {
		currentUrl,
		currentStep,
		flowExtraProps: extraProps,
	};
};

export const withRestoreCurrentStepHandler = ({
	flowKey,
	getEntityId,
}: RestoreCurrentStepParams): RestoreCurrentStepHOC =>
	withHandlers({
		restoreCurrentStep: restoreCurrentStep({ flowKey, getEntityId }),
	});
