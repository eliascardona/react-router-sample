import {
  useNavigation,
  useSubmit,
  type FormEncType,
  type HTMLFormMethod,
} from 'react-router';
import type { SubmissionOptions } from '../forms/submission/utils';
import { ShoppingActionEnum, type SignupRequestBody } from '../shopping/types';

export function triggerSignUp({
  action,
  method = 'post',
  contentType = 'application/json',
  onError,
}: SubmissionOptions) {
  const submit = useSubmit();
  const navigation = useNavigation();

  /**
   * It's mandatory to wrap this callback with the
   * _handleSubmit_ function of React Hook Form as it 
   * provides all values for the fields that were marked as required
   * at the moment of the submission.
   * Also is highly recommended to use this function alongside a server action handler, that's to say:
   * It's needed to write a server or client action to receive the request
   * It won't make sense to write an action to handle the request if the response of the action
   * is not properly handled in the frontend component.
   * 
   * Often, the component responsible for the handling of the action response is the _Owner Component_
   * of the form that triggered this function.
   * 
   * @param {object} formValues form values provided by the _handleSubmit_ function of RHF library
   * 
   */
  const submitForm = async (formValues: any) => {
    const data = { ...formValues };
    console.log('SignUp data submitted to backend is ', data);

    const submitMethod = method as HTMLFormMethod;
    const submitAction = action;
    const submitContentType = contentType as FormEncType;

    const signupRequestBody: SignupRequestBody = {
      intent: ShoppingActionEnum.enum.SIGNUP,
      body: {
        username: data.username,
        email: data.email,
        password: data.password,
      },
    };

    try {
      await submit(signupRequestBody, {
        method: submitMethod,
        action: submitAction,
        encType: submitContentType,
      });
    } catch (error: any) {
      onError?.(error.message);
      throw new Error(error.message);
    }
  };

  return {
    isSubmitting: navigation.state === 'submitting',
    submitForm,
  };
}
