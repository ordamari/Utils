import { useMemo, useState } from "react";
import { Item } from "./types/item.type";
import { TableKeys } from "./types/table-keys.type";
import classes from "./table.module.scss";
import TableHeader from "./components/TableHeader";
import TableBody from "./components/TableBody";
import useStaticPaginator from "./hooks/useStaticPaginator";
import Paginator from "../Paginator/Paginator";
import { StaticPaginatorOptions } from "./types/static-paginator-options.type";
import useRelativePaginator from "./hooks/useRelativePaginator";
import { RelativePaginatorOptions } from "./types/relative-paginator-options.type";
import { Sorts } from "./types/sorts.type";
import { SelectedSort } from "./types/selected-sort.type";
import { SortDirection } from "./enums/sort-direction.enum";

type PrivateProps<T extends Item> = {
  className?: string;
  data: T[];
  keys?: TableKeys<T>;
  staticPaginatorOptions?: StaticPaginatorOptions;
  relativePaginatorOptions?: RelativePaginatorOptions;
  sorts?: Sorts<T>;
};

function Table<T extends Item>({
  data,
  keys,
  className = "",
  staticPaginatorOptions,
  relativePaginatorOptions,
  sorts = {} as Sorts<T>,
}: PrivateProps<T>) {
  const renderedKeys = useMemo(() => {
    return keys
      ? keys
      : Object.keys(data[0] ?? {}).reduce((acc, key) => {
          const k = key as keyof T;
          acc[k] = key;
          return acc;
        }, {} as TableKeys<T>);
  }, [data, keys]);

  const [selectedSort, setSelectedSort] = useState<SelectedSort<T> | null>(
    null
  );

  const [relativePage, handleRelativePageChange] = useRelativePaginator(
    relativePaginatorOptions
  );

  const sortedData = useMemo(() => {
    if (!selectedSort) return data;
    const { key, direction } = selectedSort;
    const sortFn = sorts[key];
    if (!sortFn) return data;
    return [...data].sort(
      (a, b) =>
        sortFn(a[key], b[key]) *
        (direction === SortDirection.Ascending ? 1 : -1)
    );
  }, [data, selectedSort, sorts]);

  const [staticPage, handleStaticPageChange, staticPages, staticPageData] =
    useStaticPaginator(staticPaginatorOptions, sortedData);

  const pageData = useMemo(
    () => (staticPaginatorOptions ? staticPageData : sortedData),
    [staticPaginatorOptions, sortedData, staticPageData]
  );

  return (
    <div className={`${classes["table-container"]} ${className}`}>
      <table>
        <TableHeader
          selectedSort={selectedSort}
          setSelectedSort={setSelectedSort}
          sorts={sorts}
          keys={renderedKeys}
        />
        <TableBody data={pageData} keys={renderedKeys} />
      </table>
      {staticPaginatorOptions && (
        <Paginator
          handlePageChange={handleStaticPageChange}
          page={staticPage}
          pages={staticPages}
          className={staticPaginatorOptions.className}
          pageButtonClassName={staticPaginatorOptions.pageButtonClassName}
        />
      )}

      {relativePaginatorOptions && (
        <Paginator
          handlePageChange={handleRelativePageChange}
          page={relativePage}
          pages={relativePaginatorOptions.pages}
          className={relativePaginatorOptions.className}
          pageButtonClassName={relativePaginatorOptions.pageButtonClassName}
        />
      )}
    </div>
  );
}

export default Table;
