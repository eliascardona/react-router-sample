import { Button } from '~/components/ui/button';
import {
  getProductIdFromPathname,
  useServerActionTrigger,
} from '~/lib/utils/utils';

export function AccountInfoForm() {
  const { triggerAction } = useServerActionTrigger();
  const productId = getProductIdFromPathname();

  const triggerOptions = {
    method: 'POST' as const,
    action: `/course/${productId}/checkout`,
    encType: 'application/json' as const,
  };

  const generateRequestBody = (target: any) => ({
    username: target.name.value,
    email: target.email.value,
    password: target.password.value,
  });

  return (
    <form
      onSubmit={(e) => {
        if (e.currentTarget) {
          console.log('soy current one');          
          e.currentTarget.preventDefault();
          triggerAction(generateRequestBody(e.currentTarget), triggerOptions);
        }
        console.log('soy anriguo');
        e.preventDefault();
        triggerAction(generateRequestBody(e.target), triggerOptions);
      }}>
      <div className={'inputGroup'}>
        <span className={'formTitle'}>Account info</span>
        <span className={'inputLine'}>
          <div className={'inputLineLy'}>
            <span className="grid">
              <label className={'label'}>{'  '}First name</label>
              <input
                type="text"
                name="name"
                placeholder="First name"
                className={'input'}
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
            name="email"
            placeholder="doe@example.com"
            className={'input'}
          />
        </span>

        <span className={'inputLine'}>
          <label className={'label'}>{'  '}Password</label>
          <input
            type="password"
            name="password"
            placeholder="S3CURE@PASSWORD"
            className={'input'}
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
        <Button>Proceed to payment</Button>
      </div>
    </form>
  );
}
