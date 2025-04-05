import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Container, DomHead, Footer, NavBar } from "../components";
import { FaArrowLeft, FaCode, FaBriefcase, FaGraduationCap, FaEnvelope, FaLinkedin } from 'react-icons/fa';
import { AiFillGithub } from 'react-icons/ai';
import { motion, useInView } from 'framer-motion';
import userInfo from "../data/usersInfo.json";

function About() {
    const [avatar, setAvatar] = useState(userInfo.avatar);
    const sectionVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    // Refs for scroll animations
    const skillsRef = useRef(null);
    const experienceRef = useRef(null);
    const educationRef = useRef(null);
    const contactRef = useRef(null);

    const skillsInView = useInView(skillsRef, { once: true });
    const experienceInView = useInView(experienceRef, { once: true });
    const educationInView = useInView(educationRef, { once: true });
    const contactInView = useInView(contactRef, { once: true });

    // Fallback to localStorage avatar if available
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const cachedAvatar = localStorage.getItem("github_avatar");
            if (cachedAvatar) setAvatar(cachedAvatar);
        }
    }, []);

    // Dynamic icon renderer for contact links
    const renderIcon = (iconName) => {
        switch (iconName) {
            case 'FaEnvelope': return <FaEnvelope className="mr-2" />;
            case 'AiFillGithub': return <AiFillGithub className="mr-2" />;
            case 'FaLinkedin': return <FaLinkedin className="mr-2" />;
            default: return null;
        }
    };

    return (
        <div className="bg-dark-100 min-h-screen pt-20">
            <DomHead pageName='About' />
            <NavBar />

            {/* Hero Section with adjusted padding */}
            <div className="relative w-full h-[35vh] bg-gradient-to-r from-dark-400 to-dark-600 pt-16 pb-4 px-4">
                <Container className="relative h-full flex flex-col justify-center">
                    <Link href="/" aria-label="Go back to homepage">
                        <FaArrowLeft className="text-white-200 text-2xl p-2 bg-dark-300 rounded-md hover:bg-green-200 transition-colors" />
                    </Link>
                    <h1 className="text-4xl md:text-5xl font-bold mt-4 text-white-100">About Me</h1>
                    <p className="text-white-300 mt-2">{userInfo.tag_line}</p>
                </Container>
            </div>

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
                        {Object.entries(userInfo.skills).map(([category, skills]) => (
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

            {/* Experience Section */}
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
                        {userInfo.experience.map((exp, index) => (
                            <div key={index} className="bg-dark-300 p-6 rounded-lg">
                                <h3 className="text-2xl font-semibold text-white-100">
                                    {exp.position} · <a href={exp.url} target="_blank" rel="noopener" className="text-green-200 hover:underline">{exp.company}</a>
                                </h3>
                                <p className="text-white-300 mt-1">{exp.duration}</p>
                                <p className="text-white-200 mt-3">{exp.description}</p>
                            </div>
                        ))}
                    </div>
                </Container>
            </motion.section>

            {/* Education Section */}
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
                        {userInfo.education.map((edu, index) => (
                            <div key={index} className="bg-dark-400 p-5 rounded-lg">
                                <h3 className="text-xl font-semibold text-white-100">{edu.degree}</h3>
                                <p className="text-white-300 mt-1">{edu.institution}</p>
                                <p className="text-green-200 mt-2">{edu.year}</p>
                            </div>
                        ))}
                    </div>
                </Container>
            </motion.section>

            {/* Contact Section */}
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
                        {userInfo.contact_links.map((link, index) => (
                            <a
                                key={index}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center px-6 py-3 bg-dark-300 rounded-lg text-white-100 hover:bg-green-200 hover:text-dark-100 transition-colors"
                            >
                                {renderIcon(link.icon)}
                                {link.platform}
                            </a>
                        ))}
                        <a
                            href={userInfo.resume_url}
                            className="flex items-center px-6 py-3 border-2 border-green-200 text-green-200 rounded-lg hover:bg-green-200 hover:text-dark-100 transition-colors"
                        >
                            Download Resume
                        </a>
                    </div>
                </Container>
            </motion.section>

            <Footer />
        </div>
    );
}

export default About;