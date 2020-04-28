import { DEFAULT_ID } from '@helpers/flow-manager/constants';
import { get } from 'lodash';
import {
	ResetFlowParamsV2,
	ResetSelectedFlowKeysParamsV2,
} from '@helpers/flow-manager/types';
import {
	getFlowManager,
	setFlowManager,
} from '@helpers/flow-manager/flow-manager';

export const resetFlowV2 = ({ flow, getEntityId }: ResetFlowParamsV2) => (
	props: object,
): void => {
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

export const resetSelectedFlowKeysHandlerV2 = ({
	flowKey,
	getEntityId,
	...otherProps
}: ResetSelectedFlowKeysParamsV2) => (): void => {
	resetFlowV2({ flow: flowKey, getEntityId })(otherProps);
};
