import * as React from 'react';
import Hidden from '../../hidden';
import { FlowData } from '../hocs';
import { NavigateFunc } from './enhance';

const Fragment = React.Fragment;

export interface ReminderProps {
	incompleteFlow: FlowData;
	resetFlow: () => void;
	confirmRestoreIncompleteFlow: (navigateFunc: NavigateFunc) => void;
	[otherPropKey: string]: any;
}

export interface FlowManagerProps {
	children?: React.ReactElement;
	Reminder: React.FunctionComponent<ReminderProps>;
	shouldReminderShow?: boolean;
	resetFlow: () => void;
	confirmRestoreIncompleteFlow: (navigate: NavigateFunc) => void;
	reminderProps?: ReminderProps;
	incompleteFlow: FlowData;
}

const FlowManagerReminder: React.FC<FlowManagerProps> = (
	props: FlowManagerProps,
) => {
	const {
		children,
		Reminder,
		reminderProps,
		shouldReminderShow,
		resetFlow,
		confirmRestoreIncompleteFlow,
		incompleteFlow,
	} = props;
	return (
		<Fragment>
			{children}
			<Hidden when={!shouldReminderShow}>
				<Reminder
					{...reminderProps}
					incompleteFlow={incompleteFlow}
					resetFlow={resetFlow}
					confirmRestoreIncompleteFlow={confirmRestoreIncompleteFlow}
				/>
			</Hidden>
		</Fragment>
	);
};

export default FlowManagerReminder;
