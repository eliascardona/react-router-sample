import type { Route } from './+types/course.$productId.thanks';

export function meta(args: Route.MetaArgs) {
  return [
    { title: 'Administración básica de una B.D. NO SQL' },
    {
      name: 'description',
      content: 'Coloca una descripción útil para las búsquedas de Google',
    },
  ];
}

export default function ThankYouPage() {
  return (
    <div className="pt-8 pl-8 text-2xl font-medium">
      thanks for your preference!
    </div>
  );
}
