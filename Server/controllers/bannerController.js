import asyncHandler from '../middlewares/asyncHandler.js';
import { Banner } from '../modals/benners.js';

// Create Banner
export const createBanner = asyncHandler(async (req, res) => {
    console.log('banner controller');
    
//   const { title } = req.body;

  const basePath = `${req.secure ? "https" : "http"}://${req.get("host")}/`;

  let bannerImages = [];

  if (req.files && req.files["banner"]) {
    try {
      // Map file paths to URL format
    //   bannerImages = req.files["banner"].map((file) =>
    //     `${basePath}${file.path.replace(/\\/g, "/")}`
    //   );
    bannerImages = req.files["banner"].map((file) =>
        `${basePath}public/uploads/banners/${file.filename.replace(/\\/g, "/")}`
      );

      const newBanner = new Banner({
        // title,
        banner: bannerImages,
      });
    
      await newBanner.save();
      res.status(200).json({ message: 'Banner created successfully', banner: newBanner });


    } catch (err) {
        console.log(err);
        
      return res.status(400).json({ msg: "Error processing banner images" });
    }
  }


 
});

// Get Banners
export const getBanners = asyncHandler(async (req, res) => {
  const banners = await Banner.find();
  res.status(200).json(banners);
});
