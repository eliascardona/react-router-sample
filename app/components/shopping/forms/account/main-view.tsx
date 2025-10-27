import { Button } from '~/components/ui/button';
import { AccountInfoForm } from './account-info-form';

export function AccountInfo({
  onClick
}: {
  onClick: () => void;
}) {
  return (
    <div className={'containerLy'}>
      <Button type='button' onClick={onClick}>
        iniciar PKCE
      </Button>
      {/* <AccountInfoForm /> */}
      {/* billing UI will Render intaed the signup form, once user has created */}
    </div>
  );
}
