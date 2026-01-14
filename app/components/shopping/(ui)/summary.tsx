import { useLoaderData } from 'react-router';
import type { ChargeInfoDto } from '~/lib/shopping/types';
import { splitPrice } from '~/lib/shopping/utils';
import type { loader } from '~/routes/course.$productId.checkout';
import { FormattedAmount } from './formatted-amount';

export function ProductPriceSummary() {
  const { chargeInfo } = useLoaderData<typeof loader>();

  if (!chargeInfo) {
    return <>loading pricing information...</>;
  }

  return <ProductPriceSummaryContents chargeInfo={chargeInfo} />;
}

function ProductPriceSummaryContents({
  chargeInfo,
}: {
  chargeInfo: ChargeInfoDto;
}) {
  const priceFields = splitPrice(chargeInfo);

  return (
    <div className={'grid gap-2'}>
      <span className={'hgLy'}>
        {/* logo of the company */}
        <h2 className="text-2xl font-bold italic">Logotype</h2>
        {/* product overview */}
        <h3 className="text-xl font-medium">You're about to buy:</h3>
        <h2 className="text-3xl font-bold italic">PRODUCT NAME</h2>
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
            <FormattedAmount featureName={'Complement'} unitAmount={'0.00'} />
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
