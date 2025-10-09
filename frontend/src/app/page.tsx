import Navbar from "@/components/Navbar";
import Image from "next/image";
import Hero from "@/components/Hero";
import Cards from "@/components/Cards";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <div className="font-roboto w-full">
      <div className="z-100">
        <Navbar />
      </div>

      <div className="w-full mt-20">
        <div className="p-10">
          <Hero />
        </div>
        <div className="mt-30">
          <Cards />
        </div>
        <div className="mt-20 p-10">
          <Contact />
        </div>
      </div>
    </div >
  );
}
