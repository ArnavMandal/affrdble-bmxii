"use client"; // Important if you’re using the Next.js App Router

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link"

export default function UploadPage() {
  // State to hold the chosen file name
  const [fileName, setFileName] = useState<string>("");

  // Reference to the hidden file input
  const fileInputRef = useRef<HTMLInputElement>(null);

  // When the user clicks "upload", programmatically click the hidden file input
  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // When the user chooses a file, save the file name in state
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFileName(event.target.files[0].name);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center">
      <div className="text-center space-y-5 max-w-2xl z-10">
        <div className="space-y-3">
          <h1 className="text-7xl tracking-tight bg-clip-text bg-gradient-to-r from-gray-900
            via-green-900 to-green-500 text-transparent h-20 font-semibold">
            image upload
          </h1>
        </div>

        <p className="text-gray-400 text-lg text-pretty">
          upload an image of a clothing item that you want to find a cheaper alternative of.
        </p>

        <div className="space-x-3 flex items-center justify-center">
          {/* The button that triggers file selection */}
          <Button variant="default" className="rounded-lg" onClick={handleUploadClick}>
            upload
          </Button>

          {/* Hidden file input - triggered by the button above */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />

          {/* If a file is chosen, display its name */}
          {fileName && (
            <span className="text-gray-900 ml-3">
              {fileName}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
