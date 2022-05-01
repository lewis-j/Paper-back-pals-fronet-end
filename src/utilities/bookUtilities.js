export const processBookResults = (item) => {
  const bookInfo = item.volumeInfo;
  let thumbnail = null,
    result = "";
  if ((result = bookInfo?.imageLinks?.thumbnail)) {
    thumbnail = result;
  }
  let shortTitle = bookInfo.title;
  let shortAuthor = "No author info";

  if (bookInfo?.authors) {
    shortAuthor = bookInfo?.authors[0];
  }

  if (shortTitle.length > 50) {
    shortTitle = shortenString(shortTitle, 50);
  }
  if (shortAuthor.length > 20) {
    shortAuthor = shortenString(shortAuthor, 20);
  }

  return {
    id: item.id,
    title: shortTitle,
    author: shortAuthor,
    thumbnail,
  };
};

const shortenString = (string, length) => {
  const tempString = string.substring(0, length);
  const lastIndex = tempString.lastIndexOf(" ");
  return tempString.substring(0, lastIndex) + "...";
};

export const getProgressInPercent = (currentPage, pageCount) => {
  return (currentPage / pageCount) * 100;
};
