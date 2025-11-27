import React from "react";
import Slider from "react-slick";
import BannerCard from "./BannerCard"; // ajuste o caminho se necessário
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./BannerCard.module.css"; // ajuste o caminho se necessário

export default function BannerCarousel() {
  const banners = [
    "/banner1.jpg",
    "/banner2.jpg",
    "/banner3.jpg",
    "/banner4.jpg"
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 2, // mostra 2 cards ao mesmo tempo (ajuste)
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3500,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <div className={styles.carouselWrapper}>
      <Slider {...settings}>
        {banners.map((img, index) => (
          <div key={index} className={styles.slide}>
            <BannerCard image={img} />
          </div>
        ))}
      </Slider>
    </div>
  );
}
