import React from 'react';
export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center max-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-500" />
    </div>
  );
}
