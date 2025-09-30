export function AccountInfoForm({
  handleCustomerName,
  handleCustomerEmail,
  handleCustomerPass,
}: {
  handleCustomerName: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleCustomerEmail: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleCustomerPass: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className={'inputGroup'}>
      <span className={'formTitle'}>Account info</span>
      <span className={'inputLine'}>
        <div className={'inputLineLy'}>
          <span className="grid">
            <label className={'label'}>{'  '}First name</label>
            <input
              type="text"
              placeholder="First name"
              className={'input'}
              onChange={handleCustomerName}
            />
          </span>
          <span className="grid">
            <label className={'label'}>{'  '}Last name</label>
            <input type="text" placeholder="Last name" className={'input'} />
          </span>
        </div>
      </span>

      <span className={'inputLine'}>
        <label className={'label'}>{'  '}Email</label>
        <input
          type="email"
          placeholder="doe@example.com"
          className={'input'}
          onChange={handleCustomerEmail}
        />
      </span>

      <span className={'inputLine'}>
        <label className={'label'}>{'  '}Password</label>
        <input
          type="password"
          placeholder="S3CURE@PASSWORD"
          className={'input'}
          onChange={handleCustomerPass}
        />
      </span>

      <span className={'inputLine'}>
        <label className={'label'}>{'  '}Repeat your password</label>
        <input
          type="password"
          placeholder="S3CURE@PASSWORD"
          className={'input'}
        />
      </span>
    </div>
  );
}
