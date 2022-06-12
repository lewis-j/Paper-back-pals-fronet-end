import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Container, Row } from "reactstrap";
import { Loading, UserRequestCard } from "../../../components";
import SearchPagination from "../SearchPagination";
import { condition } from "../../../redux/searchResults/searchResultsSlice";

const UserResults = () => {
  const [currentPage, setCurrentPage] = useState(0);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.authUser.currentUser);
  const {
    status,
    userResults,
    query: queryTitle,
    error,
  } = useSelector((state) => state.searchResults);

  const titleRef = useRef(null);

  const scrollToTop = () => {
    titleRef.current.scrollIntoView({
      behavior: "auto",
      block: "end",
      inline: "nearest",
    });
  };

  const isLoading = status === condition.LOADING;
  const isError = status === condition.FAILED;

  console.log("User Results", userResults, currentPage);

  const renderCards = () =>
    userResults.length > currentPage
      ? userResults[currentPage].map((user, i) => {
          const { _id, username, profilePic } = user;
          return (
            <Col xs="12" sm="6" md="4" xl="3">
              <UserRequestCard
                key={_id}
                _id={_id}
                username={username}
                profilePic={profilePic}
              />
            </Col>
          );
        })
      : [];

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    console.error(error);
    return <div>Whoops! Something went wrong. Maybe try something else</div>;
  }

  if (!userResults.length) {
    return <div>No results yet</div>;
  }
  return (
    <Container fluid="md" className="main-container">
      <h3 ref={titleRef} className="my-3">
        Results for: {queryTitle}
      </h3>
      <Row className="row-margin">{renderCards()}</Row>
      <Row>
        <SearchPagination
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          scroll={scrollToTop}
        />
      </Row>
    </Container>
  );
};

export default UserResults;
