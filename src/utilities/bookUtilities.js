import { shortenString } from "./stringUtil";

export const processBookResults = (bookInfo) => {
  let thumbnail = null,
    result = "";
  let title, authors;
  let shortTitle = (title = bookInfo?.title);
  let shortAuthor = (authors = "No author info");
  let description = "no description";
  if ((result = bookInfo?.imageLinks?.thumbnail)) {
    thumbnail = result;
  }
  if (bookInfo?.description) {
    description = bookInfo?.description;
  }

  if (bookInfo?.authors) {
    shortAuthor = bookInfo.authors[0];
    authors = bookInfo.authors;
  }

  if (shortTitle.length > 50) {
    shortTitle = shortenString(shortTitle, 50);
  }
  if (shortAuthor.length > 20) {
    shortAuthor = shortenString(shortAuthor, 20);
  }

  return {
    title,
    shortTitle,
    authors,
    shortAuthor,
    thumbnail,
    description,
  };
};

export const getProgressInPercent = (currentPage, pageCount) => {
  return (currentPage / pageCount) * 100;
};
