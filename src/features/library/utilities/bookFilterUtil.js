import requestStatus from "../../../data/requestStatus";

export const categorizeOwnedBooksByStatus = (ownedBooks) => {
  let categorizedBooks = {};
  ownedBooks.forEach((userBook) => {
    const isCheckedOut = userBook.request.some((request) =>
      Object.keys(requestStatus)
        .slice(1)
        .some((status) => {
          if (status === request.status) {
            const singleRequestBook = {
              ...userBook,
              dueDate: request.dueDate,
              currentPage: request.currentPage,
              sender: request.sender,
              request: { status: request.status, id: request._id },
            };
            categorizedBooks[status] = categorizedBooks[status]
              ? [...categorizedBooks[status], singleRequestBook]
              : [singleRequestBook];
            return true;
          }
          return false;
        })
    );

    if (!isCheckedOut) {
      categorizedBooks[requestStatus.CHECKED_IN] = categorizedBooks[
        requestStatus.CHECKED_IN
      ]
        ? [...categorizedBooks[requestStatus.CHECKED_IN], userBook]
        : [userBook];
    }
  });

  return categorizedBooks;
};

export const categorizeBorrowedBooksByStatus = (borrowedBooks) => {
  const categorizedBooks = {};
  borrowedBooks.forEach((userBook) => {
    const status = userBook.request.status;
    categorizedBooks[status] = categorizedBooks[status]
      ? [...categorizedBooks[status], userBook]
      : [userBook];
  });

  return categorizedBooks;
};
