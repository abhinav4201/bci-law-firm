import React from "react";

// This component now uses your new SVG as a site-wide background pattern.
export const Background = () => {
  // This is the URL-encoded version of your new SVG.
  const encodedSvg =
    "data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160' viewBox='0 0 200 200'%3e%3crect fill='%23ffffff' width='200' height='200'/%3e%3cpolygon fill='%23DCEFFA' fill-opacity='1' points='100 0 0 100 100 100 100 200 200 100 200 0'/%3e%3c/svg%3e";

  return (
    <div
      className='absolute inset-0 -z-20 h-full w-full'
      style={{
        backgroundImage: `url("${encodedSvg}")`,
        backgroundRepeat: "repeat",
        backgroundSize: "160px 160px",
        opacity:0.3,
      }}
    ></div>
  );
};
