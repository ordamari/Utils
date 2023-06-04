import { useMemo } from "react";
import { useToggle } from "../../hooks/useToggle";
import useTranslation from "../../hooks/useTranslation";
import classes from "./read-more-less.module.scss";
import { findCharIndexesBetweenIndexes } from "@/lib/findCharBetweenIndexes";
import { callFnsInSequence } from "@/lib/callFnsInSequence";

type ReadMoreLessOptions = {
  limit?: number;
  minCharacter?: number;
};

type PrivateProps = {
  children: string;
  className?: string;
  style?: React.CSSProperties;
  highlightClassName?: string;
  highlightStyle?: React.CSSProperties;
  options?: ReadMoreLessOptions;
  sideEffect?: (isShowFullText: boolean) => void;
};

const initialOptions = {
  limit: 300,
  min: 0,
};

function ReadMoreLess({
  children,
  className = "",
  style = {},
  highlightClassName = "",
  highlightStyle = {},
  options = {},
  sideEffect,
}: PrivateProps) {
  const { limit, min } = { ...initialOptions, ...options };
  const [isShowFullText, toggleIsShowFullText] = useToggle();
  const t = useTranslation();
  const isNeeded = children.length > limit;
  const shortText = useMemo(() => {
    const spaceIndexes =
      min >= limit
        ? []
        : findCharIndexesBetweenIndexes(children, " ", min, limit);
    return children.slice(
      0,
      spaceIndexes.length ? spaceIndexes[spaceIndexes.length - 1] : limit
    );
  }, [children, limit, min]);

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
