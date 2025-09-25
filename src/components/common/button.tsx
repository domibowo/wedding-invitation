import * as React from "react";
import { Slot } from "@radix-ui/react-slot";

const baseButtonClasses = `
  inline-flex items-center justify-center gap-2 whitespace-nowrap
  rounded-md text-sm font-medium transition-all
  disabled:pointer-events-none disabled:opacity-50
  outline-none
  [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4
  shrink-0 [&_svg]:shrink-0
  focus-visible:ring-2 focus-visible:ring-offset-2
`;

const variantClasses: Record<string, string> = {
  default: "bg-[hsl(var(--blue-9))] hover:bg-[hsl(var(--blue-10))]",
  destructive:
    "bg-[hsl(var(--red-9))] hover:bg-[hsl(var(--red-10))] " +
    "focus-visible:ring-[hsl(var(--red-7))]",
  outline:
    "border border-[hsl(var(--gray-7))] bg-white text-[hsl(var(--gray-12))] " +
    "hover:bg-[hsl(var(--gray-3))]",
  secondary:
    "bg-[hsl(var(--gray-4))] text-[hsl(var(--gray-12))] hover:bg-[hsl(var(--gray-5))]",
  ghost: "hover:bg-[hsl(var(--gray-3))] text-[hsl(var(--gray-12))]",
  link: "text-[hsl(var(--blue-11))] underline-offset-4 hover:underline",
};

const sizeClasses: Record<string, string> = {
  default: "h-9 px-4 py-2 has-[>svg]:px-3",
  sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
  lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
  icon: "size-9 rounded-md",
};

type ButtonProps = React.ComponentProps<"button"> & {
  variant?: keyof typeof variantClasses;
  size?: keyof typeof sizeClasses;
  asChild?: boolean;
};

function Button({
  className = "",
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={`${baseButtonClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...props}
    />
  );
}

export { Button };
