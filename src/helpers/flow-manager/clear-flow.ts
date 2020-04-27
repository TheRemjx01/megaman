import {setItemToLocalStorage} from "@helpers/flow-manager/local-storage";
import {FLOW_MANAGER} from "@helpers/flow-manager/constants";
import {withHandlers} from 'recompose';

export const clearFlowManagerHandler = () => ():void => {
    setItemToLocalStorage({
        item: FLOW_MANAGER,
        body: undefined,
    });
};

interface WithClearFlowManagerProps {
    clearFlowManager: () => void
}

type ClearFlowManagerHandlersHOC = (Component: any) => (props: WithClearFlowManagerProps) => any

export const withClearFlowManagerHandlers = (): ClearFlowManagerHandlersHOC =>
    withHandlers({
        clearFlowManager: clearFlowManagerHandler,
    });