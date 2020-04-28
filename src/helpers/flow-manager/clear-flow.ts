import { setItemToLocalStorage } from '@helpers/flow-manager/local-storage';
import { FLOW_MANAGER } from '@helpers/flow-manager/constants';
import { withHandlers } from 'recompose';
import { HOC } from '@selfTypes/index';
import * as React from 'react';

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
