import React, { useState, useEffect, useRef } from 'react';
import { Container, DomHead, Footer, NavBar } from "../components";
import { FaCode, FaBriefcase, FaGraduationCap, FaEnvelope, FaLinkedin } from 'react-icons/fa';
import { AiFillGithub } from 'react-icons/ai';
import { motion, useInView } from 'framer-motion';
import userInfo from "../data/usersInfo.json";
import { ResponsiveNavbar } from "../components/Navbar";

function About() {
    const [avatar, setAvatar] = useState(userInfo.avatar || "");
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    const sectionVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    const skillsRef = useRef(null);
    const experienceRef = useRef(null);
    const educationRef = useRef(null);
    const contactRef = useRef(null);

    const skillsInView = useInView(skillsRef, { once: true });
    const experienceInView = useInView(experienceRef, { once: true });
    const educationInView = useInView(educationRef, { once: true });
    const contactInView = useInView(contactRef, { once: true });

    useEffect(() => {
        const cachedAvatar = localStorage.getItem("github_avatar");
        if (cachedAvatar) setAvatar(cachedAvatar);
    }, []);

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const iconMap = {
        FaEnvelope: <FaEnvelope className="mr-2" />,
        AiFillGithub: <AiFillGithub className="mr-2" />,
        FaLinkedin: <FaLinkedin className="mr-2" />,
    };

    return (
        <div className="bg-dark-100 min-h-screen pt-20">
            <DomHead pageName='About' />
            <NavBar />

            {/* Hero Section */}
            <Container>
                <motion.h1 
                    className="text-[36px] sm:text-[44px] md:text-[50px] font-bold"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                >
                    About Me
                </motion.h1>
                <motion.p 
                    className="text-[15px] text-white-300"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                >
                    Wow! You have found my about page. Here you can learn more about my skills, experience, and education. Feel free to connect!
                </motion.p>
            </Container>

            {/* Bio Section */}
            <Container className="py-10">
                <div className="flex flex-col md:flex-row gap-8 items-center">
                    <div className="w-full md:w-1/3">
                        <div 
                            className="w-full h-64 md:h-80 bg-cover bg-center rounded-lg border-4 border-green-200 shadow-lg"
                            style={{ backgroundImage: `url(${avatar})` }}
                        />
                    </div>
                    <div className="w-full md:w-2/3">
                        <h1 className="text-3xl font-bold mb-4 text-white-100">
                            {userInfo.full_name}
                        </h1>
                        <p className="text-white-200 p-4 bg-dark-300 border-l-4 border-green-200 italic">
                            {userInfo.intro_tagline}
                        </p>
                        <p className="text-white-200 mt-6">{userInfo.bio_desc}</p>
                    </div>
                </div>
            </Container>

            {/* Skills Section */}
            <motion.section
                ref={skillsRef}
                variants={sectionVariants}
                initial="hidden"
                animate={skillsInView ? "visible" : "hidden"}
                className="py-12 bg-dark-300"
            >
                <Container>
                    <h2 className="text-3xl font-bold flex items-center text-white-100">
                        <FaCode className="mr-2 text-green-200" /> Skills
                    </h2>
                    <div className="mt-6">
                        {Object.entries(userInfo.skills || {}).map(([category, skills]) => (
                            <div key={category} className="mb-6">
                                <h3 className="text-xl font-semibold text-white-200 mb-3 capitalize">
                                    {category}
                                </h3>
                                <div className="flex flex-wrap gap-3">
                                    {skills.map((skill) => (
                                        <span 
                                            key={skill} 
                                            className="px-4 py-2 bg-dark-200 rounded-lg text-white-100 hover:bg-green-200 hover:text-dark-100 transition-colors"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </Container>
            </motion.section>

            {/* Experience */}
            <motion.section
                ref={experienceRef}
                variants={sectionVariants}
                initial="hidden"
                animate={experienceInView ? "visible" : "hidden"}
                className="py-12"
            >
                <Container>
                    <h2 className="text-3xl font-bold flex items-center text-white-100">
                        <FaBriefcase className="mr-2 text-green-200" /> Experience
                    </h2>
                    <div className="mt-6 space-y-8">
                        {userInfo.experience?.map((exp, index) => (
                            <div key={index} className="bg-dark-300 p-6 rounded-lg">
                                <h3 className="text-2xl font-semibold text-white-100">
                                    {exp.position} · <a href={exp.url} target="_blank" rel="noopener noreferrer" className="text-green-200 hover:underline">{exp.company}</a>
                                </h3>
                                <p className="text-white-300 mt-1">{exp.duration}</p>
                                <p className="text-white-200 mt-3">{exp.description}</p>
                            </div>
                        ))}
                    </div>
                </Container>
            </motion.section>

            {/* Education */}
            <motion.section
                ref={educationRef}
                variants={sectionVariants}
                initial="hidden"
                animate={educationInView ? "visible" : "hidden"}
                className="py-12 bg-dark-300"
            >
                <Container>
                    <h2 className="text-3xl font-bold flex items-center text-white-100">
                        <FaGraduationCap className="mr-2 text-green-200" /> Education
                    </h2>
                    <div className="mt-6 space-y-6">
                        {userInfo.education?.map((edu, index) => (
                            <div key={index} className="bg-dark-400 p-5 rounded-lg">
                                <h3 className="text-xl font-semibold text-white-100">{edu.degree}</h3>
                                <p className="text-white-300 mt-1">{edu.institution}</p>
                                <p className="text-green-200 mt-2">{edu.year}</p>
                            </div>
                        ))}
                    </div>
                </Container>
            </motion.section>

            {/* Contact */}
            <motion.section
                ref={contactRef}
                variants={sectionVariants}
                initial="hidden"
                animate={contactInView ? "visible" : "hidden"}
                className="py-12"
                id="contact"
            >
                <Container>
                    <h2 className="text-3xl font-bold flex items-center text-white-100">
                        <FaEnvelope className="mr-2 text-green-200" /> Contact
                    </h2>
                    <p className="text-white-200 mt-3">Let's collaborate! Reach out via:</p>
                    <div className="mt-6 flex flex-wrap gap-4">
                        {userInfo.contact_links?.map((link, index) => (
                            <a
                                key={index}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center px-6 py-3 bg-dark-300 rounded-lg text-white-100 hover:bg-green-200 hover:text-dark-100 transition-colors"
                            >
                                {iconMap[link.icon] || null}
                                {link.platform}
                            </a>
                        ))}
                        {userInfo.resume_url && (
                            <a
                                href={userInfo.resume_url}
                                className="flex items-center px-6 py-3 border-2 border-green-200 text-green-200 rounded-lg hover:bg-green-200 hover:text-dark-100 transition-colors"
                            >
                                Download Resume
                            </a>
                        )}
                    </div>
                </Container>
            </motion.section>

            <Footer />
            {windowWidth <= 700 && <ResponsiveNavbar pageName={"about"} />}
        </div>
    );
}

export default About;