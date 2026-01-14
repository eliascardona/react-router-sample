export type CheckoutPhase =
  | 'INIT'
  | 'CREATING_CHECKOUT_SESSION'
  | 'CHECKOUT_SESSION_READY'
  | 'CREATING_ORDER'
  | 'ORDER_READY';

export type ExecutionFlags = {
  checkoutSessionCommandIssued: boolean;
  orderCommandIssued: boolean;
};

export type CheckoutState = {
  phase: CheckoutPhase;

  checkoutSessionId?: string;
  orderId?: string;
  internalPaymentIntentId?: string;
  externalPaymentIntentId?: string;
  stripeClientSecret?: string;

  execution: ExecutionFlags;
};

export type CheckoutEvent =
  | { type: 'START' }
  | { type: 'CHECKOUT_SESSION_COMMAND_ISSUED' }
  | { type: 'CHECKOUT_SESSION_CREATED'; sessionId: string }
  | { type: 'ORDER_COMMAND_ISSUED' }
  | {
      type: 'ORDER_CREATED';
      orderId: string;
      internalPaymentIntentId: string;
      externalPaymentIntentId: string;
      stripeClientSecret: string;
    };

export function checkoutReducer(
  state: CheckoutState,
  event: CheckoutEvent
): CheckoutState {
  switch (event.type) {
    case 'START':
      return {
        phase: 'CREATING_CHECKOUT_SESSION',
        execution: {
          checkoutSessionCommandIssued: false,
          orderCommandIssued: false,
        },
      };

    case 'CHECKOUT_SESSION_COMMAND_ISSUED':
      if (state.execution.checkoutSessionCommandIssued) return state;
      return {
        ...state,
        execution: {
          ...state.execution,
          checkoutSessionCommandIssued: true,
        },
      };

    case 'CHECKOUT_SESSION_CREATED':
      return {
        phase: 'CHECKOUT_SESSION_READY',
        checkoutSessionId: event.sessionId,
        execution: {
          ...state.execution,
          checkoutSessionCommandIssued: true,
        },
      };

    case 'ORDER_COMMAND_ISSUED':
      if (state.execution.orderCommandIssued) return state;
      return {
        ...state,
        phase: 'CREATING_ORDER',
        execution: {
          ...state.execution,
          orderCommandIssued: true,
        },
      };

    case 'ORDER_CREATED':
      return {
        ...state,
        phase: 'ORDER_READY',
        orderId: event.orderId,
      };

    default:
      return state;
  }
}
