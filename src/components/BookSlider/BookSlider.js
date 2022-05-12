import React from 'react'
import Slider from 'react-slick';
import { UserBookCardSm } from '../UserBookCardSm';

const NextArrow= ({ className, style, onClick }) => {
    console.log("classname in slider arrow", className);
    
    return (
      <div
         className='slick-next'
        style={{ display: "block", background: "red" }}
        onClick={onClick}
      >test</div>
    );
  }

const BookSlider = ({books}) => {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        nextArrow: <NextArrow />
      };

   
    
      const renderCheckedCards = books.map((bookData, idx) => {
        return (
          <div key={bookData.lenderId}>
            <UserBookCardSm bookData={bookData} index={idx} />
          </div>
        );
      });
      
      return <Slider {...settings}>{renderCheckedCards}</Slider>;
}

export default BookSlider