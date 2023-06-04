export type StaticPaginatorOptions = {
  itemsPerPage: number;
  page?: number;
  handlePageChange?: (page: number) => void;
  className?: string;
  pageButtonClassName?: string;
};
