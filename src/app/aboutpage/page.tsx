import { Button } from "@/components/ui/button";
import Link from "next/link";
export default function AboutPage() {
    return (
        <div className="min-h-screen w-full flex items-center justify-center">
        <div className="text-center space-y-5 max-w-2xl z-10">
          
         <div className="space-y-3">
          <h1 className="text-7xl tracking-tight bg-clip-text bg-gradient-to-r from-gray-900
           via-green-900 to-green-500 text-transparent h-20 font-semibold">
            about us
            </h1>
            </div>
       
        <p className="text-gray-900 text-lg text-pretty">
          affrdble is a full stack web application made by 3 purdue cs freshman
          Shriyan, Arnav, and Rithvik using Next.js with Typescript with the 
          algorithim made using the gemini and google cloud search apis.
        </p>
    
        </div>
    
       </div>
    );
  }
  