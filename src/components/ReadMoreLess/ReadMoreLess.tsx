import { useMemo } from "react";
import { useToggle } from "../../hooks/useToggle";
import useTranslation from "../../hooks/useTranslation";
import classes from "./read-more-less.module.scss";
import { findCharIndexesBetweenIndexes } from "@/lib/findCharBetweenIndexes";
import { callFnsInSequence } from "@/lib/callFnsInSequence";

type PrivateProps = {
  children: string;
  max: number;
  sideEffect?: (isShowFullText: boolean) => void;
  className?: string;
  style?: React.CSSProperties;
  highlightClassName?: string;
  highlightStyle?: React.CSSProperties;
  min?: number;
};

function ReadMoreLess({
  children,
  max,
  className = "",
  style = {},
  highlightClassName = "",
  highlightStyle = {},
  min = 0,
  sideEffect,
}: PrivateProps) {
  const [isShowFullText, toggleIsShowFullText] = useToggle();
  const t = useTranslation();
  const isNeeded = children.length > max;
  const shortText = useMemo(() => {
    const spaceIndexes =
      min >= max ? [] : findCharIndexesBetweenIndexes(children, " ", min, max);
    return children.slice(
      0,
      spaceIndexes.length ? spaceIndexes[spaceIndexes.length - 1] : max
    );
  }, [children, max, min]);

  const handleToggleIsShowFullText = sideEffect
    ? callFnsInSequence(toggleIsShowFullText, sideEffect)
    : toggleIsShowFullText;

  if (!isNeeded)
    return (
      <span
        className={`${classes["read-more-less"]}  ${className}`}
        style={style}
      >
        {children}
      </span>
    );

  return (
    <span
      className={`${classes["read-more-less"]}  ${className}`}
      style={style}
    >
      {isShowFullText ? children : shortText}
      <button onClick={handleToggleIsShowFullText.bind(null, !isShowFullText)}>
        {isShowFullText ? " " : "... "}
        <span
          className={`${classes.highlight} ${highlightClassName}`}
          style={highlightStyle}
        >
          {t(`general.${isShowFullText ? "read-less" : "read-more"}`)}
        </span>
      </button>
    </span>
  );
}
export default ReadMoreLess;
