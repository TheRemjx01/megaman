import { get } from 'lodash';
import {
	getItemFromLocalStorage,
	setItemToLocalStorage,
} from '@helpers/flow-manager/local-storage';
import { withHandlers } from 'recompose';
import { DEFAULT_AGREEMENT_ID, FLOW_MANAGER } from '@helpers/flow-manager/constants';

interface ResetFlowParams {
	flow: string;
	pathToAgreementId: string;
}

interface ResetSelectedFlowKeysParams {
	selectedFlowKeys: string[];
	pathToAgreementId: string;
}

export const resetFlow = ({ flow, pathToAgreementId }: ResetFlowParams) => (
	props: object,
): void => {
	const agreementId = get(props, pathToAgreementId, DEFAULT_AGREEMENT_ID);
	const flowManager = getItemFromLocalStorage({ item: FLOW_MANAGER });
	const agreementFlow = get(flowManager, `${agreementId}`, {});
	agreementFlow[flow] = {};

	const body = {
		...flowManager,
		[agreementId]: agreementFlow,
	};

	setItemToLocalStorage({
		item: FLOW_MANAGER,
		body,
	});
};

export const resetSelectedFlowKeysHandler = ({
	selectedFlowKeys = [],
	pathToAgreementId,
	...otherProps
}: ResetSelectedFlowKeysParams) => () => {
	selectedFlowKeys.forEach((flowKey) => {
		resetFlow({ flow: flowKey, pathToAgreementId })(otherProps);
	});
};

interface WithResetFlowProps {
	resetAgreementFlow: (props: object) => void;
}

type WithResetFlowHOC = (Component: any) => (props: WithResetFlowProps) => any;

export const withResetFlowHandlers = ({
	flow,
	pathToAgreementId,
}: ResetFlowParams): WithResetFlowHOC =>
	withHandlers({
		resetAgreementFlow: (props) => () => resetFlow({ flow, pathToAgreementId })(props),
	});
