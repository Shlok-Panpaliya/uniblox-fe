/** @type {import('next').NextConfig}    */

const nextConfig = {
    images: {
        formats: ["image/avif", "image/webp"],
        disableStaticImages: true,
        domains: [
          "drive.google.com",
          "res.cloudinary.com"
        ],
      },

}

module.exports = nextConfig
