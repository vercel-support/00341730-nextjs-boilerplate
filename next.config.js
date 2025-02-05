import BuilderDevTools from "@builder.io/dev-tools/next";

/** @type {import('next').NextConfig} */
const nextConfig = BuilderDevTools()({
  images: {
    dangerouslyAllowSVG: true,
  },

  // async redirects() {
  //   return builder
  //     .getAll("url-redirects", {
  //       apiKey: process.env.NEXT_PUBLIC_BUILDER_API_KEY,
  //       options: { noTargeting: true },
  //       cachebust: true,
  //     })
  //     .then((results) =>
  //       results
  //         .filter((content) => {
  //           const data = content.data || {};
  //           return !!(data.sourceUrl && data.destinationUrl);
  //         })
  //         .map(({ data }) => ({
  //           source: data.sourceUrl,
  //           destination: data.destinationUrl,
  //           permanent: !!data.redirectToPermanent,
  //         }))
  //     );
  // },

  async rewrites() {
    return [
      {
        source: "/shop/:path*",
        destination: "https://jsonplaceholder.typicode.com/posts/:path*",
      },
    ];
  },
});

export default nextConfig;