import React from 'react';
import { Button, Modal } from 'antd';

interface IncompleteFlowsConfirmModalProps {
	visible: boolean;
	onCancel: (...params: any) => any;
	loading: boolean;
	discardIncompleteFlow: () => any;
	confirmRestoreIncompleteFlow: () => any;
	incompleteFlowName: string;
	titleText: string;
	okText: string;
	discardText: string;
	message: string;
}

const IncompleteFlowsConfirmModal = ({
	visible,
	onCancel,
	loading,
	discardIncompleteFlow,
	confirmRestoreIncompleteFlow,
	titleText,
	okText,
	discardText,
	message,
}: IncompleteFlowsConfirmModalProps) => (
	<Modal
		visible={visible}
		title={titleText}
		onCancel={onCancel}
		confirmLoading={loading}
		footer={[
			<Button onClick={discardIncompleteFlow} key="cancel" size="small">
				{discardText}
			</Button>,
			<Button onClick={confirmRestoreIncompleteFlow} type="primary" key="confirm" size="small">
				{okText}
			</Button>,
		]}
	>
		{message}
	</Modal>
);

export default IncompleteFlowsConfirmModal;
