import classes from "../paginator.module.scss";
type PrivateProps = {
  page: number;
  selectedPage: number;
  className?: string;
  onClick?: (page: number) => void;
};
function PageButton({
  page,
  selectedPage,
  onClick = () => {},
  className = "",
}: PrivateProps) {
  return (
    <button
      className={`${classes["page-button"]} ${
        page === selectedPage ? classes.curr : ""
      }`}
      onClick={onClick.bind(null, page)}
    >
      {page + 1}
    </button>
  );
}

export default PageButton;
