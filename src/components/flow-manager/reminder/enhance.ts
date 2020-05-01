import { withHandlers, withProps, compose } from 'recompose';
import { GetEntityId, flowManager } from '../hocs';

interface WithIncompleteFlowDataParams {
	flowKey: string;
	getEntityId: GetEntityId;
}

export const withIncompleteFlowData = ({
	flowKey,
	getEntityId,
	...otherProps
}: WithIncompleteFlowDataParams): object => {
	const { incompleteFlow } = flowManager.getIncompleteFlow({
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

export type NavigateFunc = (path: string) => void;

interface ConfirmRestoreIncompleteFlowParams {
	firstIncompleteCurrentUrl: string;
}

export const confirmRestoreIncompleteFlowHandler = ({
	firstIncompleteCurrentUrl,
}: ConfirmRestoreIncompleteFlowParams) => (navigate: NavigateFunc): void => {
	if (!firstIncompleteCurrentUrl) {
		return;
	}
	navigate(firstIncompleteCurrentUrl);
};

const enhance = compose(
	withProps(withIncompleteFlowData),
	withHandlers({
		resetFlow: flowManager.resetSelectedFlowKeysHandler,
	}),
	withHandlers({
		discardIncompleteFlow: onDiscardIncompleteFlowHandler,
		confirmRestoreIncompleteFlow: confirmRestoreIncompleteFlowHandler,
	}),
);

export default enhance;
