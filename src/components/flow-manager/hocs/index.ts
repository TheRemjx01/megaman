export { withClearFlowManagerHandlers } from './clear-flow';
export {
	getIncompleteFlow,
	withIncompleteFlow,
	GetIncompleteFlow,
	WithIncompleteFlow,
} from './get-flow-v2';

export {
	restoreCurrentStep,
	RestoreCurrentStep,
	withRestoreCurrentStepHandler,
	WithRestoreCurrentStepHandler,
} from './restore-flow';

export {
	resetFlowV2,
	ResetFlowV2,
	resetSelectedFlowKeysHandlerV2,
	ResetSelectedFlowKeysHandlerV2,
} from './reset-flow-v2';

export {
	withSetLocalStorageStepHandlers,
	getUpdateFlow,
	setStep,
} from './set-flow';

import { ResetFlowV2, resetFlowV2 } from './reset-flow-v2';
import { GetIncompleteFlow, getIncompleteFlow } from './get-flow-v2';

export const flowManager: {
	resetFlowV2: ResetFlowV2;
	getIncompleteFlow: GetIncompleteFlow;
} = {
	resetFlowV2,
	getIncompleteFlow,
};

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
