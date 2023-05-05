import { ComponentPropsWithoutRef, forwardRef, useState } from "react";

export type DropdownItem = {
  name: string;
  fn: () => void;
};

type DropdownProps = ComponentPropsWithoutRef<"button"> & {
  items: DropdownItem[];
};

const Dropdown = forwardRef<HTMLButtonElement, DropdownProps>((props, ref) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className="relative inline-block">
      <div>
        <button
          className="inline-flex w-full justify-center gap-x-1.5 px-3 py-2 rounded-md inline-flex w-full"
          onClick={() => setIsOpen((prev) => !prev)}
          ref={ref}
          type="button"
        >
          <svg
            className="w-4 h-4 md:w-8 md:h-8"
            fill="currentColor"
            viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
          </svg>
        </button>
      </div>

      <div
        className={`${
          isOpen ? "absolute" : "hidden"
        } right-0 z-10 mt-2 w-56 rounded-md origin-top-right bg-gradient-to-r bg-primary-99 from-primary-40/[.12] to-primary-40/[.12] dark:bg-neutral-10 dark:from-primary-80/[.12] dark:to-primary-80/[.12]`}
        role="menu"
      >
        <div className="py-1">
          {props.items.map((item, i) => (
            <button
              key={i}
              className="text-left w-full px-4 py-2"
              onClick={item.fn}
            >
              {item.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
});

Dropdown.displayName = "Dropdown";

export default Dropdown;
