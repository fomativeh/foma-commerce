const cloudinary = require("cloudinary");

module.exports = async (req, next) => {
  const images = [];
  for (const file of req.files) {
    try {
      const result = await cloudinary.uploader.upload(file.path, {
        folder: "productImages",
      });
      images.push(result.secure_url);
    } catch (error) {
      return createError(next, "Error uploading images.", 500);
    }
  }
  return images;
};
