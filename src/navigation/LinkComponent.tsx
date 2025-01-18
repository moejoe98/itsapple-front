import "react-responsive-carousel/lib/styles/carousel.min.css";
import { ReactNode } from "react";
import { Link } from "@mui/material";

const ReplyLink = ({
  to,
  children,
  newPage,
}: {
  to: string;
  children: ReactNode;
  newPage?: boolean;
}) => {
  return (
    <Link
      target={newPage === true ? "_blank" : ""}
      href={to}
      style={{
        cursor: "pointer",
        textDecoration: "none",
        width: "100%",
        color: "inherit",
      }}
    >
      {children}
    </Link>
  );
};

export default function LinkComponent({
  to,
  children,
  newPage,
}: {
  to: string;
  children: ReactNode;
  newPage?: boolean;
}) {
  return (
    <ReplyLink to={to} newPage={newPage}>
      {children}
    </ReplyLink>
  );
}
