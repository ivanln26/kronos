import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import Button from "./Button";

const Navbar = () => {
  const { data: session } = useSession();

  return (
    <div className="flex justify-between p-2 rounded-b-lg">
      <Link
        href="/"
        className="text-4xl text-primary-40 dark:text-primary-80 font-bold align-middle select-none"
      >
        kronos
      </Link>
      {session == null
        ? <Button onClick={() => signIn()}>Iniciar Sesión</Button>
        : <Button onClick={() => signOut()}>Cerrar Sessión</Button>}
    </div>
  );
};

export default Navbar;
