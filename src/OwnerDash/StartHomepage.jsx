// import React from 'react'
import Register from '../Forms/Register'
import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import AOS from 'aos';
import 'aos/dist/aos.css';


const useScrollDirection = () => {
  const [scrollDirection, setScrollDirection] = useState('down');
  const { scrollY } = useScroll();
  const previousScrollY = useRef(0);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const direction = latest > previousScrollY.current ? "down" : "up";
    if (direction !== scrollDirection) {
      setScrollDirection(direction);
    }
    previousScrollY.current = latest > 0 ? latest : 0;
  });

  return scrollDirection;
};

// Enhanced scroll animation hook with direction awareness
const useScrollAnimation = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasBeenVisible, setHasBeenVisible] = useState(false);
  const [scrollDirection, setScrollDirection] = useState('down');
  const ref = useRef(null);
  const previousY = useRef(0);
  
  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      const direction = currentY > previousY.current ? 'down' : 'up';
      setScrollDirection(direction);
      previousY.current = currentY;
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          setHasBeenVisible(true);
        } else if (hasBeenVisible) {
          setIsVisible(false);
        }
      },
      { threshold: 0.1 }
    );
    
    if (ref.current) {
      observer.observe(ref.current);
    }
    
    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [hasBeenVisible]);
  
  return [ref, isVisible, scrollDirection];
};

// Enhanced FadeInSection with reverse animation
const FadeInSection = ({ children, direction = 'up', delay = 0 }) => {
  const [ref, isVisible, scrollDirection] = useScrollAnimation();
  
  const getTransform = () => {
    // If element is visible, show it normally
    if (isVisible) {
      return 'translate(0, 0)';
    }
    
    // If element is not visible, position depends on scroll direction
    if (scrollDirection === 'down') {
      // Standard animations when scrolling down
      switch (direction) {
        case 'up': return 'translateY(50px)';
        case 'down': return 'translateY(-50px)';
        case 'left': return 'translateX(50px)';
        case 'right': return 'translateX(-50px)';
        default: return 'translateY(50px)';
      }
    } else {
      // Reverse animations when scrolling up
      switch (direction) {
        case 'up': return 'translateY(-50px)';
        case 'down': return 'translateY(50px)';
        case 'left': return 'translateX(-50px)';
        case 'right': return 'translateX(50px)';
        default: return 'translateY(-50px)';
      }
    }
  };
  
  return (
    <div
      ref={ref}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: getTransform(),
        transition: `opacity 0.8s ease-out, transform 0.8s ease-out ${delay}s`,
      }}
    >
      {children}
    </div>
  );
};

// Direction-aware framer motion component
const DirectionalMotion = ({ children, initial, whileInView, exit, ...props }) => {
  const scrollDirection = useScrollDirection();
  const [hasAnimated, setHasAnimated] = useState(false);
  
  // Create reversed exit animations
  const getExitAnimation = () => {
    if (!initial) return { opacity: 0 };
    
    const exitAnimation = {};
    
    // Reverse any directional properties
    if (initial.x !== undefined) exitAnimation.x = -initial.x;
    if (initial.y !== undefined) exitAnimation.y = -initial.y;
    
    // Keep non-directional properties
    if (initial.opacity !== undefined) exitAnimation.opacity = initial.opacity;
    if (initial.scale !== undefined) exitAnimation.scale = initial.scale;
    
    return exitAnimation;
  };
  
  return (
    <motion.div
      initial={initial}
      whileInView={{
        ...whileInView,
        onComplete: () => setHasAnimated(true)
      }}
      exit={scrollDirection === 'up' && hasAnimated ? getExitAnimation() : exit}
      viewport={{ once: false, amount: 0.1 }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

function StartHomepage() {
  const scrollDirection = useScrollDirection();
    
    useEffect(() => {
      // Initialize AOS with settings that support reverse animations
      AOS.init({
        duration: 1000,
        once: false,
        mirror: true, // This enables reverse animations on scroll up
      });
    }, []);
  
    // Alternating sides animation for items
    const getSideAnimation = (index) => {
      return index % 2 === 0 ? 'left' : 'right';
    };
  return (
    <div>
        
            <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white text-gray-800">
              {/* Hero Section */}
              <header className="min-h-screen flex flex-col items-center justify-center text-center px-4">
                <motion.div
                  initial={{ opacity: 0, y: -50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 50 }}
                  transition={{ duration: 0.8 }}
                  className="max-w-4xl mx-auto"
                >
                  <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                    Scroll Animation Showcase
                  </h1>
                  <p className="text-xl md:text-2xl mb-10 text-gray-600">
                    Explore different techniques to add beautiful scroll-triggered animations to your React applications
                  </p>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="mt-8 animate-bounce"
                >
                  <svg 
                    className="w-10 h-10 text-gray-500" 
                    fill="none" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="2" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                  </svg>
                </motion.div>
              </header>
        
              {/* Scroll Direction Indicator */}
              <div className="fixed top-4 right-4 z-50 bg-black bg-opacity-70 text-white px-4 py-2 rounded-full">
                Scrolling: {scrollDirection === 'down' ? '👇 Down' : '👆 Up'}
              </div>
        
              {/* Section 1: Custom Hook Animation */}
              <section className="py-20 px-4">
                <div className="max-w-6xl mx-auto">
                  <FadeInSection>
                    <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
                      Custom Hook Animation
                    </h2>
                  </FadeInSection>
        
                  <div className="grid md:grid-cols-3 gap-8 mt-16">
                    {[
                      { title: "Simplicity", description: "Clean implementation using just the Intersection Observer API", icon: "💡" },
                      { title: "Performance", description: "Efficient animations that only trigger when elements come into view", icon: "⚡" },
                      { title: "Customization", description: "Full control over animation timing, direction, and behavior", icon: "🎨" }
                    ].map((item, index) => (
                      <FadeInSection key={index} direction={getSideAnimation(index)} delay={index * 0.2}>
                        <div className="bg-white rounded-lg shadow-lg p-8 h-full transform transition duration-500 hover:scale-105">
                          <div className="text-4xl mb-4">{item.icon}</div>
                          <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                          <p className="text-gray-600">{item.description}</p>
                        </div>
                      </FadeInSection>
                    ))}
                  </div>
                </div>
              </section>
        
              {/* Section 2: Framer Motion */}
              <section className="py-20 px-4 bg-gradient-to-r from-blue-50 to-indigo-50">
                <div className="max-w-6xl mx-auto">
                  <DirectionalMotion
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                  >
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                      Framer Motion Animations
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                      Declarative animations with Framer Motion's powerful API
                    </p>
                  </DirectionalMotion>
        
                  <div className="space-y-12">
                    {[
                      { title: "Staggered List Animation", items: ["Installation", "Configuration", "Implementation", "Customization"] },
                      { title: "Hover Animations", items: ["Scale effects", "Color transitions", "Rotation effects", "Shadow effects"] },
                      { title: "Gesture Animations", items: ["Drag interactions", "Tap animations", "Pan gestures", "Hover effects"] }
                    ].map((group, groupIndex) => (
                      <div key={groupIndex} className="bg-white rounded-lg shadow-lg p-8">
                        <DirectionalMotion
                          initial={{ opacity: 0, x: groupIndex % 2 === 0 ? -20 : 20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5 }}
                          className="text-2xl font-bold mb-6"
                        >
                          {group.title}
                        </DirectionalMotion>
                        <ul className="grid md:grid-cols-2 gap-4">
                          {group.items.map((item, i) => (
                            <DirectionalMotion
                              key={i}
                              initial={{ 
                                opacity: 0, 
                                x: i % 2 === 0 ? -50 : 50,
                                y: 20 
                              }}
                              whileInView={{ opacity: 1, x: 0, y: 0 }}
                              transition={{ 
                                duration: 0.5, 
                                delay: i * 0.1,
                                type: "spring",
                                stiffness: 100
                              }}
                              className="flex items-center p-3 bg-blue-50 rounded-md"
                            >
                              <motion.div
                                initial={{ scale: 0 }}
                                whileInView={{ scale: 1 }}
                                viewport={{ once: false }}
                                transition={{ type: "spring", stiffness: 260, delay: i * 0.1 + 0.2 }}
                                className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white mr-3"
                              >
                                ✓
                              </motion.div>
                              {item}
                            </DirectionalMotion>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
        
              {/* Section 3: AOS Library */}
              <section className="py-20 px-4">
                <div className="max-w-6xl mx-auto">
                  <h2 
                    className="text-3xl md:text-4xl font-bold mb-16 text-center"
                    data-aos="fade-down"
                    data-aos-mirror="true"
                  >
                    Animate On Scroll (AOS) Library
                  </h2>
        
                  <div className="grid md:grid-cols-2 gap-16">
                    <div 
                      data-aos="fade-right" 
                      data-aos-mirror="true"
                      data-aos-delay="100" 
                      className="bg-white rounded-lg shadow-lg overflow-hidden"
                    >
                      <div className="h-56 bg-gradient-to-r from-purple-500 to-indigo-600"></div>
                      <div className="p-8">
                        <h3 className="text-xl font-bold mb-3">Fade Right Animation</h3>
                        <p className="text-gray-600">
                          This element animates in from the right side when scrolled into view, 
                          and reverses when scrolling back up.
                        </p>
                      </div>
                    </div>
        
                    <div 
                      data-aos="fade-left" 
                      data-aos-mirror="true"
                      data-aos-delay="200" 
                      className="bg-white rounded-lg shadow-lg overflow-hidden"
                    >
                      <div className="h-56 bg-gradient-to-r from-pink-500 to-red-500"></div>
                      <div className="p-8">
                        <h3 className="text-xl font-bold mb-3">Fade Left Animation</h3>
                        <p className="text-gray-600">
                          This element animates in from the left side when scrolled into view, 
                          and reverses when scrolling back up.
                        </p>
                      </div>
                    </div>
                  </div>
        
                  <div className="grid md:grid-cols-3 gap-8 mt-16">
                    {[
                      { aos: "zoom-in-right", title: "Zoom In Right" },
                      { aos: "flip-up", title: "Flip Up" },
                      { aos: "zoom-in-left", title: "Zoom In Left" }
                    ].map((item, index) => (
                      <div 
                        key={index}
                        data-aos={item.aos}
                        data-aos-mirror="true"
                        data-aos-delay={index * 100}
                        className="bg-white rounded-lg shadow-lg p-8 h-64 flex items-center justify-center"
                      >
                        <h3 className="text-2xl font-bold text-center">{item.title}</h3>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
        
              {/* Feature Comparison */}
              <section className="py-20 px-4 bg-gray-50">
                <div className="max-w-6xl mx-auto">
                  <FadeInSection>
                    <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center">
                      Animation Techniques Comparison
                    </h2>
                  </FadeInSection>
        
                  <div className="overflow-x-auto">
                    <table className="w-full bg-white shadow-lg rounded-lg overflow-hidden">
                      <thead className="bg-blue-600 text-white">
                        <tr>
                          <DirectionalMotion 
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            className="py-4 px-6 text-left"
                          >
                            Technique
                          </DirectionalMotion>
                          <DirectionalMotion 
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ delay: 0.1 }}
                            className="py-4 px-6 text-left"
                          >
                            Bundle Size
                          </DirectionalMotion>
                          <DirectionalMotion 
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="py-4 px-6 text-left"
                          >
                            Ease of Use
                          </DirectionalMotion>
                          <DirectionalMotion 
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="py-4 px-6 text-left"
                          >
                            Flexibility
                          </DirectionalMotion>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          { technique: "Custom Hook", size: "Minimal", ease: "Moderate", flexibility: "High" },
                          { technique: "Framer Motion", size: "Large (~100KB)", ease: "High", flexibility: "Very High" },
                          { technique: "AOS Library", size: "Medium (~20KB)", ease: "Very High", flexibility: "Moderate" },
                          { technique: "CSS Transitions", size: "None", ease: "Low", flexibility: "Moderate" }
                        ].map((row, index) => (
                          <DirectionalMotion 
                            key={index}
                            initial={{ 
                              opacity: 0, 
                              x: index % 2 === 0 ? -20 : 20,
                              y: 20 
                            }}
                            whileInView={{ opacity: 1, x: 0, y: 0 }}
                            transition={{ 
                              delay: index * 0.1,
                              type: "spring",
                              stiffness: 100
                            }}
                            className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}
                          >
                            <td className="py-4 px-6 border-b">{row.technique}</td>
                            <td className="py-4 px-6 border-b">{row.size}</td>
                            <td className="py-4 px-6 border-b">{row.ease}</td>
                            <td className="py-4 px-6 border-b">{row.flexibility}</td>
                          </DirectionalMotion>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </section>
        
              {/* Alternating Side Showcase Section */}
              <section className="py-20 px-4 bg-gradient-to-b from-white to-blue-50">
                <div className="max-w-6xl mx-auto">
                  <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center"
                      data-aos="fade-up"
                      data-aos-mirror="true">
                    Alternating Side Animations
                  </h2>
                  
                  <div className="space-y-16">
                    {[
                      { title: "Left Side Animation", description: "This content slides in from the left side, creating a dynamic visual flow that guides the user's attention across the page. Perfect for timeline-style content or step-by-step guides.", icon: "🔄" },
                      { title: "Right Side Animation", description: "Content entering from the right creates visual balance and maintains user engagement. The opposing direction helps distinguish between different sections or content types.", icon: "⚡" },
                      { title: "Left Side Animation", description: "Repeating the pattern establishes a predictable rhythm that users can follow. This makes content consumption more intuitive and helps with information retention.", icon: "📊" },
                      { title: "Right Side Animation", description: "Alternating sides creates a natural reading pattern that mimics conversation. This is especially effective for storytelling, testimonials, or feature showcases.", icon: "💬" }
                    ].map((item, index) => (
                      <DirectionalMotion
                        key={index}
                        initial={{ 
                          opacity: 0, 
                          x: index % 2 === 0 ? -100 : 100 
                        }}
                        whileInView={{ 
                          opacity: 1, 
                          x: 0 
                        }}
                        viewport={{ margin: "-100px" }}
                        transition={{ 
                          type: "spring",
                          stiffness: 50,
                          damping: 20
                        }}
                        className={`flex items-center ${index % 2 === 0 ? '' : 'flex-row-reverse'} bg-white rounded-lg shadow-lg p-8 transform transition duration-500 hover:scale-105`}
                      >
                        <div className={`flex-shrink-0 w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-3xl ${index % 2 === 0 ? 'mr-6' : 'ml-6'}`}>
                          {item.icon}
                        </div>
                        <div>
                          <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                          <p className="text-gray-600">{item.description}</p>
                        </div>
                      </DirectionalMotion>
                    ))}
                  </div>
                </div>
              </section>
        
              {/* Chat-Style Message Section */}
              <section className="py-20 px-4 bg-gradient-to-r from-indigo-50 to-blue-50">
                <div className="max-w-3xl mx-auto">
                  <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center"
                      data-aos="fade-down"
                      data-aos-mirror="true">
                    Chat-Style Animations with Scroll Reversal
                  </h2>
                  
                  <div className="space-y-6">
                    {[
                      { sender: 'user', message: "Hey, have you seen the new scroll direction animations?" },
                      { sender: 'bot', message: "Yes! They animate in one direction when scrolling down, and reverse when scrolling up!" },
                      { sender: 'user', message: "How does the scroll direction detection work?" },
                      { sender: 'bot', message: "We track the current scroll position and compare it to the previous position to determine direction." },
                      { sender: 'user', message: "What's the benefit of these bidirectional animations?" },
                      { sender: 'bot', message: "They create a more immersive experience, as content appears to respond naturally to user interaction in both directions." }
                    ].map((item, index) => {
                      const isUser = item.sender === 'user';
                      return (
                        <DirectionalMotion
                          key={index}
                          className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
                          initial={{ 
                            opacity: 0, 
                            x: isUser ? 50 : -50,
                            scale: 0.95
                          }}
                          whileInView={{ 
                            opacity: 1, 
                            x: 0,
                            scale: 1
                          }}
                          transition={{ 
                            type: "spring",
                            stiffness: 100,
                            damping: 15,
                            delay: index * 0.1
                          }}
                        >
                          <div 
                            className={`max-w-xs md:max-w-md rounded-2xl p-4 ${
                              isUser ? 'bg-blue-600 text-white rounded-tr-none' : 'bg-white text-gray-800 rounded-tl-none'
                            }`}
                          >
                            {item.message}
                          </div>
                        </DirectionalMotion>
                      );
                    })}
                  </div>
                </div>
              </section>
        
              {/* New Reversible Animation Showcase Section */}
              <section className="py-20 px-4 bg-gradient-to-b from-indigo-50 to-white">
                <div className="max-w-6xl mx-auto">
                  <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center"
                      data-aos="zoom-in"
                      data-aos-mirror="true">
                    Scroll Direction Animation Showcase
                  </h2>
                  
                  <div className="grid md:grid-cols-2 gap-16">
                    <div className="bg-white rounded-lg shadow-lg p-8">
                      <h3 className="text-xl font-bold mb-6 text-center">Scrolling Down Effects</h3>
                      <div className="space-y-6">
                        {[
                          { title: "Fade Up", description: "Elements fade in while moving upward" },
                          { title: "Slide From Right", description: "Elements enter from right side of viewport" },
                          { title: "Scale Up", description: "Elements start small and grow to full size" }
                        ].map((item, index) => (
                          <DirectionalMotion
                            key={`down-${index}`}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className="border-b border-gray-100 pb-4"
                          >
                            <h4 className="font-semibold">{item.title}</h4>
                            <p className="text-gray-600">{item.description}</p>
                          </DirectionalMotion>
                        ))}
                      </div>
                    </div>
                    
                    <div className="bg-white rounded-lg shadow-lg p-8">
                      <h3 className="text-xl font-bold mb-6 text-center">Scrolling Up Effects</h3>
                      <div className="space-y-6">
                        {[
                          { title: "Fade Down", description: "Elements fade in while moving downward" },
                          { title: "Slide From Left", description: "Elements enter from left side of viewport" },
                          { title: "Scale Down", description: "Elements start large and shrink to normal size" }
                        ].map((item, index) => (
                          <DirectionalMotion
                            key={`up-${index}`}
                            initial={{ opacity: 0, y: -40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className="border-b border-gray-100 pb-4"
                          >
                            <h4 className="font-semibold">{item.title}</h4>
                            <p className="text-gray-600">{item.description}</p>
                          </DirectionalMotion>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-20">
                    <h3 className="text-2xl font-bold mb-8 text-center">Implementation Techniques</h3>
                    <div className="bg-white rounded-lg shadow-lg p-8">
                      <ol className="space-y-6 list-decimal pl-5">
                        {[
                          { title: "Track Scroll Position", description: "Use window.scrollY or Framer Motion's useScroll to monitor the current scroll position." },
                          { title: "Compare With Previous", description: "Store the previous scroll position and compare with current to determine direction." },
                          { title: "Update Animation State", description: "Conditionally apply different animations based on the detected scroll direction." },
                          { title: "Disable 'once' Setting", description: "Ensure viewport detection settings allow re-triggering (once: false)." },
                          { title: "Use Exit Animations", description: "Define both enter and exit animations for complete control over element behavior." }
                        ].map((item, index) => (
                          <DirectionalMotion
                            key={index}
                            initial={{ 
                              opacity: 0, 
                              x: scrollDirection === 'down' ? -30 : 30 
                            }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="pl-2"
                          >
                            <li>
                              <strong>{item.title}:</strong> {item.description}
                            </li>
                          </DirectionalMotion>
                        ))}
                      </ol>
                    </div>
                  </div>
                </div>
              </section>
        
              {/* Call to Action */}
              <section className="py-32 px-4 bg-gradient-to-br from-blue-600 to-purple-700 text-white">
                <div className="max-w-4xl mx-auto text-center">
                  <DirectionalMotion
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.7 }}
                  >
                    <h2 className="text-4xl md:text-5xl font-bold mb-8">
                      Ready to Add Bi-Directional Animations?
                    </h2>
                    <p className="text-xl md:text-2xl mb-12 opacity-90">
                      Create truly responsive animations that recognize user scroll behavior in both directions.
                    </p>
                    <button className="px-8 py-4 bg-white text-blue-700 font-semibold rounded-lg text-lg shadow-lg transform transition hover:scale-105 hover:shadow-xl">
                      Get Started Now
                    </button>
                  </DirectionalMotion>
                </div>
              </section>
        
              {/* Footer */}
              <footer className="py-12 px-4 bg-gray-800 text-gray-300">
                <div className="max-w-6xl mx-auto">
                  <div className="grid md:grid-cols-2 gap-8">
                    <DirectionalMotion 
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6 }}
                      className="text-left"
                    >
                      <h3 className="text-xl font-bold mb-4">Animation Resources</h3>
                      <ul className="space-y-2">
                        <li>Framer Motion Documentation</li>
                        <li>AOS Library Examples</li>
                        <li>React Animation Best Practices</li>
                        <li>Performance Optimization Tips</li>
                      </ul>
                    </DirectionalMotion>
                    
                    <DirectionalMotion 
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-right"
                      >
                        <h3 className="text-xl font-bold mb-4">Contact & Support</h3>
                        <ul className="space-y-2">
                          <li>Documentation</li>
                          <li>GitHub Repository</li>
                          <li>Support Forum</li>
                          <li>Feature Requests</li>
                        </ul>
                      </DirectionalMotion>
                    </div>
                    
                    <DirectionalMotion
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                      className="text-center mt-8 pt-8 border-t border-gray-700"
                    >
                      <p>&copy; {new Date().getFullYear()} Scroll Animation Showcase. All rights reserved.</p>
                    </DirectionalMotion>
                  
                </div>
              </footer>
            </div>
          
        <Register></Register>
        
    </div>
  )
}

export default StartHomepage

