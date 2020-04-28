import * as React from 'react';
import enhance from './enhance';
import FlowManagerReminder, { ReminderProps } from './FlowManagerReminder';

export interface EnhancedFlowManagerReminderProps {
	flowKey: string;
	Reminder: React.FunctionComponent<ReminderProps>;
	reminderProps: ReminderProps;
}

export type FlowManagerReminderType = React.FC<
	EnhancedFlowManagerReminderProps
>;

const enhancedFlowManagerReminder: FlowManagerReminderType = enhance(
	FlowManagerReminder,
);

export default enhancedFlowManagerReminder;
