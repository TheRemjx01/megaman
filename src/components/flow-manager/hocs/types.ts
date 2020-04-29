export interface FlowData {
	currentStep: string;
	extraProps: object;
	currentUrl: string;
}

export interface Flow {
	[flowName: string]: FlowData;
}

export interface FlowManager {
	[entityId: string]: Flow;
}

export type GetEntityId = (props?: object) => string | number;

export interface ResetFlowParamsV2 {
	flow: string;
	getEntityId: GetEntityId;
}

export interface ResetSelectedFlowKeysParamsV2 {
	flowKey: string;
	getEntityId: GetEntityId;
}
