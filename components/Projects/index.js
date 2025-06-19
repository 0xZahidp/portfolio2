import { useEffect, useState } from "react";
import Link from "next/link";
import { FaStar, FaArrowRight } from "react-icons/fa";
import { AiFillGithub } from "react-icons/ai";
import Aos from "aos";
import "aos/dist/aos.css";

import { projects } from "../../data/projects.json";
import userInfo from "../../data/usersInfo.json";

function Projects() {
    const [repos, setRepos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        Aos.init({ duration: 600 });
    }, []);

    async function fetchRepos() {
        try {
            const url = `https://api.github.com/users/${userInfo.github_username}/repos`;
            const cachedRepos = localStorage.getItem("user_repos");
            
            if (cachedRepos) {
                setRepos(JSON.parse(cachedRepos));
                setLoading(false);
                return;
            }

            const response = await fetch(url);
            const data = await response.json();

            if (!response.ok) throw new Error(data.message || "Failed to fetch repos");
            if (!data.length) throw new Error("No repositories found");

            localStorage.setItem("user_repos", JSON.stringify(data));
            setRepos(data);
        } catch (err) {
            console.error("GitHub API Error:", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchRepos();
    }, []);

    return (
        <div className="w-full min-h-screen pt-20 pb-20 bg-dark-100">
            {/* Projects Section */}
            <section className="w-full max-w-6xl mx-auto px-4 sm:px-6">
                {/* Projects Header */}
                <div className="flex items-center justify-center mb-12 pt-8">
                    <div className="w-16 h-0.5 bg-green-200 mx-4" data-aos="fade-right"></div>
                    <h2 className="text-2xl font-bold text-white-200" data-aos="fade-up">Featured Projects</h2>
                    <div className="w-16 h-0.5 bg-green-200 mx-4" data-aos="fade-left"></div>
                </div>

                {/* Projects Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16 w-full">
                    {projects.slice(0, 6).map((project, i) => (
                        <ProjectCard key={i} project={project} index={i} />
                    ))}
                </div>

                {/* GitHub Repos Section */}
                <div className="mt-12 w-full">
                    <h3 className="text-xl font-semibold text-white-200 mb-6 text-center">GitHub Repositories</h3>
                    {loading ? (
                        <div className="flex justify-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-200"></div>
                        </div>
                    ) : error ? (
                        <div className="bg-dark-300 p-4 rounded-lg text-red-400 text-center max-w-md mx-auto">
                            <p>{error}</p>
                            <button 
                                onClick={fetchRepos}
                                className="mt-2 text-green-200 hover:underline"
                            >
                                Retry
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
                            <GithubRepos repos={repos} />
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}

function ProjectCard({ project, index }) {
    return (
        <div 
            data-aos="fade-up" 
            data-aos-delay={index * 100}
            className="bg-dark-200 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 w-full"
        >
            <div 
                className="h-48 bg-cover bg-center"
                style={{ 
                    backgroundImage: `url(${project.imageUrl || "/default-project.jpg"})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat"
                }}
            ></div>
            
            <div className="p-5">
                <h3 className="text-lg font-semibold text-white-200 mb-2 line-clamp-1">
                    {project.title || "Project Title"}
                </h3>
                <p className="text-sm text-white-300 mb-4 line-clamp-2">
                    {project.description || "Project description"}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags?.slice(0, 3).map((tag, i) => (
                        <span 
                            key={i} 
                            className="text-xs px-2 py-1 bg-dark-100 text-white-100 rounded"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
                
                {project.project_url && (
                    <a 
                        href={project.project_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-green-200 hover:text-green-300 text-sm"
                    >
                        View Project <FaArrowRight className="ml-1" />
                    </a>
                )}
            </div>
        </div>
    );
}

function GithubRepos({ repos }) {
    if (!repos.length) {
        return (
            <div className="col-span-full text-center py-8">
                <p className="text-white-300">No repositories found</p>
            </div>
        );
    }

    return (
        <>
            {repos.slice(0, 3).map((repo, i) => (
                <div 
                    key={repo.id} 
                    data-aos="fade-up"
                    data-aos-delay={i * 100}
                    className="bg-dark-200 rounded-lg p-5 h-full flex flex-col w-full"
                >
                    <h3 className="text-lg font-medium text-white-200 mb-2 line-clamp-1">
                        {repo.name}
                    </h3>
                    <p className="text-sm text-white-300 flex-grow mb-4 line-clamp-2">
                        {repo.description ? 
                            (repo.description.length > 80 
                                ? `${repo.description.substring(0, 80)}...` 
                                : repo.description) 
                            : "No description"}
                    </p>
                    
                    <div className="flex items-center justify-between mt-auto">
                        <div className="flex space-x-4">
                            <div className="flex items-center text-sm text-white-200">
                                <FaStar className="text-green-200 mr-1" />
                                {repo.stargazers_count}
                            </div>
                            <div className="flex items-center text-sm text-white-200">
                                <AiFillGithub className="text-green-200 mr-1" />
                                {repo.forks}
                            </div>
                        </div>
                        
                        <a 
                            href={repo.html_url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-green-200 hover:text-green-300 text-sm flex items-center"
                        >
                            View <FaArrowRight className="ml-1" />
                        </a>
                    </div>
                </div>
            ))}
        </>
    );
}

export default Projects;