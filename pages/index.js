import { Layout, Intro, Container, Projects, Contact, Footer, Quote, DomHead } from "../components";
import { useEffect, useState } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import { DataContextProvider } from "../context/DataContext";
import { FaArrowUp } from "react-icons/fa";

export default function HomePage() {
    const [showScrollTop, setShowScrollTop] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        Aos.init({
            duration: 1000,
            once: true,
            easing: 'ease-in-out',
            offset: 100
        });

        const handleScroll = () => {
            if (window.scrollY > 300) {
                setShowScrollTop(true);
            } else {
                setShowScrollTop(false);
            }
        };

        if (isMounted) {
            window.addEventListener("scroll", handleScroll);
        }

        return () => {
            if (isMounted) {
                window.removeEventListener("scroll", handleScroll);
            }
        };
    }, [isMounted]);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    if (!isMounted) {
        return null;
    }

    return (
        <DataContextProvider>
            <DomHead />
            <Layout>
                {/* Add horizontal padding on Container */}
                <Container className="pt-4 px-4 sm:px-6 md:px-8">
                    <Intro />
                    <Projects />
                </Container>
                <Quote />
                <Contact />
                <Footer />

                {/* Back to Top Button - with more gap from left */}
                {showScrollTop && (
                    <button
                        onClick={scrollToTop}
                        className="fixed bottom-5 left-6 sm:left-8 p-3 bg-black text-white rounded-full shadow-lg hover:bg-gray-800 transition-all duration-300 z-40 focus:outline-none focus:ring-2 focus:ring-green-200"
                        aria-label="Scroll to top"
                    >
                        <FaArrowUp size={20} />
                    </button>
                )}
            </Layout>
        </DataContextProvider>
    );
}
