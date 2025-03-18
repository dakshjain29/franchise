// import React, { useState, useEffect } from 'react';
// import { motion, useAnimation } from 'framer-motion';
// import { useInView } from 'react-intersection-observer';
// import './TestimonialsSection.css';

// const testimonials = [
//   {
//     id: 1,
//     name: "Sarah Johnson",
//     role: "Franchise Owner, New York",
//     image: "/images/testimonial-sarah.jpg",
//     quote: "Joining the FranchiseHub network was the best business decision I've made. Their management system streamlined all my operations, and my revenue increased by 35% in just six months!",
//     rating: 5
//   },
//   {
//     id: 2,
//     name: "Michael Chen",
//     role: "Multi-Location Franchisee, California",
//     image: "/images/testimonial-michael.jpg",
//     quote: "As someone managing three different locations, I needed a solution that could help me keep everything organized. FranchiseHub delivered beyond my expectations. The centralized dashboard and automated reporting save me countless hours every week.",
//     rating: 5
//   },
//   {
//     id: 3,
//     name: "Priya Patel",
//     role: "New Franchise Owner, Texas",
//     image: "/images/testimonial-priya.jpg",
//     quote: "I was nervous about starting my first franchise, but the onboarding process and support from FranchiseHub made it seamless. Their training resources and community of owners have been invaluable to my success.",
//     rating: 4.5
//   },
//   {
//     id: 4,
//     name: "Robert Williams",
//     role: "Franchise Owner, Florida",
//     image: "/images/testimonial-robert.jpg",
//     quote: "The marketing tools and analytics provided by FranchiseHub helped me identify untapped opportunities in my area. I've seen a consistent growth in customer acquisition since implementing their strategies.",
//     rating: 5
//   }
// ];

// const TestimonialsSection = () => {
//   const [activeIndex, setActiveIndex] = useState(0);
//   const controls = useAnimation();
//   const [ref, inView] = useInView({
//     threshold: 0.25,
//     triggerOnce: true
//   });

//   useEffect(() => {
//     if (inView) {
//       controls.start('visible');
//     }
//   }, [controls, inView]);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
//     }, 5000);
//     return () => clearInterval(interval);
//   }, []);

//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.3
//       }
//     }
//   };

//   const itemVariants = {
//     hidden: { y: 50, opacity: 0 },
//     visible: {
//       y: 0,
//       opacity: 1,
//       transition: {
//         duration: 0.8,
//         ease: "easeOut"
//       }
//     }
//   };

//   const renderStars = (rating) => {
//     const stars = [];
//     const fullStars = Math.floor(rating);
//     const hasHalfStar = rating % 1 !== 0;

//     for (let i = 0; i < fullStars; i++) {
//       stars.push(<span key={`star-${i}`} className="star full-star">★</span>);
//     }

//     if (hasHalfStar) {
//       stars.push(<span key="half-star" className="star half-star">★</span>);
//     }

//     const emptyStars = 5 - stars.length;
//     for (let i = 0; i < emptyStars; i++) {
//       stars.push(<span key={`empty-star-${i}`} className="star empty-star">★</span>);
//     }

//     return stars;
//   };

//   const handleDotClick = (index) => {
//     setActiveIndex(index);
//   };

//   return (
//     <section id="testimonials" className="testimonials-section">
//       <motion.div
//         ref={ref}
//         initial="hidden"
//         animate={controls}
//         variants={containerVariants}
//         className="testimonials-container"
//       >
//         <motion.h2 variants={itemVariants} className="section-title">
//           Success Stories
//         </motion.h2>
//         <motion.div variants={itemVariants} className="section-subtitle">
//           Hear from our thriving franchise owners
//         </motion.div>

//         <motion.div 
//           className="testimonials-carousel"
//           variants={itemVariants}
//         >
//           <div className="testimonials-track" style={{ transform: `translateX(-${activeIndex * 100}%)` }}>
//             {testimonials.map((testimonial) => (
//               <div key={testimonial.id} className="testimonial-card">
//                 <div className="testimonial-content">
//                   <div className="quote-icon">"</div>
//                   <p className="testimonial-quote">{testimonial.quote}</p>
//                   <div className="testimonial-rating">
//                     {renderStars(testimonial.rating)}
//                   </div>
//                 </div>
//                 <div className="testimonial-author">
//                   <div className="author-image">
//                     <img src={testimonial.image} alt={testimonial.name} />
//                   </div>
//                   <div className="author-info">
//                     <h4 className="author-name">{testimonial.name}</h4>
//                     <p className="author-role">{testimonial.role}</p>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>

//           <div className="carousel-controls">
//             <div className="carousel-dots">
//               {testimonials.map((_, index) => (
//                 <button
//                   key={index}
//                   className={`carousel-dot ${index === activeIndex ? 'active' : ''}`}
//                   onClick={() => handleDotClick(index)}
//                   aria-label={`Go to testimonial ${index + 1}`}
//                 />
//               ))}
//             </div>
//           </div>
//         </motion.div>

//         <motion.div variants={itemVariants} className="cta-container">
//           <p className="cta-text">Ready to join our successful franchise network?</p>
//           <a href="#register" className="cta-button">Start Your Journey Today</a>
//         </motion.div>
//       </motion.div>
//     </section>
//   );
// };

// export default TestimonialsSection;

import React, { useState, useEffect } from 'react';

const TestimonialsSection = () => {
  const testimonials = [
    {
      id: 1,
      text: "The level of service I received from this team was exceptional. They understood exactly what I needed and delivered a solution that exceeded my expectations. My website now generates three times the leads it did before.",
      author: "Alex Johnson",
      position: "CEO, Bright Ideas Marketing",
      avatar: "/api/placeholder/64/64"
    },
    {
      id: 2,
      text: "I was hesitant about redesigning our company website, but this team made the process painless. Their attention to detail and responsive communication kept everything on track. The final result is stunning and has received countless compliments.",
      author: "Sarah Williams",
      position: "Director, Innovate Solutions",
      avatar: "/api/placeholder/64/64"
    },
    {
      id: 3,
      text: "Working with this team was the best decision we made for our business. They helped us create a website that truly represents our brand and connects with our target audience. Our online sales have increased by 45% since launch.",
      author: "Michael Chen",
      position: "Founder, Digital Horizons",
      avatar: "/api/placeholder/64/64"
    },
    {
      id: 4,
      text: "As a small business owner with limited technical knowledge, I appreciated how patient and thorough the team was in explaining everything. They created a website that's not only beautiful but also easy for me to update myself.",
      author: "Jennifer Rodriguez",
      position: "Owner, Handcrafted Treasures",
      avatar: "/api/placeholder/64/64"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => 
      (prevIndex + 1) % testimonials.length
    );
  };

  return (
    <section id="testimonials" className="bg-gray-50 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">What Our Clients Say</h2>
          <div className="w-16 h-1 bg-blue-500 mx-auto"></div>
        </div>
        
        <div className="relative bg-white rounded-lg shadow-lg p-8 mx-auto">
          <button 
            onClick={handlePrev}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-100 hover:bg-gray-200 rounded-full p-2"
            aria-label="Previous testimonial"
          >
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
            </svg>
          </button>
          
          <div className="px-8 md:px-16">
            <div className="flex flex-col items-center">
              <div className="mb-6">
                <svg className="w-12 h-12 text-blue-500 opacity-25" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <path d="M464 256h-80v-64c0-35.3 28.7-64 64-64h8c13.3 0 24-10.7 24-24V56c0-13.3-10.7-24-24-24h-8c-88.4 0-160 71.6-160 160v240c0 26.5 21.5 48 48 48h128c26.5 0 48-21.5 48-48V304c0-26.5-21.5-48-48-48zm-288 0H96v-64c0-35.3 28.7-64 64-64h8c13.3 0 24-10.7 24-24V56c0-13.3-10.7-24-24-24h-8c-88.4 0-160 71.6-160 160v240c0 26.5 21.5 48 48 48h128c26.5 0 48-21.5 48-48V304c0-26.5-21.5-48-48-48z"></path>
                </svg>
              </div>
              
              <blockquote className="text-xl text-gray-700 text-center mb-6">
                "{testimonials[currentIndex].text}"
              </blockquote>
              
              <div className="flex items-center mb-6">
                <img 
                  src={testimonials[currentIndex].avatar} 
                  alt={testimonials[currentIndex].author}
                  className="w-16 h-16 rounded-full object-cover mr-4" 
                />
                <div className="text-left">
                  <p className="font-bold text-gray-800">{testimonials[currentIndex].author}</p>
                  <p className="text-gray-600">{testimonials[currentIndex].position}</p>
                </div>
              </div>
              
              <div className="flex space-x-2 mt-4">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => handleDotClick(index)}
                    className={`w-2 h-2 rounded-full ${index === currentIndex ? 'bg-blue-500' : 'bg-gray-300'}`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
          
          <button 
            onClick={handleNext}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-100 hover:bg-gray-200 rounded-full p-2"
            aria-label="Next testimonial"
          >
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;