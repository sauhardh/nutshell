import Navbar from "@/components/Navbar";
import Image from "next/image";
import Hero from "@/components/Hero";
import Cards from "@/components/Cards";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="font-roboto w-full">
      <header className="z-100">
        <Navbar />
      </header>

      <main className="w-full mt-20">
        <div className="p-10">
          <Hero />
        </div>
        <div className="mt-30">
          <Cards />
        </div>
        <div className="mt-20 p-10">
          <Contact />
        </div>
      </main >

      <footer className="mt-15 mb-5">
        <Footer />
      </footer>
    </div >
  );
}
