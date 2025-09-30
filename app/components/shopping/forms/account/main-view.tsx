import { CustomerContext } from '@/lib/contexts/payments/CustomerContext';
import { createAccount, updateAccountOnDB } from '@/lib/utils/utils';
import { useContext, useMemo, useState } from 'react';
import { AccountInfoForm } from './account-info-form';

export function AccountInfo({ setActiveTab }: any) {
  const { setcustomerFromCtx } = useContext(CustomerContext);
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [pass, setPass] = useState('');
  let customerPayload = { customerEmailRefer: '', customerNameRefer: '' };

  const memoizedCustomer = useMemo(() => {
    customerPayload = {
      customerEmailRefer: customerEmail,
      customerNameRefer: customerName,
    };

    return customerPayload;
  }, [customerEmail, customerName]);

  const handleCreateAccount = async () => {
    try {
      await createAccount(customerEmail, customerName, pass);

      const r = await fetch('/api/stripe/customer/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(memoizedCustomer),
      });

      const j = await r.json();
      const load = j.responsePayload;

      if (typeof load.stripeCustomerId === 'string') {
        setcustomerFromCtx({
          customerId: load.stripeCustomerId,
        });
        await updateAccountOnDB(customerEmail, load.stripeCustomerId);
      }
      if (typeof load.stripeCustomerId === 'string') {
        setActiveTab(2);
      }
    } catch (error) {
      console.error("err handling account's core: ", error);
    }
  };

  return (
    <div className={'containerLy'}>
      <AccountInfoForm
        handleCustomerName={(e) => {
          setCustomerName(e.target.value);
        }}
        handleCustomerEmail={(e) => {
          setCustomerEmail(e.target.value);
        }}
        handleCustomerPass={(e) => {
          setPass(e.target.value);
        }}
      />
      <span className={'centerItem'}>
        <button
          type="button"
          className={'formBtn'}
          onClick={(e) => {
            e.preventDefault();
            handleCreateAccount();
          }}>
          Proceed to payment
        </button>
      </span>
      {/* billing UI will Render intaed the signup form, once user has created */}
    </div>
  );
}
