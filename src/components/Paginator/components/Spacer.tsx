import classes from "../paginator.module.scss";

type PrivateProps = {
  className?: string;
};

export function Spacer({ className = "" }: PrivateProps) {
  return (
    <span className={`${classes.spacer} ${className}`}>&#183;&#183;&#183;</span>
  );
}
