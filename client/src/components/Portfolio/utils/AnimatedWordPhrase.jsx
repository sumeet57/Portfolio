import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

function AnimatedWordPhrase({
  phrase,
  delay = 0,
  duration = 1,
  stagger = 0.1,
  className,
}) {
  const phraseRef = useRef(null);
  const words = phrase.split(" ").map((word, index) => (
    <span key={index} style={{ display: "inline-block", overflow: "hidden" }}>
      {word}
      &nbsp;
    </span>
  ));

  useGSAP(() => {
    if (phraseRef.current) {
      // Select all individual word spans within the ref
      const wordSpans = gsap.utils.toArray(phraseRef.current.children);

      gsap.from(wordSpans, {
        opacity: 0,
        y: -20, // Animate from 20px above their final position
        stagger: stagger, // Use the new stagger prop
        delay: delay,
        duration: duration,
        ease: "power2.out",
      });
    }
  }, [phrase, delay, duration, stagger]); // Re-run if props change

  return (
    <span ref={phraseRef} className={className}>
      {words}
    </span>
  );
}

export default AnimatedWordPhrase;
