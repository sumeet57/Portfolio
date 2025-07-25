// client/src/components/LoadingScreen.jsx
import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

// --- Main Loading Screen Component ---
const LoadingScreen = () => {
  const loadingScreenRef = useRef(null);
  const textWrapperRef = useRef(null);
  const counterRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    const loadingScreen = loadingScreenRef.current;
    const textWrapper = textWrapperRef.current;
    const counter = counterRef.current;
    const grid = gridRef.current;

    // Set initial states
    gsap.set(loadingScreen, { autoAlpha: 1 });
    gsap.set(textWrapper.children, { y: "100%", opacity: 0 });
    gsap.set(grid, { autoAlpha: 0, scale: 1.2 });

    // GSAP Timeline for the animation sequence
    const tl = gsap.timeline();

    tl
      // Animate grid appearance
      .to(grid, {
        autoAlpha: 1,
        scale: 1,
        duration: 1.5,
        ease: "power3.out",
      })
      // Animate text reveal
      .to(
        textWrapper.children,
        {
          y: "0%",
          opacity: 1,
          stagger: 0.1,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=1"
      ) // Start this animation 1s before the previous one ends
      // Animate percentage counter
      .to(
        counter,
        {
          textContent: 100,
          duration: 3,
          ease: "power1.inOut",
          snap: { textContent: 1 }, // Snap to whole numbers
          onUpdate: () => {
            counter.textContent = Math.ceil(Number(counter.textContent));
          },
        },
        "-=0.5"
      )
      // Animate text exit
      .to(
        textWrapper.children,
        {
          y: "-100%",
          opacity: 0,
          stagger: 0.1,
          duration: 0.8,
          ease: "power3.in",
        },
        "+=0.5"
      ) // Start 0.5s after the counter finishes
      // Animate the whole screen fading out
      .to(loadingScreen, {
        autoAlpha: 0,
        duration: 1,
        ease: "power3.inOut",
        onComplete: () => {
          // Optional: set display to none after fade out to prevent interaction
          if (loadingScreen) loadingScreen.style.display = "none";
        },
      });

    // Interactive grid effect on mouse move
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const xPercent = (clientX / window.innerWidth - 0.5) * 2;
      const yPercent = (clientY / window.innerHeight - 0.5) * 2;
      gsap.to(grid, {
        x: xPercent * 30,
        y: yPercent * 30,
        rotationX: -yPercent * 10,
        rotationY: xPercent * 10,
        duration: 1,
        ease: "power2.out",
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Cleanup function
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      ref={loadingScreenRef}
      className="fixed top-0 left-0 w-full h-full bg-secondary-bg text-text-primary flex items-center justify-center z-[100] font-inter"
    >
      {/* Interactive Background Grid */}
      <div
        ref={gridRef}
        className="absolute w-full h-full"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(132, 94, 194, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(132, 94, 194, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      ></div>

      {/* Animated Text Content */}
      <div className="relative text-center text-4xl md:text-6xl font-bold overflow-hidden">
        <div ref={textWrapperRef} className="flex flex-col items-center">
          <span className="block">Crafting Pixels.</span>
          <span className="block">Building Worlds.</span>
          <span className="block">Experience Loading...</span>
        </div>
      </div>

      {/* Percentage Counter */}
      <div className="absolute bottom-10 right-10 text-xl font-mono">
        <span ref={counterRef}>0</span>%
      </div>
    </div>
  );
};

export default LoadingScreen;
