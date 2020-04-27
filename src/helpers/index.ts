export * from './flow-manager'

/** @Description: flowManager in localStorage format in localStorage:
 *  flowManager = {
 *    [agreementId]: { // saved state of a specific agreement by its id
 *      [flowName]: { // saved state of a specific flow
 *        currentStep: {number | string }{required}, // stepIndex - can be in whatever format - recommend {number | string} to make it simple
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
