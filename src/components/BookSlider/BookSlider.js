import React from "react";
import Slider from "react-slick";
import { UserCardSm } from "../BookCards";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import "./BookSlider.scss";

const NextArrow = ({ className, style, onClick }) => {
  return (
    <div className="slick-next BookSlider__arrow" onClick={onClick}>
      <FontAwesomeIcon icon={faChevronRight} />
    </div>
  );
};

const PrevArrow = ({ className, style, onClick }) => {
  return (
    <div className="slick-prev BookSlider__arrow" onClick={onClick}>
      <FontAwesomeIcon icon={faChevronLeft} />
    </div>
  );
};
const BookSlider = ({ books, className }) => {
  var settings = {
    className: className,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  const renderCheckedCards = books.map((bookData, idx) => {
    return (
      <div key={bookData.lenderId}>
        <UserCardSm bookData={bookData} index={idx} />
      </div>
    );
  });

  return <Slider {...settings}>{renderCheckedCards}</Slider>;
};

export default BookSlider;
