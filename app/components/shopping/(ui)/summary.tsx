import { useLoaderData } from 'react-router';
import type { PriceSearchResult } from '~/lib/shopping/types';
import type { loader } from '~/routes/course.$productId.checkout';
import { FormattedAmount } from './formatted-amount';

const splitPrice = (chargeInfoTemp: PriceSearchResult) => {
  let realUnitAmount = chargeInfoTemp.unitAmount / 100;
  let initialUnitAmount = (chargeInfoTemp.unitAmount / 100) * 0.84;
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

export function ProductPriceSummary() {
  const { chargeInfo } = useLoaderData<typeof loader>();
  const priceFields = splitPrice(chargeInfo);

  return (
    <div className={'grid w-[88%] gap-2'}>
      <span className={'hgLy'}>
        {/* logo of the company */}
        <h2 className="text-3xl font-bold italic">Logotype</h2>
        {/* pricing blocks */}
        <span className={'hgPricingLy'}>
          {priceFields.finalAmount && (
            <span className={'lgFont'}>{priceFields.finalAmount}</span>
          )}
          <span className={'superIndex'}>
            <span>
              <span style={{ visibility: 'hidden' }}>.</span>
              <strong>{chargeInfo?.currency}</strong>
            </span>
          </span>
        </span>
      </span>
      <span>
        {priceFields.finalAmount && (
          <>
            <FormattedAmount
              featureName={'Main product'}
              unitAmount={priceFields.parsedAmount}
            />
            <FormattedAmount
              featureName={'Second product'}
              unitAmount={'0.00'}
            />
            <FormattedAmount
              featureName={'Complementary'}
              unitAmount={'0.00'}
            />
            <FormattedAmount featureName={'Free-upsell'} unitAmount={'0.00'} />
            <FormattedAmount
              featureName={'Subtotal'}
              unitAmount={priceFields.parsedAmount}
              bold={true}
            />
            <hr style={{ width: '85%' }} />
            <FormattedAmount
              featureName={'VAT (16%)'}
              unitAmount={priceFields.taxFmt}
            />
            <hr style={{ width: '85%' }} />
            <FormattedAmount
              featureName={'TOTAL'}
              unitAmount={priceFields.finalAmount}
              bold={true}
            />
          </>
        )}
      </span>
    </div>
  );
}
