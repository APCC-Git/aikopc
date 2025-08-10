import React from 'react';

const ScrollHint: React.FC = () => {
  return (
    <div className="absolute bottom-5 left-1/2 -translate-x-1/2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        className="h-8 w-8 stroke-gray-600 dark:stroke-white animate-bounce-slow"
      >
        <path
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M12 5v14m-6-6l6 6 6-6"
        />
      </svg>
    </div>
  );
};

export default ScrollHint;
