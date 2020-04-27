import { setItemToLocalStorage } from '@helpers/flow-manager/local-storage';
import { FLOW_MANAGER } from '@helpers/flow-manager/constants';
import { withHandlers } from 'recompose';
import { HOC } from '@selfTypes/index';

export const clearFlowManagerHandler = () => (): void => {
	setItemToLocalStorage({
		item: FLOW_MANAGER,
		body: undefined,
	});
};

interface WithClearFlowManagerProps {
	clearFlowManager: () => void;
}

type ClearFlowManagerHandlersHOC = HOC<(props: WithClearFlowManagerProps) => any>;

export const withClearFlowManagerHandlers = (): ClearFlowManagerHandlersHOC =>
	withHandlers({
		clearFlowManager: clearFlowManagerHandler,
	});
