import classes from "../paginator.module.scss";

type PrivateProps = {
  className?: string;
  children: React.ReactNode;
};

export function Wrapper({ children, className = "" }: PrivateProps) {
  return <div className={`${classes.paginator} ${className}`}>{children}</div>;
}
