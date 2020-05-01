import { get } from 'lodash';
import { GetEntityId } from './types';
import { getFlowManager, setFlowManager } from './flow-manager';
import { DEFAULT_ID } from './constants';

export interface ResetFlowParams {
	flow: string;
	getEntityId: GetEntityId;
}

export interface ResetSelectedFlowKeysParams {
	flowKey: string;
	getEntityId: GetEntityId;
}

export type ResetFlow = (params: ResetFlowParams) => (props: object) => void;

export const resetFlow: ResetFlow = ({
	flow,
	getEntityId,
}: ResetFlowParams) => (props: object): void => {
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

export type ResetSelectedFlowKeysHandler = (
	params: ResetSelectedFlowKeysParams,
) => () => void;

export const resetSelectedFlowKeysHandler: ResetSelectedFlowKeysHandler = ({
	flowKey,
	getEntityId,
	...otherProps
}: ResetSelectedFlowKeysParams) => (): void => {
	resetFlow({ flow: flowKey, getEntityId })(otherProps);
};
