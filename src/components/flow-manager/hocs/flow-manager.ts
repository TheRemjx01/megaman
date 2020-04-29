import { FlowManager } from './types';
import {
	getItemFromLocalStorage,
	setItemToLocalStorage,
} from './local-storage';
import { FLOW_MANAGER } from './constants';

export const getFlowManager = (): FlowManager =>
	getItemFromLocalStorage({ item: FLOW_MANAGER }) as FlowManager;

export const setFlowManager = (body: FlowManager): void =>
	setItemToLocalStorage({ item: FLOW_MANAGER, body });
