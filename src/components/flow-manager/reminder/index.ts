import * as React from 'react';
import FlowManagerReminder, { ReminderProps } from './FlowManagerReminder';
import enhance from './enhance';
import { GetEntityId } from '../hocs';

export interface EnhancedFlowManagerReminderProps {
	flowKey: string;
	Reminder: React.FunctionComponent<ReminderProps>;
	extraReminderProps?: any;
	getEntityId: GetEntityId;
}

export type FlowManagerReminderType = React.FC<
	EnhancedFlowManagerReminderProps
>;

const enhancedFlowManagerReminder: FlowManagerReminderType = enhance(
	FlowManagerReminder,
);

export default enhancedFlowManagerReminder;
