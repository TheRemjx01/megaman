import * as React from 'react';
import Hidden from '../../hidden';

const Fragment = React.Fragment;

export interface ReminderProps {
	resetFlow: () => void;
	confirmRestoreIncompleteFlow: () => void;
	[otherPropKey: string]: any;
}

export interface FlowManagerProps {
	children?: React.ReactElement;
	Reminder: React.FunctionComponent<ReminderProps>;
	shouldReminderShow?: boolean;
	resetFlow: () => void;
	confirmRestoreIncompleteFlow: () => void;
	reminderProps?: ReminderProps;
}

const FlowManagerReminder: React.FC<FlowManagerProps> = ({
	children,
	Reminder,
	reminderProps,
	shouldReminderShow,
	resetFlow,
	confirmRestoreIncompleteFlow,
}: FlowManagerProps) => (
	<Fragment>
		{children}
		<Hidden when={shouldReminderShow}>
			<Reminder
				{...reminderProps}
				resetFlow={resetFlow}
				confirmRestoreIncompleteFlow={confirmRestoreIncompleteFlow}
			/>
		</Hidden>
	</Fragment>
);

export default FlowManagerReminder;
