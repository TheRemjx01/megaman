import { withRouter } from 'react-router-dom';
import {
	getIncompleteFlow,
	resetSelectedFlowKeysHandlerV2,
	withIncompleteFlow,
} from '@helpers/index';
import { withHandlers, withProps, compose } from 'recompose';
import { ModalState } from '@shared/hocs';
import { GetEntityId } from '@helpers/flow-manager/types';

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
	incompleteFlowModalState: ModalState;
}

export const onDiscardIncompleteFlowHandler = ({
	resetAgreementFlow,
	incompleteFlowModalState,
}: OnDiscardIncompleteFlowHandlerParams) => (): void => {
	incompleteFlowModalState.showLoading();
	resetAgreementFlow();
	incompleteFlowModalState.hideLoading();
	incompleteFlowModalState.hideModal();
};

interface ReactRouterType {
	push: (string) => void;
}

interface ConfirmRestoreIncompleteFlowParams {
	history: ReactRouterType;
	incompleteFlowModalState: ModalState;
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
