import Hero from "@/components/Hero";
import Cards from "@/components/Cards";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default async function HomeLayout() {
    return (
        <div className="font-roboto w-full">
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
