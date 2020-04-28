import * as React from 'react';
import { ModalState } from '@shared/hocs';
import IncompleteFlowsConfirmModal from './components/incomplete-flow-modal';

const Fragment = React.Fragment;

interface FlowManagerProps {
	children: React.ReactNode;
	incompleteFlowModalState: ModalState;
	firstIncompleteFlowName: string;
	discardIncompleteFlow: () => void;
	confirmRestoreIncompleteFlow: () => void;
	discardText: string;
	okText: string;
	titleText: string;
	message: string;
}

const FlowManagerReminder = ({
	children,
	incompleteFlowModalState,
	firstIncompleteFlowName,
	discardIncompleteFlow,
	confirmRestoreIncompleteFlow,
	discardText,
	okText,
	titleText,
	message,
}: FlowManagerProps): React.ReactNode => (
	<Fragment>
		{children}
		<IncompleteFlowsConfirmModal
			discardText={discardText}
			message={message}
			okText={okText}
			titleText={titleText}
			visible={incompleteFlowModalState.isVisible}
			onCancel={incompleteFlowModalState.hideModal}
			incompleteFlowName={firstIncompleteFlowName}
			loading={incompleteFlowModalState.isLoading}
			discardIncompleteFlow={discardIncompleteFlow}
			confirmRestoreIncompleteFlow={confirmRestoreIncompleteFlow}
		/>
	</Fragment>
);

export default FlowManagerReminder;
