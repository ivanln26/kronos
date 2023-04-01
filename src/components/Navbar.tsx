import Link from "next/link";

const Navbar = () => {
  return (
    <div className="flex justify-between p-2 rounded-b-lg">
      <Link
        href="/"
        className="text-4xl text-primary-40 dark:text-primary-80 font-bold align-middle select-none"
      >
        kronos
      </Link>
    </div>
  );
};

export default Navbar;
