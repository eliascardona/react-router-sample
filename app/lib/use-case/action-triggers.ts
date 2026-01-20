import type { Navigation } from 'react-router';
import {
  formatDataIntoCreateCheckoutSessionRequestBody,
  formatDataIntoOrderCreationRequestBody,
} from '../formatters/form-values';
import {
  useSubmitFromReactRouter,
  type BaseUseFormSubmitOptions,
  type SubmitFunctionAbstraction,
} from '../forms/submission/utils';
import type {
  CreateCheckoutSessionCommand,
  CreateOrderFromCheckoutSessionCommand,
} from '../shopping/types';

function generateSubmitOptionsForOrdering(
  productId: string,
  submit: SubmitFunctionAbstraction['useSubmit']
) {
  const BASE_SUBMIT_OPTIONS_FOR_ORDERING: BaseUseFormSubmitOptions = {
    method: 'POST' as const,
    action: `/course/${productId}/checkout` as const,
    contentType: 'application/json' as const,
    submit,
  };

  return BASE_SUBMIT_OPTIONS_FOR_ORDERING;
}

export function submitOptionsForOrdering_withNavigation(
  productId: string,
  submit: SubmitFunctionAbstraction['useSubmit'],
  navigation: Navigation
) {
  return {
    ...generateSubmitOptionsForOrdering(productId, submit),
    navigation,
  };
}

function submitOptionsForOrdering_withoutNavigation(
  productId: string,
  submit: SubmitFunctionAbstraction['useSubmit']
) {
  return { ...generateSubmitOptionsForOrdering(productId, submit) };
}

export function triggerCheckoutSessionCreation(
  productId: string,
  command: CreateCheckoutSessionCommand,
  submit: SubmitFunctionAbstraction['useSubmit']
) {
  const options = submitOptionsForOrdering_withoutNavigation(productId, submit);

  const { submitForm } = useSubmitFromReactRouter(options);
  const formattedData = formatDataIntoCreateCheckoutSessionRequestBody(command);

  submitForm(formattedData);
}

/*
    PENDING TRIGGERS ARE:
        triggerCheckoutSessionItemAppend
        triggerCheckoutSessionLock
*/

export function triggerOrderCreation(
  productId: string,
  command: CreateOrderFromCheckoutSessionCommand,
  submit: SubmitFunctionAbstraction['useSubmit']
) {
  const options = submitOptionsForOrdering_withoutNavigation(productId, submit);

  const { submitForm } = useSubmitFromReactRouter(options);
  const formattedData = formatDataIntoOrderCreationRequestBody(command);

  submitForm(formattedData);
}

/*
  TO TRIGGER SIGN-UP ACTION
*/
export function generateSubmitOptionsForSignUp(
  submit: SubmitFunctionAbstraction['useSubmit'],
  navigation: Navigation
) {
  return {
    method: 'POST' as const,
    action: `/login` as const,
    contentType: 'application/json' as const,
    submit,
    navigation,
  };
}
