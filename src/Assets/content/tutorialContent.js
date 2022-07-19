import images from "../imgs/landingImages";

const { assortment_books, front_composition_books, open_book } = images;

const tutorialContent = [
  {
    header: "Find Books you'd like to lend",
    paragraph:
      "Add a list of books to your lending library and let friends request to borrow them!",
    img: {
      src: assortment_books,
      alt: "pile of books",
    },
    imgRight: false,
  },
  {
    header: "Give your friends your paperback book",
    paragraph:
      "Approve their book request, and once you've passed that book on to them confirm the pass was completed",
    img: {
      src: front_composition_books,
      alt: "passing a book",
    },
    imgRight: true,
  },
  {
    header: "Track Your friends reading progress",
    paragraph:
      "Check in to see your freinds remaining page counts. See how far they are from their projected due date.",
    img: {
      src: open_book,
      alt: "passing a book",
    },
    imgRight: false,
  },
];

export default tutorialContent;
