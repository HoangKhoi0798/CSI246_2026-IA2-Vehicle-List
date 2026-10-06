"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="max-w-md mx-auto mt-20 p-6 text-center border rounded-lg bg-red-50">
      <h2 className="text-xl font-bold text-red-700 mb-2">Error!</h2>
      <p className="text-gray-600 mb-4">
        Unable to load the vehicle inventory.
      </p>
      <button
        onClick={() => reset()}
        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
      >
        Try again
      </button>
    </div>
  );
}
