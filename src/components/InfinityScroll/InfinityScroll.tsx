import { useToggle } from "@/hooks/useToggle";
import { useCallback, useRef, useState } from "react";
import Loader from "../Loader/Loader";

export type InfinityScrollProps = {
  children: React.ReactNode;
  isHasMore: boolean;
  load: () => void | Promise<void>;
  loader?: React.ReactNode;
  errorComponent?: React.ReactNode;
};

function InfinityScroll({
  children,
  isHasMore,
  load,
  loader = <Loader />,
  errorComponent = <span>error click here to try again</span>,
}: InfinityScrollProps) {
  const [isLoad, toggleIsLoad] = useToggle();
  const [error, setError] = useState<Error | null>(null);
  const observer = useRef<IntersectionObserver>();

  const onLoad = useCallback(async () => {
    if (!isHasMore || error || isLoad) return;
    try {
      toggleIsLoad(true);
      await load();
      toggleIsLoad(false);
    } catch (e: any) {
      setError(e);
    }
  }, [isLoad, isHasMore, error, load, toggleIsLoad]);

  const endElementRef = useCallback(
    (node: any) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && isHasMore) {
          onLoad();
        }
      });
      if (node) observer.current.observe(node);
    },
    [isHasMore, onLoad]
  );
  return (
    <>
      {children}
      {!error && (
        <div style={{ paddingBottom: 1, paddingTop: 1 }} ref={endElementRef} />
      )}
      {(isLoad || isHasMore) && !error && loader}
      {error && <div onClick={setError.bind(null, null)}>{errorComponent}</div>}
    </>
  );
}
export default InfinityScroll;
