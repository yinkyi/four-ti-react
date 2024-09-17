import React from "react";

const LoadingScreen: React.FC = () => {
  return (
    <div className="flex flex-col items-center">
      <svg
        className="w-10 h-10 text-blue-500 animate-spin"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
        ></path>
      </svg>
      <p className="mt-4 text-lg text-gray-700">Loading...</p>
    </div>
  );
};

export default LoadingScreen;
