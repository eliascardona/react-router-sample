import { AccountInfoForm } from './account-info-form';

export function AccountInfo({ setActiveTab }: { setActiveTab: () => void }) {
  return (
    <div className={'containerLy'}>
      <AccountInfoForm setActiveTab={setActiveTab} />
      {/* billing UI will Render intaed the signup form, once user has created */}
    </div>
  );
}
