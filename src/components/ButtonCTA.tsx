export const ButtonCTA = () => {
  return (
    <div className="absolute top-0 inset-x-0 flex justify-center">
      <a
        href="/quote"
        className="bg-[var(--primary-dark)] no-underline group cursor-pointer relative shadow-lg rounded-full p-px text-xs font-semibold leading-6 text-white inline-block"
      >
        <span className="absolute inset-0 overflow-hidden rounded-full">
          <span className="absolute inset-0 rounded-full" style={{ 
            backgroundImage: "radial-gradient(75% 100% at 50% 0%, rgba(76,175,80,0.6) 0%, rgba(76,175,80,0) 75%)",
            opacity: 0.8,
            transition: "opacity 500ms"
          }}></span>
        </span>
        <div className="relative flex space-x-2 items-center z-10 rounded-full bg-[var(--primary-dark)] py-0.5 px-4 ring-1 ring-white ring-opacity-10">
          <span>Get a Free Quote</span>
        </div>
        <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)]" style={{
          background: "linear-gradient(to right, rgba(76,175,80,0) 0%, rgba(76,175,80,0.9) 50%, rgba(76,175,80,0) 100%)",
          transition: "opacity 500ms"
        }}></span>
      </a>
    </div>
  );
};
