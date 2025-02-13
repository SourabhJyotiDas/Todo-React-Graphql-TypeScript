import React from 'react';

const LoadingPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="flex flex-col items-center">
        <div className="w-16 h-16 border-4 border-white border-t-transparent border-solid rounded-full animate-spin"></div>
        <p className="mt-4 text-xl text-white">Loading...</p>
      </div>
    </div>
  );
};

export default LoadingPage;
