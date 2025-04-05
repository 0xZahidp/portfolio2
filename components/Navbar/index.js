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
            setIsHidden(currentScrollY > prevScrollY && currentScrollY > 50);
            setPrevScrollY(currentScrollY);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [prevScrollY]);

    const navLinks = [
        { href: "/", label: "Home" },
        { href: "/about", label: "About" },
        { href: "/projects", label: "Projects" },
        { href: "#contact", label: "Contact" },
    ];

    const socialLinks = [
        { platform: "twitter", icon: <FaTwitter />, url: socials?.twitter },
        { platform: "github", icon: <FaGithub />, url: socials?.github },
        { platform: "email", icon: <FiMail />, url: socials?.email ? `mailto:${socials.email}` : null },
    ];

    return (
        <nav className={`navbar fixed top-0 left-0 right-0 w-full flex justify-between items-center py-5 px-4 md:px-8 bg-dark-100/90 backdrop-blur-sm z-40 transition-transform duration-300 ${
            isHidden ? "-translate-y-full" : "translate-y-0"
        }`}>
            <div className="flex items-center gap-8">
                <Link href="/" passHref legacyBehavior>
                    <a className="font-bold text-lg hover:text-green-200 transition-colors">
                        {(usersInfo.name || usersInfo.full_name || 'My Portfolio')}'s Portfolio
                    </a>
                </Link>
                
                <ul className="hidden md:flex gap-6">
                    {navLinks.map(({ href, label }) => (
                        <li key={href}>
                            <Link href={href} passHref legacyBehavior>
                                <a className={`text-sm hover:text-green-200 transition-colors ${
                                    isActive(href) ? "text-green-300 font-semibold underline underline-offset-4" : ""
                                }`}>
                                    {label}
                                </a>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="hidden md:flex gap-6">
                {socialLinks.map(({ platform, icon, url }) => (
                    url && (
                        <a 
                            key={platform}
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-sm hover:text-green-200 transition-colors"
                            aria-label={platform}
                        >
                            {icon}
                            <span className="capitalize">{platform}</span>
                        </a>
                    )
                ))}
            </div>

            <div className="md:hidden">
                <img 
                    src={avatar.src} 
                    alt="Profile"
                    className="w-10 h-10 rounded-full border-2 border-green-200 object-cover"
                />
            </div>
        </nav>
    );
}

export default NavBar;

export function ResponsiveNavbar({ pageName = "" }) {
    const router = useRouter();
    const [active, setActive] = useState(router.pathname.split("/")[1] || "home");

    const navItems = [
        { name: "home", icon: "home-outline", label: "Home", href: "/" },
        { name: "projects", icon: "cube-outline", label: "Projects", href: "/projects" },
        { name: "about", icon: "person-outline", label: "About", href: "/about" },
        { name: "contact", icon: "mail-outline", label: "Contact", href: pageName ? `/${pageName}#contact` : "#contact" },
    ];

    return (
        <nav className="fixed bottom-0 left-0 right-0 w-full bg-dark-100/95 backdrop-blur-sm z-50 shadow-lg md:hidden">
            <ul className="flex justify-around py-3">
                {navItems.map(({ name, icon, label, href }) => (
                    <li key={name}>
                        <Link href={href} passHref legacyBehavior>
                            <a 
                                className={`flex flex-col items-center p-2 ${active === name ? "text-green-300" : "text-white"}`}
                                onClick={() => setActive(name)}
                            >
                                <ion-icon name={icon} class="text-xl"></ion-icon>
                                <span className="text-xs mt-1">{label}</span>
                            </a>
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
}