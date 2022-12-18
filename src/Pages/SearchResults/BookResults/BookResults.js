import { useDispatch, useSelector } from "react-redux";
import { Col } from "reactstrap";
import { SearchCard } from "../../../features/search";
import { processBookResults } from "../../../utilities/bookUtilities";
import { addBook } from "../../../features/library";
import { shortenString } from "../../../utilities/stringUtil";
import { SearchContainer } from "../../../features/search/components";
const BookResults = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.authUser.currentUser);
  const { bookResults, query: queryTitle } = useSelector(
    (state) => state.searchResults
  );

  const addBookToLibrary = (bookDto) => () => {
    dispatch(addBook({ id: user._id, bookDto }));
  };

  const renderCards = (currentPage) =>
    bookResults.length > currentPage
      ? bookResults[currentPage].map(({ id, volumeInfo }, i) => {
          const { title, authors, thumbnail, description, pageCount } =
            processBookResults(volumeInfo);

          const cardData = {
            title: shortenString(title, 50),
            author: shortenString(authors[0], 20),
            thumbnail,
          };
          const bookDto = {
            google_id: id,
            title,
            authors,
            coverImg: thumbnail,
            description,
            pageCount,
          };

          if (cardData) {
            return (
              <Col xs="12" sm="6" md="4" xl="3" key={`${id}-${i}`}>
                <SearchCard
                  cardData={cardData}
                  addBook={addBookToLibrary(bookDto)}
                />
              </Col>
            );
          }
          return null;
        })
      : [];
  return (
    <SearchContainer results={bookResults} title={queryTitle}>
      {renderCards}
    </SearchContainer>
  );
};

export default BookResults;
