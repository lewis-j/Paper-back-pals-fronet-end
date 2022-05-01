import React from "react";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";
import "./SearchPagination..scss";
import { useBSSizeFromWidth } from "../../../utilities/useBSSizeFromWidth";

const SearchPagination = ({
  setCurrentPage,
  currentPage,
  fetchMoreBooks,
  queryTitle,
}) => {
  const reactstrapBreakPointSize = useBSSizeFromWidth();

  const renderNewPage = (item) => {
    setCurrentPage(item);
  };

  const nextPage = () => {
    setCurrentPage((currentPage) =>
      currentPage === renderedPaginationItems.length - 1
        ? currentPage
        : currentPage + 1
    );
  };

  const renderedPaginationItems = [...Array(10).keys()].map((item) =>
    currentPage === item ? (
      <PaginationItem key={item} active>
        <PaginationLink tag="div" onClick={() => renderNewPage(item)}>
          {item + 1}
        </PaginationLink>
      </PaginationItem>
    ) : (
      <PaginationItem key={item}>
        <PaginationLink tag="div" onClick={() => renderNewPage(item)}>
          {item + 1}
        </PaginationLink>
      </PaginationItem>
    )
  );

  return (
    <div>
      <Pagination
        aria-label="Page navigation for Search"
        size={reactstrapBreakPointSize}
      >
        {/* <PaginationItem>
          <PaginationLink first href="#" />
        </PaginationItem> */}
        <PaginationItem>
          <PaginationLink
            tag="div"
            onClick={() =>
              setCurrentPage((currentPage) =>
                currentPage === 0 ? currentPage : currentPage - 1
              )
            }
            previous
          />
        </PaginationItem>
        {renderedPaginationItems}
        <PaginationItem>
          <PaginationLink tag="div" onClick={nextPage} next />
        </PaginationItem>
        {/* <PaginationItem>
          <PaginationLink
            tag="div"
            onClick={() => fetchMoreBooks(queryTitle, 120)}
            last
          />
        </PaginationItem> */}
      </Pagination>
    </div>
  );
};

export default SearchPagination;
