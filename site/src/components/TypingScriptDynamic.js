'use client';
import { useState, useEffect } from "react";

export const TypingScriptDynamic = ({
  word
}) => {
  //https://blog.logrocket.com/5-ways-implement-typing-animation-react/ ;-;

  let text = word;
  let delay = 10;

  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setCurrentText('');
    setCurrentIndex(0);
  }, [word]);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setCurrentText(prevText => prevText + text[currentIndex]);
        setCurrentIndex(prevIndex => prevIndex + 1);
      }, delay);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, delay, text]);

  return <div className="absolute top-[10vh] left-[2vw] font-Ubuntu-Mono">{currentText}<span id="trailingChar">{"█"}</span></div>;
};
