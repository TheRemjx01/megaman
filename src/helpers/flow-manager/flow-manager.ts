import { FlowManager } from '@helpers/flow-manager/types';
import {
	getItemFromLocalStorage,
	setItemToLocalStorage,
} from '@helpers/flow-manager/local-storage';
import { FLOW_MANAGER } from '@helpers/flow-manager/constants';

export const getFlowManager = (): FlowManager =>
	getItemFromLocalStorage({ item: FLOW_MANAGER }) as FlowManager;

export const setFlowManager = (body: FlowManager): void =>
	setItemToLocalStorage({ item: FLOW_MANAGER, body });
