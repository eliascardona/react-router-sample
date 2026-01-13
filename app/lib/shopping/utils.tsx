import { toast } from 'sonner';
import { type ChargeInfoDto } from '../shopping/types';

export const splitPrice = (chargeInfo: ChargeInfoDto) => {
  let realUnitAmount = chargeInfo.unitAmount / 100;
  let initialUnitAmount = (chargeInfo.unitAmount / 100) * 0.84;
  let tax = initialUnitAmount * 0.16;
  let taxFmt = tax.toPrecision(2);

  let parsedAmount = initialUnitAmount.toString();
  let finalAmount = realUnitAmount.toString();

  const priceFmt = {
    parsedAmount: parsedAmount,
    finalAmount: finalAmount,
    taxFmt: taxFmt,
  };

  return priceFmt;
};

export async function resultHandlerForShoppingServerAction(
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
