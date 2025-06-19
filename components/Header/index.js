import { useState, useEffect } from "react";
import { Container } from "..";
import userAvatar from "../../public/images/avatar/avatar.png";
import usersInfo from "../../data/usersInfo.json";
import languages from "../../data/languages.json";
import { motion, AnimatePresence } from "framer-motion";
import { FaDownload, FaTimes } from "react-icons/fa";

export default function Header() {
    const [resumeActive, setResumeActive] = useState(false);
    const [reposCount, setReposCount] = useState(0);
    const [avatar, setAvatar] = useState(userAvatar.src);
    const userName = usersInfo.github_username;
    const resume = usersInfo.resume_url || "/CV/resume.pdf";

    // Animation variants
    const fadeUp = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    const scaleIn = {
        hidden: { scale: 0.9, opacity: 0 },
        visible: { scale: 1, opacity: 1, transition: { duration: 0.5 } }
    };

    async function getReposCount() {
        if (!userName) {
            console.error("GitHub username is missing");
            return;
        }

        try {
            let publicRepos = 0;
            let avatarUrl = userAvatar.src;

            if (localStorage.getItem("repo_counts") === null) {
                const response = await fetch(`https://api.github.com/users/${userName}`);
                if (!response.ok) throw new Error('GitHub API error');
                
                const data = await response.json();
                publicRepos = data.public_repos || 0;
                avatarUrl = data.avatar_url || userAvatar.src;
                
                localStorage.setItem("repo_counts", publicRepos.toString());
                localStorage.setItem("github_avatar", avatarUrl);
            } else {
                publicRepos = parseInt(localStorage.getItem("repo_counts")) || 0;
                avatarUrl = localStorage.getItem("github_avatar") || userAvatar.src;
            }

            setReposCount(publicRepos);
            setAvatar(avatarUrl);
        } catch (error) {
            console.error("Failed to fetch GitHub data:", error);
        }
    }

    useEffect(() => {
        getReposCount();
    }, [userName]);

    const experienceYears = usersInfo.tech_year 
        ? new Date().getFullYear() - parseInt(usersInfo.tech_year) 
        : 1;

    return (
        <header className="w-full min-h-[calc(100vh-80px)] pt-20 bg-dark-200 relative">
            <Container>
                <div className="flex flex-col md:flex-row items-center justify-between py-10 md:py-16 gap-8">
                    {/* Left Column - Content */}
                    <motion.div 
                        initial="hidden"
                        animate="visible"
                        variants={fadeUp}
                        className="w-full md:w-1/2 space-y-6"
                    >
                        <motion.span 
                            variants={fadeUp}
                            className="inline-block px-3 py-1 bg-green-600 text-green-100 rounded-md text-sm font-medium"
                        >
                            {usersInfo.user_skill}
                        </motion.span>

                        <motion.h1 
                            variants={fadeUp}
                            className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
                        >
                            {usersInfo.tag_line}
                        </motion.h1>

                        <motion.p 
                            variants={fadeUp}
                            className="text-lg md:text-xl text-white-300"
                        >
                            {usersInfo.subTitle}
                        </motion.p>

                        <motion.div 
                            variants={fadeUp}
                            className="flex gap-8 mt-8"
                        >
                            <div className="flex items-center">
                                <span className="text-3xl md:text-4xl font-bold mr-3">
                                    {experienceYears}+
                                </span>
                                <span className="text-sm text-white-300">
                                    Years of Experience
                                </span>
                            </div>
                            <div className="flex items-center">
                                <span className="text-3xl md:text-4xl font-bold mr-3">
                                    {reposCount}+
                                </span>
                                <span className="text-sm text-white-300">
                                    Projects
                                </span>
                            </div>
                        </motion.div>

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setResumeActive(true)}
                            className="mt-6 px-6 py-3 border-2 border-green-200 text-green-200 rounded-full font-medium hover:bg-green-200 hover:text-dark-100 transition-all"
                        >
                            View Resume
                        </motion.button>
                    </motion.div>

                    {/* Right Column - Avatar */}
                    <motion.div 
                        initial="hidden"
                        animate="visible"
                        variants={scaleIn}
                        className="relative w-full md:w-1/2 flex justify-center"
                    >
                        <div className="relative">
                            <motion.div
                                animate={{
                                    rotate: [0, 5, -5, 0],
                                    transition: { 
                                        duration: 8,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }
                                }}
                                className="w-56 h-56 md:w-64 md:h-64 rounded-full bg-gradient-to-br from-green-200 to-dark-300 p-1"
                            >
                                <div 
                                    className="w-full h-full rounded-full bg-cover bg-center"
                                    style={{ backgroundImage: `url(${avatar})` }}
                                />
                            </motion.div>

                            {/* Language Icons */}
                            {languages.languages.slice(0, 3).map((lang, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{
                                        delay: 0.3 + (index * 0.2),
                                        type: "spring",
                                        stiffness: 100
                                    }}
                                    className={`absolute ${index === 0 ? '-top-4 -right-4' : index === 1 ? 'bottom-8 -left-4' : '-bottom-4 right-8'} w-14 h-14 md:w-16 md:h-16 bg-dark-300 rounded-full flex items-center justify-center shadow-lg border-2 border-green-200`}
                                >
                                    <img 
                                        src={lang} 
                                        alt="Language" 
                                        className="w-7 h-7 md:w-8 md:h-8 object-contain"
                                    />
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </Container>

            {/* Resume Modal */}
            <AnimatePresence>
                {resumeActive && (
                    <ResumeViewer 
                        onClose={() => setResumeActive(false)} 
                        resume={resume} 
                    />
                )}
            </AnimatePresence>
        </header>
    );
}

function ResumeViewer({ onClose, resume }) {
    const downloadResume = () => {
        const link = document.createElement("a");
        link.href = resume;
        link.download = "resume.pdf";
        link.click();
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-dark-400/90 z-50 flex items-center justify-center p-4"
        >
            <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 50, opacity: 0 }}
                className="w-full max-w-4xl bg-dark-100 rounded-lg overflow-hidden shadow-2xl"
            >
                <div className="flex justify-between items-center p-4 bg-dark-200">
                    <h2 className="text-xl font-bold">My Resume</h2>
                    <div className="flex gap-2">
                        <button
                            onClick={downloadResume}
                            className="flex items-center gap-2 px-4 py-2 bg-green-200 text-dark-100 rounded-md hover:bg-green-300 transition-colors"
                        >
                            <FaDownload /> Download
                        </button>
                        <button
                            onClick={onClose}
                            className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                        >
                            <FaTimes /> Close
                        </button>
                    </div>
                </div>
                <div className="h-[80vh]">
                    <iframe 
                        src={resume} 
                        className="w-full h-full border-none"
                        title="Resume"
                    />
                </div>
            </motion.div>
        </motion.div>
    );
}