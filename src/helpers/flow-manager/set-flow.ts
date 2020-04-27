import { getUpdateExtraProps } from '@helpers/flow-manager/extra-props';
import { get } from 'lodash';
import { getItemFromLocalStorage, setItemToLocalStorage } from './local-storage';
import { DEFAULT_AGREEMENT_ID, DEFAULT_PATH, FLOW_MANAGER } from './constants';
import { Flow } from '@helpers/flow-manager/types';
import { withHandlers, withProps } from 'recompose';

interface GetUpdateAgreementFlowParams {
	flow: string;
	step: string;
	extraProps: string[];
	agreementFlow: any;
}

interface AgreementFlowProps {
	[flow: string]: Flow;
}

export const getUpdateAgreementFlow = ({
	flow,
	step,
	extraProps = [],
	agreementFlow,
}: GetUpdateAgreementFlowParams) => (props: object): AgreementFlowProps => {
	const currentUrl = get(props, 'match.url');
	const updateFlow = get(agreementFlow, `[${flow}]`, {});
	updateFlow.currentStep = step;
	updateFlow.currentUrl = currentUrl;

	updateFlow.extraProps = getUpdateExtraProps(updateFlow.extraProps, extraProps)(props);

	return {
		...agreementFlow,
		[flow]: updateFlow,
	};
};

interface SetStepParams {
	flow: string;
	step: string;
	pathToAgreementId: string;
	extraProps?: any[];
}

export const setStep = ({
	flow,
	step,
	pathToAgreementId = DEFAULT_PATH,
	extraProps = [],
}: SetStepParams) => (props: object): void => {
	const agreementId = get(props, pathToAgreementId, DEFAULT_AGREEMENT_ID);
	const flowManager = getItemFromLocalStorage({ item: FLOW_MANAGER });
	const agreementFlow = get(flowManager, `${agreementId}`, {});

	const body = {
		...flowManager,
		[agreementId]: getUpdateAgreementFlow({
			flow,
			step,
			extraProps,
			agreementFlow,
		})(props),
	};

	setItemToLocalStorage({
		item: FLOW_MANAGER,
		body,
	});
};

export const withSaveCurrentStep = ({ flow, step, pathToAgreementId, extraProps }: SetStepParams) =>
	withProps(setStep({ flow, step, pathToAgreementId, extraProps }));

interface WithSetLocalStorageProps {
	setLocalStorageStep: (props: SetStepParams) => any;
}

type WithSetLocalStorageHOC = (Component: any) => (props: WithSetLocalStorageProps) => any;

export const withSetLocalStorageStepHandlers = ({
	flow,
	step,
	pathToAgreementId,
	extraProps,
}: SetStepParams): WithSetLocalStorageHOC =>
	withHandlers({
		setLocalStorageStep: setStep({
			flow,
			step,
			pathToAgreementId,
			extraProps,
		}),
	});
