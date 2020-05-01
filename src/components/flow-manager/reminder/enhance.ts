import { withHandlers, withProps, compose } from 'recompose';
import { GetEntityId, flowManager, FlowData } from '../hocs';
import { get } from 'lodash';

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

export const confirmRestoreIncompleteFlowHandler = ({
	incompleteFlow,
}: {
	incompleteFlow: FlowData;
}) => (navigate: NavigateFunc): void => {
	const currentUrl = get(incompleteFlow, 'currentUrl');
	if (!currentUrl) {
		return;
	}
	navigate(currentUrl);
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
