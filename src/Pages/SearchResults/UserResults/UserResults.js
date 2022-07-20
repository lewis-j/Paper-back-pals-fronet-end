import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Col, Container, Row } from "reactstrap";
import { UserRequestCard } from "../../../features/search";
import SearchPagination from "../SearchPagination";
import { StatusHandler } from "../StatusHandler";

const UserResults = () => {
  const [currentPage, setCurrentPage] = useState(0);

  const { userResults, query: queryTitle } = useSelector(
    (state) => state.searchResults
  );

  const titleRef = useRef(null);

  const scrollToTop = () => {
    titleRef.current.scrollIntoView({
      behavior: "auto",
      block: "end",
      inline: "nearest",
    });
  };

  console.log("User Results", userResults, currentPage);

  const renderCards = () =>
    userResults.length > currentPage
      ? userResults[currentPage].map((user, i) => {
          const { _id, username, profilePic } = user;
          return (
            <Col xs="12" sm="6" md="4" xl="3" key={`search-results-${_id}`}>
              <UserRequestCard
                _id={_id}
                username={username}
                profilePic={profilePic}
              />
            </Col>
          );
        })
      : [];
  return (
    <StatusHandler results={userResults}>
      <Container fluid="md" className="main-container">
        <h3 ref={titleRef} className="my-3">
          Results for: {queryTitle}
        </h3>
        <Row className="row-margin">{renderCards()}</Row>
        <Row>
          {userResults.length > 12 && (
            <SearchPagination
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
              scroll={scrollToTop}
            />
          )}
        </Row>
      </Container>
    </StatusHandler>
  );
};

export default UserResults;
