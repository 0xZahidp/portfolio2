import { Container } from ".."
import { FaTwitter, FaGithub, FaFacebook } from 'react-icons/fa'
import { AiFillMail } from "react-icons/ai"

import { socials } from "../../data/socials.json"
import usersInfo from "../../data/usersInfo.json"

function Footer() {
  return (
    <div id="footer" className="relative w-screen py-3 px-3 bg-dark-300">
      <Container>
        <div className="flex flex-col items-center">
          <div className="flex flex-row items-center justify-between w-full">
            <div className="left flex flex-row items-center">
              <h1 className="text-[15px]">
                <span className="font-extrabold">{usersInfo.github_username}</span>
              </h1>
            </div>
            <div className="right">
              <div className="socials flex flex-row items-center justify-center">
                {socials.twitter && <SocialLink url={socials.twitter} children={<FaTwitter />} />}
                {socials.github && <SocialLink url={socials.github} children={<FaGithub />} />}
                {socials.email && <SocialLink url={socials.email} children={<AiFillMail />} />}
                {socials.facebook && <SocialLink url={socials.facebook} children={<FaFacebook />} />}
              </div>
            </div>
          </div>
          {/* Centered copyright text */}
          <small className="mt-2 text-white-200 text-center">
            &copy; {new Date().getFullYear()} All Rights Reserved.
          </small>
        </div>
      </Container>
    </div>
  )
}

export default Footer

function SocialLink({ url, children }) {
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className="no-underline text-white-100 decoration-none hover:text-white-100 mr-4">
      {children}
    </a>
  )
}
