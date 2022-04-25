import Link from "next/link";

const Navbar = () => {
  return (
    <div className="flex justify-between p-2 rounded-b-lg">
      <Link href="/">
        <a className="text-4xl text-blue-600 dark:text-blue-500 font-bold align-middle">
          kronos
        </a>
      </Link>
    </div>
  );
};

export default Navbar;
