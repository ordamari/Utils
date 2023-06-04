import { useCallback, useEffect, useState } from "react";
import classes from "./paginator.module.scss";
import PageButton from "./components/PageButton";
import { Spacer } from "./components/Spacer";
import { Wrapper } from "./components/Wrapper";
type PrivateProps = {
  className?: string;
  pageButtonClassName?: string;
  pages: number;
  page: number;
  handlePageChange: (page: number) => void;
};

function Paginator({
  page: selectedPage,
  pages,
  handlePageChange,
  className = "",
  pageButtonClassName = "",
}: PrivateProps) {
  if (pages <= 1) return null;
  if (pages <= 7)
    return (
      <Wrapper className={className}>
        {Array.from(Array(pages).keys()).map((page) => (
          <PageButton
            key={page}
            onClick={handlePageChange}
            className={pageButtonClassName}
            page={page}
            selectedPage={selectedPage}
          />
        ))}
      </Wrapper>
    );
  if (selectedPage > 3 && selectedPage < pages - 4)
    return (
      <Wrapper className={className}>
        <PageButton
          page={0}
          selectedPage={selectedPage}
          onClick={handlePageChange}
          className={pageButtonClassName}
        />
        <Spacer />
        {Array.from(Array(5).keys()).map((index) => {
          const page = selectedPage - 2 + index;
          return (
            <PageButton
              page={page}
              selectedPage={selectedPage}
              onClick={handlePageChange}
              key={page}
              className={pageButtonClassName}
            />
          );
        })}
        <Spacer />
        <PageButton
          page={pages - 1}
          selectedPage={selectedPage}
          onClick={handlePageChange}
          className={pageButtonClassName}
        />
      </Wrapper>
    );
  if (selectedPage <= 3)
    return (
      <Wrapper className={className}>
        {Array.from(Array(selectedPage + 3).keys()).map((page) => (
          <PageButton
            key={page}
            onClick={handlePageChange}
            className={pageButtonClassName}
            page={page}
            selectedPage={selectedPage}
          />
        ))}
        <Spacer />
        <PageButton
          page={pages - 1}
          selectedPage={selectedPage}
          onClick={handlePageChange}
          className={pageButtonClassName}
        />
      </Wrapper>
    );
  if (selectedPage >= pages - 4)
    return (
      <Wrapper className={className}>
        <PageButton
          page={0}
          selectedPage={selectedPage}
          onClick={handlePageChange}
          className={pageButtonClassName}
        />
        <Spacer />
        {Array.from(Array(pages - selectedPage + 2).keys()).map((index) => {
          const page = selectedPage - 2 + index;
          return (
            <PageButton
              page={page}
              selectedPage={selectedPage}
              onClick={handlePageChange}
              key={page}
              className={pageButtonClassName}
            />
          );
        })}
      </Wrapper>
    );
}
export default Paginator;
