import React from "react";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";
import styles from "./SearchPagination.module.scss";
import "./SearchPagination.scss";
import { useBSSizeFromWidth } from "../../../utilities/getBSSizeFromWidth";
import { useDispatch, useSelector } from "react-redux";
import { getMoreBooks } from "../../../features/search";

const SearchPagination = ({ setCurrentPage, currentPage, scroll }) => {
  const reactstrapBreakPointSize = useBSSizeFromWidth();

  const { bookResults } = useSelector((state) => state.searchResults);
  const dispatch = useDispatch();
  const pages = bookResults.results.length;

  const checkForAvailableBooks = async (pageNum) => {
    if (pages - 1 < pageNum) {
      const dif = pageNum - (pages - 1);
      const calls = Math.ceil(dif / 3);
      [...Array(calls).keys()].forEach(async (i) => {
        const _startIndex = pages * 12 + i * 36;
        await dispatch(getMoreBooks({ startIndex: _startIndex })).unwrap();
      });
    }
  };

  const renderNewPage = async (item) => {
    await checkForAvailableBooks(item);
    setCurrentPage(item);
  };

  const nextPage = async () => {
    if (pages - 1 === currentPage) {
      await dispatch(getMoreBooks({ startIndex: currentPage * 12 })).unwrap();
    }

    setCurrentPage((currentPage) => {
      return currentPage === renderedPaginationItems.length - 1
        ? currentPage
        : currentPage + 1;
    });
    scroll();
  };

  const renderedPaginationItems = [...Array(10).keys()].map((item) => (
    <PaginationItem key={item} active={currentPage === item}>
      <PaginationLink
        className={styles.paginationLink}
        tag="div"
        onClick={() => {
          renderNewPage(item);
        }}
      >
        {item + 1}
      </PaginationLink>
    </PaginationItem>
  ));

  return (
    <div className={styles.container}>
      <Pagination
        aria-label="Page navigation for Search"
        size={reactstrapBreakPointSize}
      >
        <PaginationItem>
          <PaginationLink
            className={styles.paginationLink}
            tag="div"
            onClick={() => {
              setCurrentPage((currentPage) =>
                currentPage === 0 ? currentPage : currentPage - 1
              );
              scroll();
            }}
            previous
          />
        </PaginationItem>
        {renderedPaginationItems}
        <PaginationItem>
          <PaginationLink
            tag="div"
            onClick={nextPage}
            next
            className={styles.paginationLink}
          />
        </PaginationItem>
      </Pagination>
    </div>
  );
};

export default SearchPagination;
