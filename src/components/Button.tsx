import { type ComponentPropsWithoutRef, forwardRef } from "react";

type Aspect = "contained" | "text" | "outlined";

type ButtonProps = ComponentPropsWithoutRef<"button"> & {
  aspect?: Aspect;
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, aspect, ...props }, ref) => {
    const aspectClass = (aspect?: Aspect) => {
      if (aspect == "text") {
        return "text-primary-40 bg-transparent dark:text-primary-80 dark:bg-transparent";
      }
      return "text-white bg-primary-40 dark:text-primary-20 dark:bg-primary-80";
    };

    return (
      <button
        className={`px-3 py-1 rounded-md font-bold ${aspectClass(aspect)}`}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  },
);

export default Button;
