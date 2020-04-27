import { ReactNode } from 'react';

export interface EnhancedFlowManagerReminderProps {
	selectedFlowKeys: string[];
}

export type FlowManagerReminderType = (props: EnhancedFlowManagerReminderProps) => ReactNode;
