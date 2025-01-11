// import React, { useEffect, useRef } from "react";
// import Slider from "react-slick";
// import { cn } from "@/lib/utils";
// import { Icon } from "@iconify/react/dist/iconify.js";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";



// const BannerWrapper = ({
//   children,
//   className,
//   prevBtnClass,
//   nextBtnClass,
//   btnClass,
//   isActive,
//   isAutoFlow = true,
//   iconSize = 20,
//   initialSlide = 0,
//   setCurrentImageIndex
// }) => {
//   const slider = useRef(null);

//   const settings = {
//     dots: false,
//     infinite: true,
//     autoplay: isAutoFlow? true : false,
//     autoplaySpeed: 3000,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     initialSlide: initialSlide,
//     nextArrow: undefined, 
//     prevArrow: undefined, 
//     afterChange: (index) => {
//       if (setCurrentImageIndex) {
//         setCurrentImageIndex(index);
//       }
//       pauseAllVideos();
//     }
//   };

//   useEffect(() => {
//     if (slider.current) {
//       slider.current.slickGoTo(initialSlide); // Update the slide if initialSlide changes
//     }
//   }, [initialSlide]);
//     // Function to pause all video elements within the slider
//     const pauseAllVideos = () => {
//       const videos = document.querySelectorAll('video');
//       videos.forEach((video) => video.pause());
//     };

//   return (
//     <div className={cn(`relative`, className)}>
//     <Slider ref={slider} {...settings}>
//       {React.Children.map(children, (child) => (
//         <div>{child}</div>
//       ))}
//     </Slider>

//     {isActive && (
//       <div
//         className={cn(
//           `absolute flex justify-between mx-4`,
//           btnClass
//         )}
//       >
//         <button
//           onClick={() => slider?.current?.slickPrev()}
//           className={cn(
//             "bg-white text-black px-2 py-2 rounded-md",
//             prevBtnClass
//           )}
//         >
//           <Icon fontSize={iconSize} icon="material-symbols-light:keyboard-arrow-left" />
//         </button>
//         <button
//           onClick={() => slider?.current?.slickNext()}
//           className={cn(
//             "bg-white text-black px-2 py-2 rounded-md",
//             nextBtnClass
//           )}
//         >
//           <Icon fontSize={iconSize} icon="material-symbols-light:keyboard-arrow-right" />
//         </button>
//       </div>
//     )}
//   </div>
//   );
// };

// export default BannerWrapper;