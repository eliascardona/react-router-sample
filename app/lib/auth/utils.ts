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
