import {
  useNavigation,
  useSubmit,
  type FormEncType,
  type HTMLFormMethod,
  type SubmitOptions,
  type SubmitTarget,
} from 'react-router';
import type { SignupRequestBody } from '~/lib/shopping/types';

export type SubmissionOptions = {
  action?: string;
  method?: HTMLFormMethod;
  contentType?: string;
  onError?: (error: unknown) => void;
  submit?: (target: SubmitTarget, options?: SubmitOptions) => Promise<void>;
};

export function useSubmitFromReactRouter({
  action,
  method = 'post',
  contentType = 'application/json',
  onError,
}: SubmissionOptions) {
  const submit = useSubmit();
  const navigation = useNavigation();

  const submitForm = async (formValues: any) => {
    const data = { ...formValues };

    const signupPayload: SignupRequestBody = {
      intent: 'SIGNUP',
      body: {
        email: data.email,
        password: data.password,
        username: data.username
      }
    }
    console.log(signupPayload);

    const submitMethod = method as HTMLFormMethod;
    const submitAction = action;
    const submitContentType = contentType as FormEncType;

    try {
      await submit(signupPayload, {
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
