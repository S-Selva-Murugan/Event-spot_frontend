import React, { useEffect ,memo} from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { useDispatch, useSelector } from 'react-redux';
import { startCategoryCarousel } from '../../../react-redux/action/categoryAction';
import CarouselCatCard from './CarouselCatCard';

function MultiCarousel() {
  const dispatch = useDispatch();
  const { categoryCarousel } = useSelector((state) => state.categoryCarousel);
  console.log(categoryCarousel, "in the muit");
  useEffect(() => {
    dispatch(startCategoryCarousel());
  }, []);
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
      slidesToSlide: 3 // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2 // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1 // optional, default to 1.
    }
  };
  return (
    <div style={{ width: "95%" }}>
      <Carousel
        swipeable={true}
        draggable={true}
        arrows={true}
        responsive={responsive}
        ssr={true} // means to render carousel on server-side.
        infinite={true}
        autoPlaySpeed={1000}
        keyBoardControl={true}
        customTransition="all .5"
        transitionDuration={500}
        containerClass="carousel-container"
        removeArrowOnDeviceType={["tablet", "mobile"]}
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px"
        style={{ width: "95%" }}
      >
        {categoryCarousel.length > 0 && categoryCarousel.map((category) => (
          <div key={category._id} style={{ display: "flex",justifyContent:"space-evenly" }}>
            <CarouselCatCard
              categoryId={category._id}
              events={category.events}
              name={category.name}
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default memo(MultiCarousel);
