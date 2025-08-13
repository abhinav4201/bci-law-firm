export const Background = () => {
  return (
    <div
      className='absolute inset-0 -z-10 h-full w-full'
      style={{
        backgroundColor: "white",
        backgroundImage:
          "radial-gradient(circle at 100% 15%, rgba(213, 197, 255, 0.2) 0%, rgba(213, 197, 255, 0) 50%)",
      }}
    ></div>
  );
};
