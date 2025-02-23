import { Button } from "@/components/ui/button";
import Link from "next/link";


export default function Home() {
  return (
   <div className="min-h-screen w-full flex items-center justify-center bg-black">
    <div className="text-center space-y-5 max-w-2xl z-10">
      <p className="py-1 px-2 bg-zinc-900/40 backdrop-blur-sm font-light 
      rounded-full text-white inline-block">AI fashion agent</p>
     <div className="space-y-3">
      <h1 className="text-7xl tracking-tight bg-clip-text bg-gradient-to-r from-gray-100
       via-gray-100 to-gray-100 text-transparent h-20 font-semibold">
        affrdble<span className="text-7xl tracking-tight bg-clip-text bg-gradient-to-r from-green-600
       via-green-600 to-green-600 text-transparent h-20 font-semibold">.</span>
        </h1>
       <h3 className="text-5xl tracking-tight bg-clip-text bg-gradient-to-r from-green-800
       via-green-300 to-gray-100 text-transparent h-20 font-semibold">
        cheaper alternatives, fast
        </h3>
        </div>
   
    <p className="text-gray-400 text-lg text-pretty">
      a <span className="bg-clip-text bg-gradient-to-r from-purple-500
       via-pink-400 to-blue-500 text-transparent h-20 font-semibold">free</span>  platform to 
       allow anyone to find fashionable clothes in their style on a budget, with a single click.
    </p>

    <div className="space-x-3">
      <Link href="/uploadpage">
      <Button variant="default" className="rounded-lg">try now</Button>
      </Link>
      <Link href={"/aboutpage"}>
      <Button variant="secondary" className="rounded-lg">about us</Button>
      </Link>
    </div>
    </div>

   </div>
  );
}
