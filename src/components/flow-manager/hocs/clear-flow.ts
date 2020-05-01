import * as React from 'react';
import { withHandlers } from 'recompose';
import { HOC } from '../../../types';
import { setItemToLocalStorage } from './local-storage';
import { FLOW_MANAGER } from './constants';

export const clearFlowManagerHandler = () => (): void => {
	setItemToLocalStorage({
		item: FLOW_MANAGER,
		body: undefined,
	});
};

export interface WithClearFlowManagerProps {
	clearFlowManager: () => void;
}

export type ClearFlowManagerHandlersHOC = HOC<
	React.FC<WithClearFlowManagerProps>
>;

export const withClearFlowManagerHandlers = (): ClearFlowManagerHandlersHOC =>
	withHandlers({
		clearFlowManager: clearFlowManagerHandler,
	});
