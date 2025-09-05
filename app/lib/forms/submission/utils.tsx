import {
  useNavigation,
  useSubmit,
  type FormEncType,
  type HTMLFormMethod,
} from 'react-router';

type SubmissionOptions = {
  action?: string;
  method?: HTMLFormMethod;
  contentType?: string;
  onError?: (error: unknown) => void;
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
    const submitMethod = method as HTMLFormMethod;
    const submitAction = action;
    const submitContentType = contentType as FormEncType;

    try {
      await submit(data, {
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
