import { withHandlers } from 'recompose';
import { HOC } from '../../../types';
import * as React from 'react';
import { setItemToLocalStorage } from './local-storage';
import { FLOW_MANAGER } from './constants';

export const clearFlowManagerHandler = () => (): void => {
	setItemToLocalStorage({
		item: FLOW_MANAGER,
		body: undefined,
	});
};

interface WithClearFlowManagerProps {
	clearFlowManager: () => void;
}

type ClearFlowManagerHandlersHOC = HOC<React.FC<WithClearFlowManagerProps>>;

export const withClearFlowManagerHandlers = (): ClearFlowManagerHandlersHOC =>
	withHandlers({
		clearFlowManager: clearFlowManagerHandler,
	});
