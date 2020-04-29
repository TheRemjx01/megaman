import { withHandlers, withProps, compose } from 'recompose';
import {
	getIncompleteFlow,
	GetEntityId,
	resetSelectedFlowKeysHandlerV2,
} from '../hocs';

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
		resetFlow: resetSelectedFlowKeysHandlerV2,
	}),
	withHandlers({
		discardIncompleteFlow: onDiscardIncompleteFlowHandler,
		confirmRestoreIncompleteFlow: confirmRestoreIncompleteFlowHandler,
	}),
);

export default enhance;
