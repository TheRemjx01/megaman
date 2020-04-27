export interface FlowData {
    currentStep: string;
    extraProps: object;
    currentUrl: string;
}

export interface Flow {
    [flowName: string]: FlowData
}