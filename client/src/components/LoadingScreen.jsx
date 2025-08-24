import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

// --- The "Blueprint" for each number, 0-9 ---
const digitMaps = [
  [
    [1, 1, 1, 1, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 1, 1, 1, 1],
  ], // 0
  [
    [0, 0, 1, 0, 0],
    [0, 1, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 1, 1, 1, 0],
  ], // 1
  [
    [1, 1, 1, 1, 0],
    [0, 0, 0, 0, 1],
    [0, 0, 0, 0, 1],
    [0, 1, 1, 1, 0],
    [1, 0, 0, 0, 0],
    [1, 0, 0, 0, 0],
    [1, 1, 1, 1, 1],
  ], // 2
  [
    [1, 1, 1, 1, 0],
    [0, 0, 0, 0, 1],
    [0, 0, 0, 0, 1],
    [0, 1, 1, 1, 0],
    [0, 0, 0, 0, 1],
    [0, 0, 0, 0, 1],
    [1, 1, 1, 1, 0],
  ], // 3
  [
    [0, 0, 1, 0, 1],
    [0, 1, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 1, 1, 1, 1],
    [0, 0, 0, 0, 1],
    [0, 0, 0, 0, 1],
    [0, 0, 0, 0, 1],
  ], // 4
  [
    [1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0],
    [1, 1, 1, 1, 0],
    [0, 0, 0, 0, 1],
    [0, 0, 0, 0, 1],
    [0, 0, 0, 0, 1],
    [1, 1, 1, 1, 0],
  ], // 5
  [
    [0, 1, 1, 1, 0],
    [1, 0, 0, 0, 0],
    [1, 0, 0, 0, 0],
    [1, 1, 1, 1, 0],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [0, 1, 1, 1, 0],
  ], // 6
  [
    [1, 1, 1, 1, 1],
    [0, 0, 0, 0, 1],
    [0, 0, 0, 1, 0],
    [0, 0, 1, 0, 0],
    [0, 1, 0, 0, 0],
    [0, 1, 0, 0, 0],
    [0, 1, 0, 0, 0],
  ], // 7
  [
    [0, 1, 1, 1, 0],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [0, 1, 1, 1, 0],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [0, 1, 1, 1, 0],
  ], // 8
  [
    [0, 1, 1, 1, 0],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [0, 1, 1, 1, 1],
    [0, 0, 0, 0, 1],
    [0, 0, 0, 0, 1],
    [0, 1, 1, 1, 0],
  ], // 9
];

const LoadingScreen = () => {
  const loadingScreenRef = useRef(null);
  const digitContainersRef = useRef([]);
  const noticeRef = useRef(null);
  let lastDigits = useRef("");

  useEffect(() => {
    const ROWS = 7;
    const COLS = 5;
    const NUM_PARTICLES = ROWS * COLS;

    const allParticles = [];
    digitContainersRef.current.forEach((container) => {
      if (!container) return;
      for (let i = 0; i < NUM_PARTICLES; i++) {
        const particle = document.createElement("div");
        particle.className = "particle";
        container.appendChild(particle);
        allParticles.push(particle);
      }
    });

    if (digitContainersRef.current.some((c) => !c)) return;

    const digitParticles = [
      Array.from(digitContainersRef.current[0].children),
      Array.from(digitContainersRef.current[1].children),
      Array.from(digitContainersRef.current[2].children),
    ];

    const updateDigits = (number) => {
      const numStr = String(number).padStart(3, "0");
      if (numStr === lastDigits.current) return;
      lastDigits.current = numStr;

      const animateDigit = (particleSet, digit) => {
        const map = digitMaps[digit];
        if (!map) return;
        gsap.to(particleSet, {
          duration: 0.4,
          stagger: { each: 0.01, from: "random" },
          backgroundColor: (i) =>
            map[Math.floor(i / COLS)][i % COLS] ? "#ffffff" : "#1a1a1a",
          scale: (i) => (map[Math.floor(i / COLS)][i % COLS] ? 1 : 0.5),
          opacity: (i) => (map[Math.floor(i / COLS)][i % COLS] ? 1 : 0.2),
        });
      };

      animateDigit(digitParticles[0], numStr[0]);
      animateDigit(digitParticles[1], numStr[1]);
      animateDigit(digitParticles[2], numStr[2]);
    };

    gsap.set(allParticles, { scale: 0, opacity: 0 });
    gsap.set(noticeRef.current, { opacity: 0 });

    const tl = gsap.timeline();
    const counter = { value: 1 }; // Start counter at 1

    tl.to(allParticles, {
      duration: 1,
      scale: 0.5,
      opacity: 0.2,
      backgroundColor: "#1a1a1a",
      stagger: { each: 0.005, from: "center" },
      onStart: () => updateDigits(1), // Show "001" immediately
    })
      .to(noticeRef.current, { duration: 1, opacity: 1 }, "<0.5")
      .to(counter, {
        value: 100,
        duration: 3.5,
        ease: "power1.inOut",
        onUpdate: () => {
          updateDigits(Math.floor(counter.value));
        },
      })
      .add(() => updateDigits(100)) // Ensure final state is 100
      .to(digitContainersRef.current, {
        // Flash effect
        duration: 0.1,
        filter: "drop-shadow(0 0 15px white)",
        yoyo: true,
        repeat: 1,
      })
      .to({}, { duration: 0.4 }) // Dramatic pause
      .to(noticeRef.current, { duration: 0.5, opacity: 0 }, "<")
      .to(allParticles, {
        // Collapse to center
        duration: 1,
        x: 0,
        y: 0,
        scale: 0,
        opacity: 0,
        ease: "power3.in",
        stagger: {
          each: 0.005,
          from: "edges",
        },
      })
      .to(
        loadingScreenRef.current,
        {
          duration: 1,
          autoAlpha: 0,
          onComplete: () => {
            if (loadingScreenRef.current)
              loadingScreenRef.current.style.display = "none";
          },
        },
        "-=0.5"
      );
  }, []);

  return (
    <div
      ref={loadingScreenRef}
      className="fixed top-0 left-0 w-full h-full bg-black flex flex-col items-center justify-center z-[100] overflow-hidden"
    >
      <div className="flex items-center justify-center scale-[2.5] sm:scale-[3] md:scale-[4]">
        <div
          ref={(el) => (digitContainersRef.current[0] = el)}
          className="digit-grid"
        ></div>
        <div
          ref={(el) => (digitContainersRef.current[1] = el)}
          className="digit-grid"
        ></div>
        <div
          ref={(el) => (digitContainersRef.current[2] = el)}
          className="digit-grid"
        ></div>
      </div>
      <p
        ref={noticeRef}
        className="text-sm text-gray-500 font-mono tracking-widest uppercase absolute bottom-6"
      >
        Website is in development phase
      </p>
    </div>
  );
};

export default LoadingScreen;
