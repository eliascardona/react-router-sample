import { useEffect, useReducer } from 'react';
import { useActionData, useSubmit } from 'react-router';
import {
  useCheckoutActionResolver,
  useCheckoutEffects,
} from '~/lib/shopping/hooks';
import { checkoutReducer } from '~/lib/shopping/reducers/checkoutReducer';
import { ELIASCARDONA_USER_ID, STRIPE_PRICE_ID } from '~/lib/TESTING_MOCKS';
import { getProductIdFromPathname } from '~/lib/utils/utils';
import type { action } from '~/routes/course.$productId.checkout';
import { CheckoutViewHandler } from './stage-handler';

export function CheckoutController() {
  const actionData = useActionData<typeof action>();
  const submit = useSubmit();
  const productId = getProductIdFromPathname();
  const stripePriceId = STRIPE_PRICE_ID;

  /* Authoritative state machine */
  const [state, dispatch] = useReducer(checkoutReducer, {
    phase: 'INIT',
    execution: {
      checkoutSessionCommandIssued: false,
      orderCommandIssued: false,
    },
  });

  /* Action resolver */
  useCheckoutActionResolver(actionData, dispatch);

  /* Effect executor (only when state is authorized and commands are ready) */
  useCheckoutEffects(
    state,
    submit,
    {
      userId: ELIASCARDONA_USER_ID,
      productId,
    },
    dispatch
  );

  /* Bootstrap side effect (explicit, single-entry) */
  useEffect(() => {
    if (state.phase === 'INIT' && stripePriceId != null) {
      dispatch({
        type: 'START',
        stripePriceId,
      });
    }
  }, [state.phase, stripePriceId]);

  return <CheckoutViewHandler state={state} />;
}
