import React from "react";
import { CardBody, Card as ReactstrapCard } from "reactstrap";

type CardProps = React.ComponentProps<typeof ReactstrapCard>;

function Card({ className, ...props }: CardProps) {
  return (
    <ReactstrapCard
      className={`d-flex flex-column gap-3 rounded border ${className || ""}`}
      {...props}
    />
  );
}

type CardContentProps = React.ComponentProps<typeof CardBody>;

function CardContent({ className, ...props }: CardContentProps) {
  return (
    <CardBody
      data-slot="card-content"
      className={`px-4 ${className || ""}`}
      {...props}
    />
  );
}

export {Card, CardContent};
