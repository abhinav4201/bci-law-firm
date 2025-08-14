import React from "react"; // React needs to be imported to use React.ReactNode

// The type for children is changed from React.Node to React.ReactNode
export const CreativeBackground = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  // --- THIS IS THE URL-ENCODED VERSION OF YOUR SVG ---
  const encodedSvg =
    "data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 200 200'%3e%3crect fill='%23ee5522' width='200' height='200'/%3e%3cdefs%3e%3clinearGradient id='a' gradientUnits='userSpaceOnUse' x1='100' y1='33' x2='100' y2='-3'%3e%3cstop offset='0' stop-color='%23000' stop-opacity='0'/%3e%3cstop offset='1' stop-color='%23000' stop-opacity='1'/%3e%3c/linearGradient%3e%3clinearGradient id='b' gradientUnits='userSpaceOnUse' x1='100' y1='135' x2='100' y2='97'%3e%3cstop offset='0' stop-color='%23000' stop-opacity='0'/%3e%3cstop offset='1' stop-color='%23000' stop-opacity='1'/%3e%3c/linearGradient%3e%3c/defs%3e%3cg fill='%23d23d09' fill-opacity='0.6'%3e%3crect x='100' width='100' height='100'/%3e%3crect y='100' width='100' height='100'/%3e%3c/g%3e%3cg fill-opacity='0.5'%3e%3cpolygon fill='url(%23a)' points='100 30 0 0 200 0'/%3e%3cpolygon fill='url(%23b)' points='100 100 0 130 0 100 200 100 200 130'/%3e%3c/g%3e%3c/svg%3e";

  return (
    <div className='relative isolate overflow-hidden bg-background'>
      {/* Layer 1: The Soft Gradient Accent */}
      <div className='absolute inset-0 -z-10 bg-gradient-to-br from-teal-50 via-background to-background' />

      {/* Layer 2: The Elegant Abstract Shape */}
      <div
        className='absolute bottom-0 left-1/2 -translate-x-1/2 -z-10 h-96 w-[60rem] rounded-full bg-teal-200/20 blur-3xl'
        aria-hidden='true'
      />

      {/* Layer 3: Your new SVG pattern, now correctly encoded */}
      <div
        className='absolute inset-0 -z-10'
        style={{
          backgroundImage: `url("${encodedSvg}")`,
          backgroundSize: "100px 100px",
          opacity: "0.09",
        }}
      />

      <div className='relative z-0'>{children}</div>
    </div>
  );
};
