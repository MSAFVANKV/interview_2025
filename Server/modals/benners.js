import mongoose from "mongoose";


const bannerSchema = mongoose.Schema({
    title:  { type: String },
    banner:{ type: [String], default: [] },
})

export const Banner = mongoose.model("banner", bannerSchema);
