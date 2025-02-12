import React, { useEffect, useState } from "react";
import { Carousel, Image } from "antd";
import { getBannerImage } from "../../services/api";
const contentStyle = {
  margin: 0,
  height: "160px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
};
const HeroSection = () => {
  const [images, setImages] = useState();
  const fetchBanner = async () => {
    const responses = await getBannerImage();
    console.log(responses.data);
    setImages(responses.data);
  };
  useEffect(() => {
    fetchBanner();
  }, []);
  return (
    <>
      <Carousel
        autoplay={{
          dotDuration: true,
        }}
        autoplaySpeed={5000}
      >
        {images?.map((item, i) => (
          <img
            src={`data:image/jpeg;base64,${item.image_blob}`}
            alt={item.name || "Product image"}
          />
        ))}
      </Carousel>
    </>
  );
};
export default HeroSection;
