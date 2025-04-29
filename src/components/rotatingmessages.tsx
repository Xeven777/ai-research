import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface RotatingMessagesProps {
  messages: string[];
  interval?: number;
  className?: string;
}

const RotatingMessages = ({
  messages,
  interval = 3000,
  className = "",
}: RotatingMessagesProps) => {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  useEffect(() => {
    const messageInterval = setInterval(() => {
      setCurrentMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
    }, interval);

    return () => {
      clearInterval(messageInterval);
    };
  }, [messages.length, interval]);

  const variants = {
    enter: { y: 20, opacity: 0 },
    center: { y: 0, opacity: 1 },
    exit: { y: -20, opacity: 0 },
  };

  return (
    <div className={`overflow-hidden ${className}`}>
      <AnimatePresence mode="wait">
        <motion.p
          key={currentMessageIndex}
          initial="enter"
          animate="center"
          exit="exit"
          variants={variants}
          transition={{ stiffness: 300, damping: 30 }}
          className="text-center font-medium"
        >
          {messages[currentMessageIndex]}
        </motion.p>
      </AnimatePresence>
    </div>
  );
};

export default RotatingMessages;
