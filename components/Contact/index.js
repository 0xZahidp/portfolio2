import React, { useContext, useState } from 'react'
import { Container } from '..'
import { AiFillMessage, AiOutlineClose } from 'react-icons/ai'
import { DataContext } from '../../context/DataContext'
import emailjs from '@emailjs/browser'
import { Notification, validateEmail } from '../../helpers'
import { EMAILJS_TEMPLATE_ID, EMAILJS_SERVICE_ID, EMAILJS_PUBLIC_KEY } from '../../config'

const notif = new Notification(3000)

function Contact() {
    const context = useContext(DataContext)
    
    const { 
        contactActive = false, 
        closeContactForm = () => console.warn('Context not available'), 
        openContactForm = () => console.warn('Context not available') 
    } = context || {}

    return (
        <div className="w-screen bg-dark-300 h-auto p-2 md:p-5">
            <Container>
                <div className="w-full h-auto flex flex-col items-start justify-start py-[50px] mb-[20px] md:py-5">
                    <h1 data-aos="fade-right" className="text-[30px] font-thin">
                        Let Make The Impossible <span className="text-green-200 font-extrabold">Possible.</span>
                    </h1>
                    <br />
                    <a id="contact"></a>
                    <p data-aos="fade-right" className="text-[20px]">
                        Start by <span className="text-green-200 underline cursor-pointer" onClick={openContactForm}>saying hi</span>
                    </p>
                </div>
            </Container>

            <ContactForm closeContactForm={closeContactForm} contactActive={contactActive} />

            <div id="floating-btn" className="fixed bottom-20 right-5 z-[100] flex flex-col items-center justify-center md:bottom-10">
                <span className="flex flex-col items-center justify-center p-[12px] bg-dark-400 rounded-[50%] border-green-2003 transition-all scale-[.80] hover:scale-[.95] cursor-pointer">
                    <AiFillMessage className="text-[30px] text-green-200" onClick={openContactForm} />
                </span>
            </div>
        </div>
    )
}

function ContactForm({ contactActive, closeContactForm }) {
    const [loading, setLoading] = useState(false)
    const [userInput, setUserInputs] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    })

    function handleInput(e) {
        const inputName = e.target.name
        const inputVal = e.target.value
        setUserInputs(prev => ({
            ...prev,
            [inputName]: inputVal
        }))
    }

    function sendMessage() {
        const { name, email, subject, message } = userInput

        if (name === "") return notif.error("username can't be blank.")
        if (email === "") return notif.error("email can't be blank.")
        if (subject === "") return notif.error("subject can't be blank.")
        if (message === "") return notif.error("message can't be blank.")
        if (!validateEmail(email)) return notif.error("email is invalid.")

        const templateParams = {
            from_name: name,
            sender_email: email,
            subject,
            message
        }

        if (!EMAILJS_TEMPLATE_ID || !EMAILJS_SERVICE_ID || !EMAILJS_PUBLIC_KEY) {
            console.error(`FAILED TO SEND MESSAGE: mis      <Contact />ns.`)
            return notif.error(`FAILED TO SEND MESSAGE: something went wrong.`)
        }

        setLoading(true)
        emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams, EMAILJS_PUBLIC_KEY)
            .then(response => {
                setLoading(false)
                notif.success("MESSAGE SENT.")
                setUserInputs({ name: "", email: "", subject: "", message: "" })
            })
            .catch(err => {
                setLoading(false)
                notif.error(`Something went wrong, could not send message.`)
                console.error(err)
            })
    }

    return (
        <div className="w-screen">
            <div className={`w-[380px] ${contactActive ? "h-[100vh]" : "h-0 overflow-hidden"} max-h-[520px] bg-dark-300 shadow-xl z-[999] fixed bottom-[90px] right-1 px-3 rounded-md transition-all md:right-5 md:bottom-[20px] md:w-[350px]`} id="form">
                <div id="head" className="w-full flex flex-row items-start justify-start">
                    <h1 className="text-[20px] py-4">Contact Me</h1>
                    <AiOutlineClose className={`p-2 text-[35px] absolute top-[-16px] right-[-5px] text-red-200 bg-red-900 rounded-[50%] cursor-pointer ${contactActive ? "flex" : "hidden"}`} onClick={closeContactForm} />
                </div>
                <div id="inputs" className="w-full flex flex-col items-start justify-start">
                    <input
                        type="text"
                        name="name"
                        className="w-full px-2 py-[12px] mb-4 rounded-md bg-dark-100 border-none outline-none"
                        placeholder="Full Name"
                        value={userInput.name}
                        onChange={handleInput}
                    />
                    <input
                        type="email"
                        name="email"
                        className="w-full px-2 py-[12px] mb-4 rounded-md bg-dark-100 border-none outline-none"
                        placeholder="yourmail@mail.com"
                        value={userInput.email}
                        onChange={handleInput}
                    />
                    <input
                        type="text"
                        name="subject"
                        className="w-full px-2 py-[12px] mb-4 rounded-md bg-dark-100 border-none outline-none"
                        placeholder="Subject"
                        value={userInput.subject}
                        onChange={handleInput}
                    />
                    <textarea
                        cols="30"
                        rows="5"
                        name="message"
                        className="w-full h-full bg-dark-100 resize-none rounded-md outline-none px-2 py-2 mb-3"
                        placeholder="Type your message"
                        onChange={handleInput}
                        value={userInput.message}
                    ></textarea>
                    <button
                        className="w-full px-2 py-3 text-center transition-all bg-dark-200 rounded-md hover:bg-dark-400"
                        onClick={sendMessage}
                    >
                        {loading ? <span className="text-green-200">Sending Message..</span> : "Send Message"}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Contact