import React from 'react';
import { Container } from '..';
import { FaStar, FaQuoteRight } from "react-icons/fa";
import userInfo from "../../data/usersInfo.json";

function Quote() {
    // Check if quote exists before rendering
    if (!userInfo?.favorites_quote || !userInfo?.github_username) {
        return null; // Or render a fallback UI
    }

    return (
        <section className="w-full bg-dark-200 py-12 md:py-16">
            <Container>
                <div className="flex flex-col items-center text-center md:flex-row md:justify-center md:items-center md:space-x-8">
                    <h1 data-aos="fade-right" className="text-3xl md:text-4xl font-bold mb-4 md:mb-0">
                        Favorite Quote
                    </h1>
                    <p data-aos="fade-left" className="text-sm text-white-200">
                        My favorite motivational quote
                    </p>
                </div>
                
                <div className="w-full mt-12 md:mt-16 relative">
                    <QuoteCard />
                </div>
            </Container>
        </section>
    );
}

function QuoteCard() {
    return (
        <div className="relative bg-dark-300 px-6 py-8 md:px-12 md:py-10 rounded-lg overflow-hidden">
            <FaQuoteRight 
                data-aos="fade-left" 
                className="absolute top-4 right-4 text-3xl text-white-300 opacity-30 md:top-6 md:right-6" 
            />
            
            <div className="flex items-center">
                <StarRatings count={5} size={4} />
                <span className="ml-2 text-white-300 font-bold">
                    {userInfo.github_username?.charAt(0).toUpperCase() + userInfo.github_username?.slice(1) || 'Anonymous'}
                </span>
            </div>
            
            <blockquote className="mt-6 text-white-200 text-lg md:text-xl italic">
                {userInfo.favorites_quote || "No quote available"}
            </blockquote>
        </div>
    );
}

function StarRatings({ count = 5, size = 4 }) {
    return (
        <div className="flex items-center">
            {[...Array(count)].map((_, i) => (
                <FaStar key={i} className="text-green-200 text-xs md:text-sm" />
            ))}
            <span className="ml-2 text-white-200">{count}.0</span>
        </div>
    );
}

export default Quote;