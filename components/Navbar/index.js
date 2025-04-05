import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { FaGithub, FaTwitter } from "react-icons/fa";
import { FiMail } from "react-icons/fi";
import usersInfo from "../../data/usersInfo.json";
import { socials } from "../../data/socials.json";
import avatar from "../../public/images/avatar/avatar.png";

function NavBar() {
    const router = useRouter();
    const [isHidden, setIsHidden] = useState(false);
    const [prevScrollY, setPrevScrollY] = useState(0);

    const isActive = (path) => router.pathname === path;

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // Hide navbar on scroll down, show on scroll up
            if (currentScrollY > prevScrollY && currentScrollY > 50) {
                setIsHidden(true); // scrolling down
            } else {
                setIsHidden(false); // scrolling up
            }

            setPrevScrollY(currentScrollY);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [prevScrollY]);

    return (
        <React.Fragment>
            <div
                className={`navbar relative h-auto w-full flex align-center justify-between py-[20px] transition-transform duration-300 ${
                    isHidden ? "-translate-y-full" : "translate-y-0"
                }`}
            >
                <div className="left w-auto flex align-start items-start justify-start px-[10px]">
                    <p className="font-extrabold mr-[20px]">
                        {usersInfo.name.charAt(0).toUpperCase() + usersInfo.name.slice(1) + "'s Portfolio"}
                    </p>

                    <ul className="relative ml-[10px] hidden md:flex">
                        {[
                            { href: "/", label: "Home" },
                            { href: "/about", label: "About" },
                            { href: "/projects", label: "Projects" },
                            { href: "#contact", label: "Contact" },
                        ].map(({ href, label }) => (
                            <li
                                key={href}
                                className={`
                                    mt-[5px] mr-[10px] mb-[0px] ml-[10px]
                                    transition-all duration-200 ease-in-out
                                    cursor-pointer text-[12px]
                                    hover:text-green-100 hover:font-extrabold
                                    ${isActive(href) ? "text-green-300 font-bold underline underline-offset-4" : ""}
                                `}
                            >
                                <Link href={href}>{label}</Link>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="relative right w-[50vmin] hidden md:flex">
                    <ul className="flex flex-row align-center justify-between items-center">
                        {socials["twitter"] &&
                            <a href={socials["twitter"]} target="_blank" rel="noopener noreferrer" className="w-[100px] text-[17px] flex flex-row align-center justify-center items-center hover:text-white transition-all">
                                <FaTwitter className="mr-[10px]" />
                                <small>Twitter</small>
                            </a>}
                        {socials["github"] &&
                            <a href={socials["github"]} target="_blank" rel="noopener noreferrer" className="w-[100px] text-[17px] flex flex-row align-center justify-center items-center hover:text-white transition-all">
                                <FaGithub className="mr-[10px]" />
                                <small>Github</small>
                            </a>}
                        {socials["email"] &&
                            <a href={`mailto:${socials["email"]}`} className="w-[100px] text-[17px] flex flex-row align-center justify-center items-center hover:text-white transition-all">
                                <FiMail className="mr-[10px]" />
                                <small>Email</small>
                            </a>}
                    </ul>
                </div>

                <div className="absolute top-[15px] right-[25px] md:hidden">
                    <img src={avatar.src} className="w-[40px] rounded-full border-[2px] border-solid border-green-100 bg-dark-100" />
                </div>
            </div>
        </React.Fragment>
    );
}

export default NavBar;

export function ResponsiveNavbar({ activePage, pageName = "" }) {
    const router = useRouter();
    const [active, setActive] = useState(activePage || router.pathname || "home");

    useEffect(() => {
        // Sync with pathname on route change
        const route = router.pathname.split("/")[1] || "home";
        setActive(route);
    }, [router.pathname]);

    function handleActive(e) {
        let tgt = e.target.dataset;
        let parent = e.target.parentElement.dataset;

        const name = tgt.name || parent.name;
        if (name) setActive(name);
    }

    const items = [
        { name: "home", icon: "home-outline", label: "Home", href: "/" },
        { name: "projects", icon: "cube-outline", label: "Projects", href: "/projects" },
        { name: "about", icon: "person-outline", label: "About", href: "/about" },
        { name: "contact", icon: "mail-outline", label: "Contact", href: pageName === "" ? "#contact" : "/#contact" },
    ];

    return (
        <div className="mobileNav fixed bottom-0 left-0 w-full z-50 bg-dark-100 md:hidden shadow-lg">
            <div className="main flex justify-around items-center py-2 px-4">
                {items.map(({ name, icon, label, href }) => (
                    <li key={name}
                        className={`transition-all flex flex-col items-center justify-center px-3 py-1 rounded-lg 
                        ${active === name ? "text-green-300 scale-110 font-bold" : "text-white"} hover:text-green-100`}
                        data-name={name}
                        onClick={handleActive}
                    >
                        <Link href={href}>
                            <ion-icon name={icon} className="text-[22px]"></ion-icon>
                        </Link>
                        <label className="text-[10px]">{label}</label>
                    </li>
                ))}
            </div>
        </div>
    );
}
