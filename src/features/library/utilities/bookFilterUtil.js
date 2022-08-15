import requestStatus from "../../../data/requestStatus";

export const sortCheckedInBooks = (books) =>
  books.reduce(
    (obj, book) => {
      const requestEnum = Object.values(requestStatus);
      const checkedIn = requestEnum.slice(1, 3);
      const checkedOut = requestEnum.slice(3, -1);

      if (book.currentRequest) {
        const status = book.currentRequest.status;

        if (checkedIn.includes(status)) {
          return {
            ...obj,
            checkedIn: [...obj.checkedOut, book],
          };
        }
        if (checkedOut.includes(status)) {
          return {
            ...obj,
            checkedOut: [...obj.checkedIn, book],
          };
        }
      }

      return {
        ...obj,
        checkedIn: [...obj.checkedIn, book],
      };
    },

    { checkedIn: [], checkedOut: [] }
  );
