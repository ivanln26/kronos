import { useState } from "react";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

import Button from "./Button";

const Navbar = () => {
  const { data: session, status } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex justify-between items-end p-2 rounded-b-lg">
      <Link
        href="/"
        className="text-4xl text-primary-40 dark:text-primary-80 font-bold align-middle select-none"
      >
        kronos
      </Link>
      {status === "loading"
        ? <Button className="w-48 animate-pulse" size="medium">...</Button>
        : status === "unauthenticated" || session === null
        ? <Button onClick={() => signIn()} size="medium">Iniciar Sesión</Button>
        : (
          <div>
            <Button onClick={() => setIsOpen((prev) => !prev)} size="medium">
              {session.user.name}
            </Button>
            <ul
              className={`${
                isOpen ? "block" : "hidden"
              } absolute mt-2 px-2 py-1 w-52 md:w-80 right-2 z-10 rounded-xl text-base md:text-lg bg-primary-99 bg-gradient-to-r from-primary-40/[.10] to-primary-40/[.10] dark:bg-neutral-10 dark:from-primary-80/[.10] dark:to-primary-80/[.10]`}
            >
              <li>
                <Link href="/" className="block px-1 py-2">Horarios</Link>
              </li>
              {session.user.role === "admin" && (
                <>
                  <li>
                    <Link href="/admin" className="block px-1 py-2">
                      Administrador
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="https://kronos-reports-production.up.railway.app"
                      className="block px-1 py-2"
                    >
                      Reportes
                    </Link>
                  </li>
                </>
              )}
              <li>
                <button className="block px-1 py-2" onClick={() => signOut()}>
                  Cerrar Sesión
                </button>
              </li>
            </ul>
          </div>
        )}
    </div>
  );
};

export default Navbar;
