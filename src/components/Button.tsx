import { type ComponentPropsWithoutRef, forwardRef } from "react";

type Aspect = "contained" | "text" | "outlined";

type Size = "small" | "medium" | "large";

type ButtonProps = ComponentPropsWithoutRef<"button"> & {
  aspect?: Aspect;
  size?: Size;
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, aspect, size, ...props }, ref) => {
    const className = () => {
      let cls = "px-3 py-1 rounded-md font-bold";
      if (aspect == "text") {
        cls +=
          " text-primary-40 bg-transparent dark:text-primary-80 dark:bg-transparent";
      } else {
        cls +=
          " text-white bg-primary-40 dark:text-primary-20 dark:bg-primary-80";
      }
      if (size == "large") {
        cls +=
          " md:px-4 lg:px-5 md:py-2 lg:py-3 md:text-2xl lg:text-4xl lg:rounded-xl";
      } else if (size == "medium") {
        cls += " md:px-4 md:py-1 md:text-lg";
      }
      return cls;
    };

    return (
      <button
        {...props}
        className={`${className()} ${props.className}`}
        ref={ref}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";

export default Button;
