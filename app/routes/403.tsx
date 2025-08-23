import { Home, Shield } from 'lucide-react';
import { Link } from 'react-router';

// export async function loader(args: Route.LoaderArgs) {
//   const store = getGlobalStorage();
//   const accessToken = store.accessToken;

//   if (!accessToken) {
//     throw new Error("Acceso denegado");
//   }
// }

export default function AccesoDenegado() {
  return (
    <div className="bg-background flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md space-y-8 text-center">
        <div className="flex justify-center">
          <Shield className="text-muted-foreground h-12 w-12" strokeWidth={1} />
        </div>

        <div className="space-y-3">
          <h1 className="text-foreground text-2xl font-light">
            Acceso Restringido
          </h1>
          <p className="text-muted-foreground text-sm leading-relaxed">
            No tienes los permisos necesarios para acceder a esta página
          </p>
        </div>

        <div className="space-y-3 pt-4">
          <Link
            to="/"
            className="text-primary-foreground bg-primary hover:bg-primary/90 focus:ring-ring inline-flex w-full items-center justify-center px-6 py-3 text-sm font-medium transition-colors duration-200 focus:ring-2 focus:ring-offset-2 focus:outline-none">
            <Home className="mr-2 h-4 w-4" strokeWidth={1.5} />
            Volver al Inicio
          </Link>
        </div>
      </div>
    </div>
  );
}
