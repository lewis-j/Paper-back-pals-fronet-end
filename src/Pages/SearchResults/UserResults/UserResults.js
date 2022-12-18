import { useSelector } from "react-redux";
import { Col } from "reactstrap";
import { UserRequestCard } from "../../../features/search";
import { SearchContainer } from "../../../features/search/components";

const UserResults = () => {
  const { userResults, query: queryTitle } = useSelector(
    (state) => state.searchResults
  );

  const renderCards = (currentPage) =>
    userResults.length > currentPage
      ? userResults[currentPage].map((user, i) => {
          const { _id, username, profilePic } = user;
          return (
            <Col xs="12" sm="6" md="4" xl="3" key={`search-results-${_id}${i}`}>
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
    <SearchContainer results={userResults} title={queryTitle}>
      {renderCards}
    </SearchContainer>
  );
};

export default UserResults;
