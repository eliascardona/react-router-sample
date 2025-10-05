import { Button } from '~/components/ui/button';

export function GenericHeader() {
  return (
    <div className="w-full rounded-md shadow-md">
      <div className="flex justify-between p-4">
        <h2 className="text-lg font-bold italic">Logotype</h2>
        <div className="flex">
          <Button type="button">Login</Button>
          <Button type="button" variant="outline">
            Sign up
          </Button>
        </div>
      </div>
    </div>
  );
}
