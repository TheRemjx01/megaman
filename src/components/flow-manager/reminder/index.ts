import enhance from './enhance';
import FlowManagerReminder from './FlowManagerReminder';
import {FlowManagerReminderType} from "./types";

const enhancedFlowManagerReminder: FlowManagerReminderType = enhance(FlowManagerReminder);

export default enhancedFlowManagerReminder;
