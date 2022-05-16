import React from "react";
import Slider from "react-slick";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import "./ResponsiveSlider.scss";

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
const ResponsiveSlider = ({ books, className, children }) => {
  var settings = {
    className: className,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ],
  };
  return <Slider {...settings}>{children}</Slider>;
};

export default ResponsiveSlider;
