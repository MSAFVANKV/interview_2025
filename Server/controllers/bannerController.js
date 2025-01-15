import asyncHandler from '../middlewares/asyncHandler.js';
import { Banner } from '../modals/benners.js';

// Create Banner
// export const createBanner = asyncHandler(async (req, res) => {
//     console.log('banner controller');
    
// //   const { title } = req.body;

//   const basePath = `${req.secure ? "https" : "http"}://${req.get("host")}/`;

//   let bannerImages = [];

//   if (req.files && req.files["banner"]) {
//     try {
//       // Map file paths to URL format
//     //   bannerImages = req.files["banner"].map((file) =>
//     //     `${basePath}${file.path.replace(/\\/g, "/")}`
//     //   );
//     bannerImages = req.files["banner"].map((file) =>
//         `${basePath}public/uploads/banners/${file.filename.replace(/\\/g, "/")}`
//       );

//       const newBanner = new Banner({
//         // title,
//         banner: bannerImages,
//       });
    
//       await newBanner.save();
//       res.status(200).json({ message: 'Banner created successfully', banner: newBanner });


//     } catch (err) {
//         console.log(err);
        
//       return res.status(400).json({ msg: "Error processing banner images" });
//     }
//   }


 
// });
export const createBanner = asyncHandler(async (req, res) => {
//   console.log('banner controller');
  
  const basePath = `${req.secure ? "https" : "http"}://${req.get("host")}/`;

  let bannerImages = [];

  if (req.files && req.files["banner"]) {
      try {
          // Map file paths to URL format
          bannerImages = req.files["banner"].map((file) =>
              `${basePath}public/uploads/banners/${file.filename.replace(/\\/g, "/")}`
          );

          // Check if there is an existing banner
          const existingBanner = await Banner.findOne(); // Fetch the first existing banner (or you can use a condition to find the right one)

          if (existingBanner) {
              // If banner exists, push new images to the existing banner array
              existingBanner.banner.push(...bannerImages);
              await existingBanner.save();
              res.status(200).json({ message: 'Banners added successfully', banner: existingBanner });
          } else {
              // If no banner exists, create a new one
              const newBanner = new Banner({
                  banner: bannerImages,
              });
              await newBanner.save();
              res.status(200).json({ message: 'Banner created successfully', banner: newBanner });
          }
      } catch (err) {
          console.log(err);
          return res.status(400).json({ msg: "Error processing banner images" });
      }
  } else {
      res.status(400).json({ msg: "No banner images uploaded" });
  }
});

// Get Banners
export const getBanners = asyncHandler(async (req, res) => {
  
  try {
    const banners = await Banner.find();

    if (!banners) {
      return res.status(204).json({ message: "No banners found" });
    }
     res.status(200).json(banners);
  } catch (error) {
   return res.status(500).json({ message: "Server error", error });
    
  }
 
});
