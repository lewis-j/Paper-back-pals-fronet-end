import { Children, isValidElement } from "react";
import { useState } from "react";
import { useRef } from "react";
import { Container, Row } from "reactstrap";
import SearchPagination from "../../../../pages/SearchResults/SearchPagination";
import { StatusHandler } from "../../../../pages/SearchResults/StatusHandler";
import styles from "./SearchContainer.module.scss";

const SearchContainer = ({
  results,
  title,
  hasPagination = true,
  children,
}) => {
  const titleRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(0);

  const scrollToTop = () => {
    titleRef.current.scrollIntoView({
      behavior: "auto",
      block: "end",
      inline: "nearest",
    });
  };
  const executeIfRenderFunction = (renderFunction) => {
    if (typeof renderFunction === "function") {
      return renderFunction(currentPage);
    }
    return null;
  };

  const mapChildren = (children) => {
    const isRender = executeIfRenderFunction(children);
    if (isRender) return isRender;
    const renderedChildren = children.map((child) => {
      const isRender = executeIfRenderFunction(child);
      if (isRender) return isRender;
      return child;
    });
    const arrayChildren = Children.toArray(renderedChildren);

    return Children.map(arrayChildren, (child) => {
      if (isValidElement(child)) {
        return child;
      }
    });
  };

  return (
    <StatusHandler results={results}>
      <Container fluid="md" className="main-container">
        <h3 ref={titleRef} className="my-3">
          Results for: {title}
        </h3>
        <Row className="row-margin">{mapChildren(children)}</Row>

        {hasPagination && results.length > 1 && (
          <Row>
            <SearchPagination
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
              scroll={scrollToTop}
            />
          </Row>
        )}
      </Container>
    </StatusHandler>
  );
};
export default SearchContainer;
