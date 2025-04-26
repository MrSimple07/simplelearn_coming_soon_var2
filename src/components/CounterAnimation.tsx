import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getWaitlistCount } from '../services/supabase';

const CounterAnimation: React.FC = () => {
  const [count, setCount] = useState<number | null>(null);
  const [displayCount, setDisplayCount] = useState(0);
  
  useEffect(() => {
    const fetchCount = async () => {
      try {
        const waitlistCount = await getWaitlistCount();
        setCount(waitlistCount);
      } catch (error) {
        console.error('Error fetching count:', error);
        // Fallback to a default number
        setCount(500);
      }
    };
    
    fetchCount();
  }, []);
  
  useEffect(() => {
    if (count === null) return;
    
    let start = 0;
    const increment = Math.ceil(count / 50);
    const timer = setInterval(() => {
      start += increment;
      if (start >= count) {
        setDisplayCount(count);
        clearInterval(timer);
      } else {
        setDisplayCount(start);
      }
    }, 30);
    
    return () => clearInterval(timer);
  }, [count]);

  if (count === null) return null;
  
  return (
    <motion.div 
      className="flex items-center justify-center mb-8"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.5, duration: 0.5 }}
    >
      <div className="bg-purple-100 text-purple-800 px-6 py-3 rounded-full font-semibold text-center">
        Join {displayCount}+ early users on the waitlist!
      </div>
    </motion.div>
  );
};

export default CounterAnimation;