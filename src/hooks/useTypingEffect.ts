import { useState, useEffect, useCallback } from "react";

const typingTexts = [
  "Python • C/C++ • JavaScript",
  "• Power BI • MS Excel • DBMS(SQL)", 
  "• HTML/CSS • NodeJS • Express JS",
  "• oops(C++) • Computer Network • Operating System",
  "• Numpy • Pandas • Scikit - learn • Neural Network • Deep Learning",
  "Creating Interactive Websites",
  "Creating Interactive Analytics Dashboards",
  "Creating Complex Models",
  "• Problem-solving • Critical Thinking", 
  "• Teamwork • Time Management • Strategic Learner",
];

export const useTypingEffect = (typeSpeed = 100, deleteSpeed = 80, pauseDuration = 800) => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const tick = useCallback(() => {
    const currentText = typingTexts[currentIndex];

    if (isDeleting) {
      setDisplayText(currentText.substring(0, displayText.length - 1));
    } else {
      setDisplayText(currentText.substring(0, displayText.length + 1));
    }
  }, [currentIndex, displayText, isDeleting]);

  useEffect(() => {
    const currentText = typingTexts[currentIndex];
    let timeout: NodeJS.Timeout;

    if (!isDeleting && displayText === currentText) {
      timeout = setTimeout(() => setIsDeleting(true), pauseDuration);
    } else if (isDeleting && displayText === "") {
      setIsDeleting(false);
      setCurrentIndex((prev) => (prev + 1) % typingTexts.length);
    } else {
      timeout = setTimeout(tick, isDeleting ? deleteSpeed : typeSpeed);
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentIndex, tick, typeSpeed, deleteSpeed, pauseDuration]);

  return displayText;
};
