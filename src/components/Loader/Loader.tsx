import classes from "./loader.module.scss";

function Loader() {
  return (
    <div className={`${classes.loader}`}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}

export default Loader;
