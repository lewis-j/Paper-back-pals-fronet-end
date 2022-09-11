export const processBookResults = (bookInfo) => {
  return {
    title: bookInfo?.title || ["unknown"],
    authors: bookInfo?.authors || ["unknown"],
    thumbnail: bookInfo?.imageLinks?.thumbnail || null,
    description: bookInfo?.description || "no description",
    pageCount: bookInfo?.pageCount || 0,
  };
};

export const getProgressInPercent = (currentPage, pageCount) => {
  return (currentPage / pageCount) * 100;
};
