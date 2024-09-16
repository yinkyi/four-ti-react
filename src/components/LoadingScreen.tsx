import React from "react";

const LoadingScreen: React.FC = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="flex flex-col items-center">
        <svg
          className="w-12 h-12 text-white animate-spin"
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
            d="M4 12a8 8 0 018-8v2a6 6 0 00-6 6H4z"
          ></path>
        </svg>
        <p className="mt-4 text-lg text-white">Loading...</p>
      </div>
    </div>
  );
};

export default LoadingScreen;
