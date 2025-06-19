import { createContext, useEffect, useState } from "react"
import usersInfo from "../data/usersInfo.json"

export const DataContext = createContext(null)

export function DataContextProvider({ children }) {
    const [contactActive, setContactActive] = useState(false)

    async function CronFetch() {
        const minutes = new Date().getMinutes()

        if (localStorage.getItem("cron_time") === null) {
            localStorage.setItem("cron_time", JSON.stringify(minutes))
        }

        const storedMinute = JSON.parse(localStorage.getItem("cron_time"))

        if (storedMinute < minutes) {
            await fetchReposCount()
            await fetchRepos()
        }
    }

    async function fetchReposCount() {
        try {
            let res = await fetch(`https://api.github.com/users/${usersInfo.github_username}`)
            let data = await res.json()

            if (data && data.public_repos !== undefined) {
                const { public_repos, avatar_url } = data;
                localStorage.setItem("repo_counts", JSON.stringify(public_repos))
                localStorage.setItem("github_avatar", JSON.stringify(avatar_url))
                console.log("USER REPOS COUNTS AND AVATAR_URL UPDATED IN BACKGROUND")
            }
        } catch (err) {
            console.error(`FAILED FECTHING: ${err.message}`)
        }
    }

    async function fetchRepos() {
        try {
            let res = await fetch(`https://api.github.com/users/${usersInfo.github_username}/repos`)
            let data = await res.json()

            if (data) {
                localStorage.setItem("user_repo", JSON.stringify(data))
                console.log("USER PUBLIC REPOS UPDATED IN BACKGROUND")
            }
        } catch (err) {
            console.error(`FAILED FETCHING: ${err.message}`)
        }
    }

    useEffect(() => {
        CronFetch()
    }, [])

    function openContactForm() {
        setContactActive(true)
    }

    function closeContactForm() {
        setContactActive(false)
    }

    return (
        <DataContext.Provider value={{ contactActive, openContactForm, closeContactForm }}>
            {children}
        </DataContext.Provider>
    )
}
