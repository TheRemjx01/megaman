import {
	ClearFlowManagerHandlersHOC,
	withClearFlowManagerHandlers,
} from './clear-flow';

import {
	resetFlow,
	ResetFlow,
	ResetSelectedFlowKeysHandler,
	resetSelectedFlowKeysHandler,
} from './reset-flow';
import {
	GetIncompleteFlow,
	getIncompleteFlow,
	withIncompleteFlow,
	WithIncompleteFlow,
} from './get-flow';
import {
	SetFlowParams,
	SetFlowStep,
	setFlowStep,
	WithSetFlowHOC,
	withSetFlowStepHandlers,
} from './set-flow-step';

export type FlowManagerType = {
	resetFlowV2: ResetFlow;
	getIncompleteFlow: GetIncompleteFlow;
	withIncompleteFlow: WithIncompleteFlow;
	withSetFlowStepHandlers: (params: SetFlowParams) => WithSetFlowHOC;
	resetSelectedFlowKeysHandler: ResetSelectedFlowKeysHandler;
	withClearFlowManagerHandlers: () => ClearFlowManagerHandlersHOC;
	setFlowStep: SetFlowStep;
};

export const flowManager: FlowManagerType = {
	resetFlowV2: resetFlow,
	getIncompleteFlow,
	withIncompleteFlow,
	withSetFlowStepHandlers,
	setFlowStep,
	resetSelectedFlowKeysHandler,
	withClearFlowManagerHandlers,
};

export { GetIncompleteFlow, WithIncompleteFlow } from './get-flow';
export {
	RestoreCurrentStep,
	WithRestoreCurrentStepHandler,
} from './restore-flow';
export { ResetFlow, ResetSelectedFlowKeysHandler } from './reset-flow';

export * from './types';

/** @Description: flowManager in localStorage format in localStorage:
 *  flowManager = {
 *    [entityId]: { // saved state of a specific entity by its id
 *      [flowName]: { // saved state of a specific flow
 *        currentStep: {number | string }{required},
 *        	// stepIndex - can be in whatever format - recommend {number | string} to make it simple
 *        extraProps: {object}{optional} // extraProps that need for components restoration
 *        currentUrl: {string} // url of current step that support for restoration from other scene
 *      }
 *    },
 *  }
 * @Example:
 *  flowManager = {
 *    1: {
 *      'settlement': {
 *        currentStep: 'additional_charges',
 *        extraProps: {additionalInvoiceId: 1, receiptId: 1},
 *        currentUrl: '/agreement-settlement/1'
 *      },
 *      'makePayment': {
 *        currentStep: 'add_payment',
 *        extraProps: {invoiceIds: [1,2,3], depositIds: [1]},
 *        currentUrl: '/make-payment/1'
 *      }
 *    }
 *    2: {
 *      'settlement': {
 *        currentStep: 'additional_charges',
 *      }
 *    }
 *  }
 * */
