import { get } from 'lodash';
import { ResetFlowParamsV2, ResetSelectedFlowKeysParamsV2 } from './types';
import { getFlowManager, setFlowManager } from './flow-manager';
import { DEFAULT_ID } from './constants';

export type ResetFlowV2 = (
	params: ResetFlowParamsV2,
) => (props: object) => void;

export const resetFlowV2: ResetFlowV2 = ({
	flow,
	getEntityId,
}: ResetFlowParamsV2) => (props: object): void => {
	const entityId = getEntityId(props) || DEFAULT_ID;
	const flowManager = getFlowManager();
	const entityFlow = get(flowManager, `${entityId}`, {});
	entityFlow[flow] = {};

	const body = {
		...flowManager,
		[entityId]: entityFlow,
	};

	setFlowManager(body);
};

export type ResetSelectedFlowKeysHandlerV2 = (
	params: ResetSelectedFlowKeysParamsV2,
) => () => void;

export const resetSelectedFlowKeysHandlerV2: ResetSelectedFlowKeysHandlerV2 = ({
	flowKey,
	getEntityId,
	...otherProps
}: ResetSelectedFlowKeysParamsV2) => (): void => {
	resetFlowV2({ flow: flowKey, getEntityId })(otherProps);
};
