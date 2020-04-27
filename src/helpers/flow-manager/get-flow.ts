import {getItemFromLocalStorage} from "@helpers/flow-manager/local-storage";
import {
    CURRENT_STEP,
    CURRENT_URL,
    DEFAULT_AGREEMENT_ID,
    DEFAULT_PATH, EXTRA_PROPS,
    FLOW_MANAGER
} from "@helpers/flow-manager/constants";
import {Flow} from "@helpers/flow-manager/types";
import {get} from 'lodash';
import {withProps} from 'recompose';

interface GetIncompleteFlowsParams {
    selectedFlowKeys: string[];
    pathToAgreementId: string;
}

interface GetIncompleteFlowsOutput {
    incompleteFlows: Flow
}

export const getIncompleteFlows = ({
                                       selectedFlowKeys = [],
                                       pathToAgreementId,
                                   }: GetIncompleteFlowsParams) => (props: object): GetIncompleteFlowsOutput => {
    const agreementId = get(props, pathToAgreementId, DEFAULT_AGREEMENT_ID);
    const agreementFlowManager = get(
        getItemFromLocalStorage({ item: FLOW_MANAGER }),
        `${agreementId}`,
    );
    const incompleteFlows = {};
    selectedFlowKeys.forEach(key => {
        incompleteFlows[key] = get(agreementFlowManager, key);
    });

    return {
        incompleteFlows,
    };
};


interface GetFirstIncompleteFlowParams {
    incompleteFlows: Flow
}

interface GetFirstIncompleteFlowOutput {
    firstIncompleteFlowName: string;
    firstIncompleteCurrentUrl: string;
}

export const getFirstIncompleteFlow = ({ incompleteFlows = {} }: GetFirstIncompleteFlowParams)
    : GetFirstIncompleteFlowOutput => {
    let firstIncompleteFlowName = '';
    let firstIncompleteCurrentUrl = '';
    const flowKeys = Object.keys(incompleteFlows);
    if (flowKeys.length === 0) {
        return { firstIncompleteFlowName: '', firstIncompleteCurrentUrl: '' };
    }

    for (let i = 0; i < flowKeys.length; i += 1) {
        const key = flowKeys[i];
        const currentStep = get(incompleteFlows, `[${key}].currentStep`);
        const currentUrl = get(incompleteFlows, `[${key}].currentUrl`);
        if (currentStep) {
            firstIncompleteFlowName = key;
            firstIncompleteCurrentUrl = currentUrl;
            break;
        }
    }

    return { firstIncompleteFlowName, firstIncompleteCurrentUrl };
};


interface RestoreCurrentStepParams {
    flow: string;
    pathToAgreementId: string;
}

interface RestoreCurrentStepOutput {
    currentUrl?: string;
    currentStep: string;
    flowExtraProps?: object;
}

export const restoreCurrentStep = ({
                                       flow,
                                       pathToAgreementId = DEFAULT_PATH,
                                   }: RestoreCurrentStepParams) => (props: object): RestoreCurrentStepOutput => {
    const agreementId = get(props, pathToAgreementId, DEFAULT_AGREEMENT_ID);
    const defaultStep = -1;
    const flowManager = getItemFromLocalStorage({ item: FLOW_MANAGER });
    const currentFlow = get(flowManager, `${agreementId}[${flow}]`, null);
    if (!currentFlow) {
        return {
            currentStep: undefined,
        };
    }
    const currentStep = get(currentFlow, CURRENT_STEP, defaultStep);
    const currentUrl = get(currentFlow, CURRENT_URL);
    const extraProps = get(currentFlow, EXTRA_PROPS, {});
    return {
        currentUrl,
        currentStep,
        flowExtraProps: extraProps,
    };
};


export const withIncompleteFlows = ({ selectedFlowKeys, pathToAgreementId }) =>
    withProps(getIncompleteFlows({ selectedFlowKeys, pathToAgreementId }));

export const withRestoreCurrentStep = ({ flow, pathToAgreementId }) =>
    withProps(restoreCurrentStep({ flow, pathToAgreementId }));


export const mapExtraProps = (propKeys: string[] = []) => (props: object): object => {
    const extraProps = {};
    propKeys.forEach(key => {
        extraProps[key] = props[key];
    });
    return {
        ...extraProps,
    };
};

export const withFlowExtraProps = propKeys => withProps(mapExtraProps(propKeys));