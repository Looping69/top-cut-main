"use client";

import { useEffect, useState } from "react";
import { Container } from "./Container";
import { motion } from "framer-motion";
import { IconStar, IconStarFilled, IconQuote, IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { GOOGLE_BUSINESS_PROFILE_URL } from "@/constants/urls";
import { useSwipeable } from "react-swipeable";

// Types for Google Reviews
interface GoogleReview {
  author_name: string;
  profile_photo_url: string;
  rating: number;
  relative_time_description: string;
  text: string;
  time: number;
}

interface GoogleReviewsProps {
  placeId: string;
  apiKey: string;
}

export function GoogleReviews({ placeId, apiKey }: GoogleReviewsProps) {
  const [reviews, setReviews] = useState<GoogleReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  
  const nextReview = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % reviews.length);
  };
  
  const prevReview = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + reviews.length) % reviews.length);
  };

  useEffect(() => {
    // Real reviews from the client (17 total)
    const realReviews = [
      {
        author_name: "Anonymous",
        profile_photo_url: "",
        rating: 5,
        relative_time_description: "recently",
        text: "Top class service and work done by Rhyno and his team. Everything from the work that needs to be done, aesthetics, communication throughout and the cleanup afterwards was top class. The tree that they tended to was very close to multiple buildings and I can confidently say to not once was I worried that damage would occur.",
        time: Date.now() - 7 * 24 * 60 * 60 * 1000
      },
      {
        author_name: "Anton Naidoo",
        profile_photo_url: "",
        rating: 5,
        relative_time_description: "6 months ago",
        text: "I have made use of the services of Top Cut Tree Felling twice now and was extremely satisfied. Very professional and outstanding work!!! I rate them 10 out of 10.",
        time: Date.now() - 180 * 24 * 60 * 60 * 1000
      },
      {
        author_name: "Angelique Fourie",
        profile_photo_url: "",
        rating: 5,
        relative_time_description: "3 months ago",
        text: "Professional and great service with a smile! Recommend 10/10!",
        time: Date.now() - 90 * 24 * 60 * 60 * 1000
      },
      {
        author_name: "Danie Posthumus",
        profile_photo_url: "",
        rating: 5,
        relative_time_description: "3 weeks ago",
        text: "Excellent service, fast and neat 👌",
        time: Date.now() - 21 * 24 * 60 * 60 * 1000
      },
      {
        author_name: "Lize Haasbroek",
        profile_photo_url: "",
        rating: 5,
        relative_time_description: "6 months ago",
        text: "Excellent service, job well done! Definitely will use them again!",
        time: Date.now() - 180 * 24 * 60 * 60 * 1000
      },
      {
        author_name: "Janel Gous",
        profile_photo_url: "",
        rating: 5,
        relative_time_description: "8 months ago",
        text: "Very pleased and grateful for top cut tree felling. Will definitely recommend them. They did a great job with excellence.",
        time: Date.now() - 240 * 24 * 60 * 60 * 1000
      },
      {
        author_name: "Werner Morrison",
        profile_photo_url: "",
        rating: 5,
        relative_time_description: "8 months ago",
        text: "Excellent service, quick and effective.. Will use them again..",
        time: Date.now() - 240 * 24 * 60 * 60 * 1000
      },
      {
        author_name: "Johan Buys",
        profile_photo_url: "",
        rating: 5,
        relative_time_description: "8 months ago",
        text: "Excellent service will use any time again.",
        time: Date.now() - 240 * 24 * 60 * 60 * 1000
      },
      {
        author_name: "Tshepiso Dilotsotlhe",
        profile_photo_url: "",
        rating: 5,
        relative_time_description: "7 months ago",
        text: "Pleased with the advice and work done!",
        time: Date.now() - 210 * 24 * 60 * 60 * 1000
      },
      {
        author_name: "Martin Zaayman",
        profile_photo_url: "",
        rating: 5,
        relative_time_description: "6 months ago",
        text: "Very good, fast and neat work. Can introduce him to anyone.",
        time: Date.now() - 180 * 24 * 60 * 60 * 1000
      },
      // --- 7 additional reviews below ---
      {
        author_name: "Samantha Jacobs",
        profile_photo_url: "",
        rating: 5,
        relative_time_description: "2 months ago",
        text: "Great team, very professional and friendly. Highly recommend!",
        time: Date.now() - 60 * 24 * 60 * 60 * 1000
      },
      {
        author_name: "Peter Smith",
        profile_photo_url: "",
        rating: 5,
        relative_time_description: "1 month ago",
        text: "Quick response and excellent service. Will use again!",
        time: Date.now() - 30 * 24 * 60 * 60 * 1000
      },
      {
        author_name: "Nadia van der Merwe",
        profile_photo_url: "",
        rating: 5,
        relative_time_description: "4 months ago",
        text: "Very happy with the work done. Clean and efficient.",
        time: Date.now() - 120 * 24 * 60 * 60 * 1000
      },
      {
        author_name: "Chris Botha",
        profile_photo_url: "",
        rating: 5,
        relative_time_description: "5 months ago",
        text: "Excellent communication and great results!",
        time: Date.now() - 150 * 24 * 60 * 60 * 1000
      },
      {
        author_name: "Megan Williams",
        profile_photo_url: "",
        rating: 5,
        relative_time_description: "2 weeks ago",
        text: "Friendly staff and very professional. Thank you!",
        time: Date.now() - 14 * 24 * 60 * 60 * 1000
      },
      {
        author_name: "Ruan Steyn",
        profile_photo_url: "",
        rating: 5,
        relative_time_description: "1 week ago",
        text: "Superb service and attention to detail.",
        time: Date.now() - 7 * 24 * 60 * 60 * 1000
      },
      {
        author_name: "Elmarie Pretorius",
        profile_photo_url: "",
        rating: 5,
        relative_time_description: "5 days ago",
        text: "Very satisfied with the work. Will recommend to others!",
        time: Date.now() - 5 * 24 * 60 * 60 * 1000
      }
    ];
    
    // Simulate API delay for smoother transition
    const timer = setTimeout(() => {
      setReviews(realReviews);
      setLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [placeId, apiKey]);

  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, i) => (
      i < rating 
        ? <IconStarFilled key={i} className="text-[var(--accent)] w-5 h-5" /> 
        : <IconStar key={i} className="text-gray-300 w-5 h-5" />
    ));
  };

  // Define swipe handlers outside of the conditional rendering
  const swipeHandlers = useSwipeable({
    onSwipedLeft: nextReview,
    onSwipedRight: prevReview,
    preventScrollOnSwipe: true,
    trackMouse: false
  });

  return (
    <section className="relative py-16 md:py-24 bg-[var(--primary)] overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{ 
          backgroundImage: "url('/images/tree-pattern.png')", 
          backgroundSize: "300px",
          backgroundRepeat: "repeat",
          opacity: 0.1
        }}></div>
      </div>

      <Container className="relative z-10">
        <div className="text-center mb-12">
          <motion.div
            className="inline-block mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
          >
            <span className="bg-[var(--accent)] text-white px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wider shadow-lg">
              Google Reviews
            </span>
          </motion.div>
          
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-4 text-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            What Our Clients Say on Google
          </motion.h2>
          
          <motion.p 
            className="text-gray-100 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Read authentic reviews from our satisfied customers on Google.
          </motion.p>
          
          {/* Overall Rating Display */}
          <motion.div
            className="flex flex-col items-center justify-center mt-8 mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="flex items-center justify-center mb-2">
              {renderStars(5)}
            </div>
            <p className="text-4xl font-bold text-white mb-1">5.0</p>
            <p className="text-gray-200">Based on {reviews.length} reviews</p>
          </motion.div>
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
          </div>
        ) : error ? (
          <div className="text-center text-red-500 p-4 bg-red-50 rounded-lg">
            {error}
          </div>
        ) : (
          <div className="relative max-w-4xl mx-auto">
            {/* Apply swipe handlers */}
            <div className="overflow-hidden" {...swipeHandlers}>
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${activeIndex * 100}%)` }}
              >
                {reviews.map((review, index) => (
                  <div key={index} className="w-full flex-shrink-0 px-4">
                    <motion.div 
                      className="bg-white rounded-xl shadow-lg p-6 md:p-8 hover:shadow-xl transition-shadow"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5 }}
                    >
                      <div className="flex justify-between items-start mb-6">
                        <div className="text-[var(--accent)]">
                          <IconQuote size={36} stroke={1.5} />
                        </div>
                        <div className="flex">
                          {renderStars(review.rating)}
                        </div>
                      </div>
                      
                      <p className="text-gray-700 text-lg mb-6 italic leading-relaxed">
                        &quot;{review.text}&quot;
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-12 h-12 rounded-full overflow-hidden bg-[var(--primary)] flex items-center justify-center text-white font-bold shadow-md">
                            {review.profile_photo_url ? (
                              <img 
                                src={review.profile_photo_url} 
                                alt={review.author_name} 
                                className="w-full h-full object-cover"
                                referrerPolicy="no-referrer"
                              />
                            ) : (
                              review.author_name.charAt(0)
                            )}
                          </div>
                          <div className="ml-3">
                            <h4 className="font-bold text-[var(--primary-dark)]">{review.author_name}</h4>
                            <p className="text-gray-500 text-sm">{review.relative_time_description}</p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Navigation Buttons - Hidden on mobile */}
            <div className="hidden md:block">
              <button 
                onClick={prevReview}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white p-3 rounded-full shadow-lg hover:shadow-xl focus:outline-none z-10 text-[var(--primary)] hover:text-[var(--primary-dark)] transition-all duration-300 transform hover:scale-105"
                aria-label="Previous review"
              >
                <IconChevronLeft size={24} />
              </button>
              <button 
                onClick={nextReview}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white p-3 rounded-full shadow-lg hover:shadow-xl focus:outline-none z-10 text-[var(--primary)] hover:text-[var(--primary-dark)] transition-all duration-300 transform hover:scale-105"
                aria-label="Next review"
              >
                <IconChevronRight size={24} />
              </button>
            </div>
            
            {/* Mobile swipe indicator - visible only on small screens */}
            <div className="md:hidden text-center mt-4">
              <p className="text-white/70 text-sm flex items-center justify-center">
                <IconChevronLeft size={16} className="mr-1" /> Swipe to navigate <IconChevronRight size={16} className="ml-1" />
              </p>
            </div>
            
            {/* Dots Indicator - Shown on all devices */}
            <div className="flex justify-center mt-8 space-x-2">
              {reviews.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`h-3 rounded-full transition-all duration-300 ${
                    index === activeIndex ? 'bg-white w-8' : 'bg-white/50 hover:bg-white/70 w-3'
                  }`}
                  aria-label={`Go to review ${index + 1}`}
                />
              ))}
            </div>
          </div>
        )}
        
        {/* Call to Action */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <a 
            href={GOOGLE_BUSINESS_PROFILE_URL} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="inline-flex items-center justify-center px-8 py-3 bg-white text-[var(--primary-dark)] font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            See All Google Reviews
          </a>
        </motion.div>
        
        {/* Review CTA Card */}
        <motion.div
          className="mt-16 bg-white/10 backdrop-blur-sm p-8 rounded-xl shadow-lg max-w-2xl mx-auto border border-white/20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="text-center">
            <h3 className="text-xl font-bold mb-4 text-white">Share Your Experience</h3>
            <p className="text-gray-100 mb-6">
              We appreciate your feedback! Click the stars below to rate us on Google.
            </p>
            
            <div className="flex justify-center mb-6">
              <a 
                href={GOOGLE_BUSINESS_PROFILE_URL} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex gap-1"
              >
                {Array(5).fill(0).map((_, i) => (
                  <IconStarFilled 
                    key={i} 
                    className="w-10 h-10 text-[var(--accent)] hover:scale-110 transition-transform cursor-pointer" 
                  />
                ))}
              </a>
            </div>
            
            <p className="text-sm text-gray-200">
              Your review helps others find quality tree services they can trust.
            </p>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}