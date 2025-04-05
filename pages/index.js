import { Layout, Intro, Container, Projects, Contact, Footer, Quote, DomHead } from "../components";
import { useEffect, useState } from "react";
import Aos from "aos";
import { DataContextProvider } from "../context/DataContext";
import { FaArrowUp } from "react-icons/fa"; // Up arrow icon

export default function HomePage() {
    const [showScrollTop, setShowScrollTop] = useState(false);

    useEffect(() => {
        Aos.init({ duration: "1000" });

        const handleScroll = () => {
            if (window.scrollY > 300) {
                setShowScrollTop(true);
            } else {
                setShowScrollTop(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <DataContextProvider>
            <DomHead />
            <Layout>
                <Container>
                    <Intro />
                    <Projects />
                </Container>
                <Quote />
                <Contact />
                <Footer />

                {/* Back to Top Button */}
                {showScrollTop && (
                    <button
                        onClick={scrollToTop}
                        className="fixed bottom-5 left-5 p-3 bg-black text-white rounded-full shadow-lg hover:bg-gray-800 transition-all duration-300 z-50"
                        aria-label="Scroll to top"
                    >
                        <FaArrowUp size={20} />
                    </button>
                )}
            </Layout>
        </DataContextProvider>
    );
}
