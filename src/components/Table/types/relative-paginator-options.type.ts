export type RelativePaginatorOptions = {
  pages: number;
  handlePageChange: (page: number) => void | Promise<void>;
  page?: number;
  className?: string;
  pageButtonClassName?: string;
};
