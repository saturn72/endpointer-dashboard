//https://blog.logrocket.com/using-cors-next-js-handle-cross-origin-requests/
/** @type {import('next').NextConfig} */
const origins = process.env.CORS_ALLOWED_ORIGIN;
const allowedOrigins =  origins.split(',');

const config = {
   experimental: {
    serverActions: {
      allowedOrigins
    },
  },
  // },
  // async headers() {
  //   return [
  //     // {
  //     //     // matching all API routes
  //     //     source: "/api/:path*",
  //     //     headers: [
  //     //         { key: "Access-Control-Allow-Credentials", value: "true" },
  //     //         { key: "Access-Control-Allow-Origin", value: origin },
  //     //         { key: "Access-Control-Allow-Methods", value: "GET,DELETE,PATCH,POST,PUT" },
  //     //         { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
  //     //     ]
  //     // }
  //   ];
};

export default config;
