import { useCallback, useEffect, useMemo, useState } from "react";
import { StaticPaginatorOptions } from "../types/static-paginator-options.type";

function useStaticPaginator<T>(
  staticPaginatorOptions: StaticPaginatorOptions | undefined,
  data: T[]
) {
  const [page, setPage] = useState(0);

  const pages = useMemo(
    () => Math.ceil(data.length / (staticPaginatorOptions?.itemsPerPage ?? 1)),
    [data, staticPaginatorOptions?.itemsPerPage]
  );

  const isControlled = useMemo(
    () =>
      staticPaginatorOptions?.page !== undefined &&
      staticPaginatorOptions?.handlePageChange !== undefined,
    [staticPaginatorOptions]
  );

  const currentPage = useMemo(
    () => (isControlled ? staticPaginatorOptions?.page ?? 0 : page),
    [page, staticPaginatorOptions, isControlled]
  );

  const handlePageChange = useCallback(
    (page: number) => {
      if (isControlled && staticPaginatorOptions?.handlePageChange) {
        staticPaginatorOptions.handlePageChange(page);
      } else {
        setPage(page);
      }
    },
    [isControlled, staticPaginatorOptions]
  );

  const pageData = useMemo(() => {
    const itemsPerPage = staticPaginatorOptions?.itemsPerPage ?? 1;
    return data.slice(
      currentPage * itemsPerPage,
      (currentPage + 1) * itemsPerPage
    );
  }, [data, currentPage, staticPaginatorOptions]);

  useEffect(() => {
    handlePageChange(0);
  }, [data, handlePageChange]);

  return [currentPage, handlePageChange, pages, pageData] as const;
}
export default useStaticPaginator;
