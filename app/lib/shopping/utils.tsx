import { toast } from 'sonner';

export async function shoppingServerActionResultHandler(
  serverActionResult: any
) {
  const resultType = serverActionResult.type;
  if (!resultType) return null;

  switch (resultType) {
    case 'SIGNUP': {
      toast.success('', {
        description: serverActionResult.message,
      });
    }

    case 'PAYMENT_INTENT': {
      toast.success('', {
        description: serverActionResult.message,
      });
    }

    default:
      toast.info("We didn't recieve any server action result");
  }
}
