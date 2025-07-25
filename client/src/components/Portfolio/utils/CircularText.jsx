import React from "react";
import "../../../stylesheet/circularText.css";

const CircularText = ({
  text = "MENU * ",
  size = 250,
  animationDuration = 15,
}) => {
  // We'll repeat the text to ensure it fills the circle
  const fullText = (text + " ").repeat(7); // Repeat 5 times for a continuous loop

  return (
    <div className="circular-container" style={{ width: size, height: size }}>
      <svg
        viewBox="0 0 100 100"
        className="circular-text-svg"
        style={{ animationDuration: `${animationDuration}s` }}
      >
        <path
          id="circlePath"
          fill="none"
          d="M 50, 50 m -40, 0 a 40,40 0 1,1 80,0 a 40,40 0 1,1 -80,0"
        />

        <text>
          <textPath href="#circlePath">{fullText}</textPath>
        </text>
      </svg>
      {/* This is a placeholder for your winking face image */}
      <div className="center-content">
        {/* Replace with an <img src="..." /> tag for your image */}
      </div>
    </div>
  );
};

export default CircularText;
