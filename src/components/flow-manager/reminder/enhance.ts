import { withRouter } from 'react-router-dom';
import { withHandlers, withProps, compose } from 'recompose';
import { getIncompleteFlow, withIncompleteFlow } from '../hocs/get-flow-v2';
import { GetEntityId } from '../hocs/types';
import { resetSelectedFlowKeysHandlerV2 } from '../hocs/reset-flow-v2';

interface WithIncompleteFlowDataParams {
	flowKey: string;
	getEntityId: GetEntityId;
}

export const withIncompleteFlowData = ({
	flowKey,
	getEntityId,
	...otherProps
}: WithIncompleteFlowDataParams): object => {
	const { incompleteFlow } = getIncompleteFlow({
		flowKey,
		getEntityId,
	})(otherProps);
	const shouldReminderShow = !!incompleteFlow;
	return {
		incompleteFlow,
		shouldReminderShow,
	};
};

interface OnDiscardIncompleteFlowHandlerParams {
	resetAgreementFlow: () => void;
}

export const onDiscardIncompleteFlowHandler = ({
	resetAgreementFlow,
}: OnDiscardIncompleteFlowHandlerParams) => (): void => {
	resetAgreementFlow();
};

interface ReactRouterType {
	push: (string) => void;
}

interface ConfirmRestoreIncompleteFlowParams {
	history: ReactRouterType;
	firstIncompleteCurrentUrl: string;
}

export const confirmRestoreIncompleteFlowHandler = ({
	history,
	firstIncompleteCurrentUrl,
}: ConfirmRestoreIncompleteFlowParams) => (): void => {
	if (!firstIncompleteCurrentUrl) {
		return;
	}
	history.push(firstIncompleteCurrentUrl);
};

const enhance = compose(
	withRouter,
	withProps(withIncompleteFlowData),
	withIncompleteFlow,
	withHandlers({
		resetFlow: resetSelectedFlowKeysHandlerV2,
	}),
	withHandlers({
		discardIncompleteFlow: onDiscardIncompleteFlowHandler,
		confirmRestoreIncompleteFlow: confirmRestoreIncompleteFlowHandler,
	}),
);

export default enhance;
