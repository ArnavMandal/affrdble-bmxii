"use client"; // Ensure this runs on the client side
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Replace with your real keys / environment variables
const GEMINI_API_KEY = "AIzaSyAx8N33sksiU7nagO7xWONTgWvz1q5R7-Q";
const SEARCH_API_KEY = "AIzaSyDunqq3eYRGB9go4gj-tx91mE4pItUszBA";
const GOOGLE_CX_ID = "06296cd37085b48f4";

if (!GEMINI_API_KEY) {
  console.error("❌ GEMINI_API_KEY is missing. Check your .env or code.");
}

export default function UploadPage() {
  const [image, setImage] = useState<File | null>(null);
  const [fileName, setFileName] = useState("");
  const [price, setPrice] = useState(""); // New state for price
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [cheaperAlternatives, setCheaperAlternatives] = useState<
    { title: string; link: string }[]
  >([]);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter(); // For navigation

  // Trigger hidden <input type="file"> when user clicks "upload"
  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };
  if (cheaperAlternatives.length < 0) {
    console.log("No alternatives found");
  }
  // When user picks a file, store both file and filename
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
      setFileName(e.target.files[0].name);
    }
  };

  // Called by "Submit" button
  const identifyImage = async () => {
    if (!image) return;
    setLoading(true);

    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    try {
      // 1) Convert file to base64
      const imageParts = await fileToGenerativePart(image);
      const prompt = "Describe this clothing item in detail in under 15 words, note color";

      // 2) Send prompt + image to the generative model
      const generation = await model.generateContent([prompt, imageParts]);
      const response = await generation.response;

      // 3) Clean up text
      const text = response
        .text()
        .trim()
        .replace(/```/g, "")
        .replace(/\*\*/g, "")
        .replace(/\*/g, "")
        .replace(/-\s*/g, "")
        .replace(/\n\s*\n/g, "\n");

      setResult(text);
      console.log("Generated description:", text);

      // 4) Fetch cheaper alternatives and store them in localStorage
      const alternatives = await fetchCheaperAlternatives(text, price);
      localStorage.setItem("cheaperAlternatives", JSON.stringify(alternatives));

      // 5) Automatically navigate to the alternatives page
      router.push("/alternatives");
    } catch (error) {
      console.error("Error identifying image:", error);
      if (error instanceof Error) {
        setResult(`Error identifying image: ${error.message}`);
      } else {
        setResult("An unknown error occurred while identifying the image.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Fetch cheaper alternatives from Google Custom Search and return them
  async function fetchCheaperAlternatives(description: string, price: string): Promise<{ title: string; link: string }[]> {
    try {
      const priceQuery = price ? ` under $${price}` : "";
      const query = encodeURIComponent(`Look on e-commerce sites for ${description}${priceQuery}`);
      console.log("Search query:", query);
      const url = `https://www.googleapis.com/customsearch/v1?q=${query}&cx=${GOOGLE_CX_ID}&key=${SEARCH_API_KEY}`;

      const response = await fetch(url);
      const data = await response.json();
      console.log("Search results:", data);

      if (data.items) {
        const sliced = data.items.slice(0, 5).map((item: { title: string; link: string }) => ({
          title: item.title,
          link: item.link,
        }));
        setCheaperAlternatives(sliced);
        return sliced;
      } else {
        setCheaperAlternatives([]);
        return [];
      }
    } catch (error) {
      console.error("Error fetching cheaper alternatives:", error);
      return [];
    }
  }

  // Convert file to base64 for Gemini
  async function fileToGenerativePart(file: File): Promise<{
    inlineData: { data: string; mimeType: string };
  }> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64data = reader.result as string;
        const base64Content = base64data.split(",")[1];
        resolve({
          inlineData: {
            data: base64Content,
            mimeType: file.type,
          },
        });
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gray-50">
      <div className="text-center space-y-5 max-w-2xl z-10">
        {/* Title */}
        <h1 className="text-7xl tracking-tight bg-clip-text bg-gradient-to-r from-gray-900
            via-green-900 to-green-500 text-transparent h-20 font-semibold">
          image upload
        </h1>

        {/* Subtitle */}
        <p className="text-gray-500 text-lg">
          Upload an image of a clothing item to find cheaper alternatives.
        </p>

        {/* Upload Button + Hidden File Input */}
        <div className="flex items-center justify-center space-x-3">
          <Button variant="default" className="rounded-lg" onClick={handleUploadClick}>
            upload
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
          {fileName && <span className="text-gray-700 ml-2">{fileName}</span>}
        </div>

        {/* Little form for entering the price */}
        <div className="mt-4">
          <label htmlFor="price-input" className="block text-sm font-medium text-gray-700">
            Price
          </label>
          <input
            id="price-input"
            type="number"
            placeholder="e.g. 30"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        {/* Preview & Submit */}
        {image && (
          <>
            {/* Preview the chosen image */}
            <div className="flex justify-center mt-4">
              <img
                src={URL.createObjectURL(image)}
                alt="Preview"
                className="max-w-xs rounded shadow-md"
              />
            </div>

            {/* Submit button */}
            <div className="mt-4">
              <Button
                variant="default"
                className="rounded-lg"
                onClick={identifyImage}
                disabled={loading}
              >
                {loading ? "Identifying..." : "Submit"}
              </Button>
            </div>
          </>
        )}

        {/* Optionally, you can leave the result section for debugging */}
        {result && (
          <div className="mt-8 bg-white p-4 rounded shadow-md">
            <h3 className="text-xl font-bold text-green-700 mb-2">
              Image Information:
            </h3>
            <p className="text-gray-800 mb-4">{result}</p>
          </div>
        )}
      </div>
    </div>
  );
}
