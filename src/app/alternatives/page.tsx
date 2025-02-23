"use client";
//import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export default function AlternativesPage() {
  const [alternatives, setAlternatives] = useState<{ title: string; link: string }[]>([]);

  useEffect(() => {
    // Fetch alternatives from localStorage
    const stored = localStorage.getItem("cheaperAlternatives");
    if (stored) {
      setAlternatives(JSON.parse(stored));
    }
  }, []);

  /*const handleVisitLink = (url: string) => {
    // Open the link in a new tab
    window.open(url, "_blank", "noopener,noreferrer");
  };*/

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <h1 className="text-3xl font-bold mb-6 text-green-700">Cheaper Alternatives</h1>
      {alternatives.length === 0 ? (
        <p className="text-gray-600">No alternatives found. Try uploading an image first.</p>
      ) : (
        <ul className="w-full max-w-xl space-y-4">
          {alternatives.map((alt, index) => (
            <li key={index} className="flex items-center justify-between">
              {/* Title container with blue background */}
              <div className="flex-1 bg-blue-100 text-blue-800 px-4 py-2 rounded-lg">
                {alt.title}
              </div>
              {/* Go button outside the blue container */}
              <button
                    
                onClick={() => window.open(alt.link, "_blank", "noopener,noreferrer")}
                className="z-10 ml-4 bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition duration-150 ease-in-out"
              >
                Go
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}