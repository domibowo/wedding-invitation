import React from "react";
import { Button as ReactstrapButton } from "reactstrap";

type Variant = "primary" | "secondary" | "danger" | "outline" | "link";
type Size = "sm" | "lg" | "default";

interface Props extends React.ComponentProps<typeof ReactstrapButton> {
  variant?: Variant;
  size?: Size;
  asChild?: boolean; // keep API similar if needed
}

function Button({
  className,
  variant = "primary",
  size = "default",
  asChild = false,
  ...props
}: Props) {
  return (
    <ReactstrapButton
      data-slot="button"
      color={variant === "danger" ? "danger" : variant}
      size={size === "default" ? undefined : size}
      className={className}
      {...props}
    />
  );
}

export { Button };
