import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Container, DomHead, Footer, NavBar } from "../components"
import { FaArrowLeft } from 'react-icons/fa'
import { ResponsiveNavbar } from '../components/Navbar'
import { FaStar, FaArrowRight } from "react-icons/fa"
import { AiFillGithub } from "react-icons/ai"
import { motion } from 'framer-motion'
import { projects } from "../data/projects.json"
import userInfo from "../data/usersInfo.json"
import Contact from '../components/Contact'
// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
}

const cardHover = {
  scale: 1.03,
  boxShadow: "0px 10px 20px rgba(0,0,0,0.2)",
  transition: {
    duration: 0.3,
    ease: "easeInOut"
  }
}

const cardTap = {
  scale: 0.98,
  transition: {
    duration: 0.2
  }
}

function Projects() {
    const [windowWidth, setWindowWidth] = useState(0)

    useEffect(() => {
        setWindowWidth(window.innerWidth)
        const handleResize = () => setWindowWidth(window.innerWidth)
        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [])

    return (
        <motion.div 
            className="overflow-x-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <DomHead pageName='Projects' />
            <Container>
                <NavBar />
            </Container>
            
            {/* Hero Section */}
            <motion.div 
                id="top-head" 
                className="relative w-full h-[35vh] bg-dark-400 p-3 flex flex-col items-start justify-start"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <Container className="relative">
                    <br />
                                        <br />
                                                            <br />
                    <motion.h1 
                        className="text-[50px] font-bold"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                    >
                        Projects
                    </motion.h1>
                    <motion.p 
                        className="text-[15px] text-white-300"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                    >
                        Here are my completed projects.
                    </motion.p>
                </Container>
            </motion.div>
            
            {/* Projects Content */}
            <motion.div 
                className="w-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
            >
                <Container>
                    {/* Projects Section */}
                    <motion.div 
                        className="w-full py-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.7 }}
                    >
                        <h2 className="text-[20px] text-white-200 px-4 md:px-0">Personal Projects</h2>
                    </motion.div>
                    
                    <motion.div 
                        className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-5"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <ProjectsCard />
                    </motion.div>
                    
                    {/* GitHub Section */}
                    <motion.div 
                        className="w-full py-5"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                    >
                        <h2 className="text-[20px] text-white-200">Github Repos</h2>
                    </motion.div>
                    
                    <motion.div 
                        className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-[50px]"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <GithubRepo />
                    </motion.div>
                </Container>
            </motion.div>

            {/* Contact Section */}
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                <Contact />
            </motion.div>
            
            <Footer />
            {windowWidth <= 700 && <ResponsiveNavbar pageName={"projects"} />}
        </motion.div>
    )
}

function ProjectsCard() {
    return (
        <>
            {projects.length > 0 &&
                projects.map((list, i) => (
                    <motion.div 
                        key={i}
                        className="w-full h-auto bg-dark-200 rounded-[5px] opacity-[.7] hover:opacity-[1] overflow-hidden"
                        variants={itemVariants}
                        whileHover={cardHover}
                        whileTap={cardTap}
                    >
                        <motion.div 
                            className="w-full h-48 bg-cover bg-center rounded-t-[5px]"
                            style={{
                                backgroundImage: `url(${list.imageUrl || "https://www.wallpapertip.com/wmimgs/136-1369543_laptop-coding.jpg"})`
                            }}
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.3 }}
                        />
                        <div className="w-full p-4">
                            <motion.p 
                                className="text-[15px] text-white-200"
                                whileHover={{ color: "#ffffff" }}
                            >
                                {list.title || "Project Title"}
                            </motion.p>
                            <motion.p 
                                className="text-sm text-white-300 mt-2"
                                whileHover={{ color: "#ffffff" }}
                            >
                                {list.description 
                                    ? list.description.length > 150 
                                        ? `${list.description.slice(0, 100)}...` 
                                        : list.description
                                    : "some dummy description"}
                            </motion.p>
                            <div className="flex flex-wrap gap-2 mt-3">
                                {list.tags?.slice(0, 3).map((tag, i) => (
                                    <motion.span 
                                        key={i} 
                                        className="text-[10px] py-[3px] px-[9px] bg-dark-100 rounded-[2px] text-white-100"
                                        whileHover={{ scale: 1.05, backgroundColor: "#2d3748" }}
                                    >
                                        {tag}
                                    </motion.span>
                                ))}
                            </div>
                            {list.project_url && (
                                <motion.div 
                                    className="mt-3 text-right"
                                    whileHover={{ x: 5 }}
                                >
                                    <a 
                                        href={list.project_url} 
                                        className="text-white-200 hover:underline hover:text-white-100 flex items-center justify-end"
                                    >
                                        View
                                        <motion.span
                                            animate={{ x: [0, 5, 0] }}
                                            transition={{ repeat: Infinity, duration: 1.5 }}
                                        >
                                            <FaArrowRight className="ml-2" />
                                        </motion.span>
                                    </a>
                                </motion.div>
                            )}
                        </div>
                    </motion.div>
                ))
            }
        </>
    )
}

function GithubRepo() {
    const [repos, setRepo] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    async function fetchRepos() {
        const url = `https://api.github.com/users/${userInfo.github_username}/repos`
        
        if (localStorage.getItem("user_repos") === null) {
            try {
                setLoading(true)
                const res = await fetch(url)
                const data = await res.json()
                
                if (data && data.length > 0) {
                    localStorage.setItem("user_repos", JSON.stringify(data))
                    setRepo(data)
                } else {
                    setError("No github repo found")
                }
            } catch (err) {
                setError(`FAILED FETCHING REPO'S: ${err.message}`)
            } finally {
                setLoading(false)
            }
        } else {
            const userRepos = JSON.parse(localStorage.getItem("user_repos"))
            setRepo(userRepos)
        }
    }

    useEffect(() => {
        fetchRepos()
    }, [])

    return (
        <>
            {loading ? (
                <motion.div 
                    className="col-span-full text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                >
                    <motion.div
                        className="inline-block"
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                    >
                        <FaArrowRight className="text-green-200 text-2xl" />
                    </motion.div>
                </motion.div>
            ) : error ? (
                <motion.div 
                    className="col-span-full text-center text-red-400"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    {error}
                </motion.div>
            ) : repos.length > 0 ? (
                repos.map((rep, i) => (
                    <motion.div 
                        key={i} 
                        className="w-full h-[180px] bg-dark-200 flex flex-col p-4 rounded-md"
                        variants={itemVariants}
                        whileHover={{
                            y: -5,
                            boxShadow: "0px 10px 20px rgba(0,0,0,0.2)"
                        }}
                    >
                        <motion.h2 
                            className="text-lg"
                            whileHover={{ color: "#ffffff" }}
                        >
                            {rep.name}
                        </motion.h2>
                        <motion.p 
                            className="text-sm text-white-300 mt-2 flex-grow"
                            whileHover={{ color: "#ffffff" }}
                        >
                            {rep.description 
                                ? rep.description.length > 80 
                                    ? `${rep.description.slice(0, 80)}...` 
                                    : rep.description
                                : "No description"}
                        </motion.p>
                        <div className="flex justify-between items-center mt-3">
                            <div className="flex gap-4">
                                <motion.div 
                                    className="flex items-center"
                                    whileHover={{ scale: 1.05 }}
                                >
                                    <FaStar className="text-green-200 mr-1" />
                                    <span className="text-sm text-white-200">{rep.stargazers_count}</span>
                                </motion.div>
                                <motion.div 
                                    className="flex items-center"
                                    whileHover={{ scale: 1.05 }}
                                >
                                    <AiFillGithub className="text-green-200 mr-1" />
                                    <span className="text-sm text-white-200">{rep.forks}</span>
                                </motion.div>
                            </div>
                            <motion.a 
                                href={rep.html_url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="flex items-center text-sm hover:underline"
                                whileHover={{ x: 5 }}
                            >
                                View
                                <motion.span
                                    animate={{ x: [0, 5, 0] }}
                                    transition={{ repeat: Infinity, duration: 1.5 }}
                                >
                                    <FaArrowRight className="ml-1" />
                                </motion.span>
                            </motion.a>
                        </div>
                    </motion.div>
                ))
            ) : (
                <motion.div 
                    className="col-span-full text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                >
                    Opps, No Github Repo was found.
                </motion.div>
            )}
        </>
    )
}

export default Projects