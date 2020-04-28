export { withClearFlowManagerHandlers } from '@helpers/flow-manager/clear-flow';
export {
	getIncompleteFlow,
	withIncompleteFlow,
} from '@helpers/flow-manager/get-flow-v2';

export {
	restoreCurrentStep,
	withRestoreCurrentStepHandler,
} from '@helpers/flow-manager/restore-flow';

export {
	resetFlowV2,
	resetSelectedFlowKeysHandlerV2,
} from '@helpers/flow-manager/reset-flow-v2';

export {
	withSetLocalStorageStepHandlersV2,
	withSaveCurrentStepV2,
	getUpdateFlow,
	setStep,
} from '@helpers/flow-manager/set-flow-v2';

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
