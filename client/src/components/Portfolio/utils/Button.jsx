import React from "react";
import { useContext } from "react";
import { PortfolioContext } from "../../../Context/Portfolio.context";
import "../../../stylesheet/button.css";

const Button = (props) => {
  const { setCursor } = useContext(PortfolioContext); // Assuming setCursor is now setCursorOnButton based on CustomCursor

  const [hov, setHov] = React.useState(false);

  return (
    <>
      <button
        style={{
          color: "white",
        }}
        onMouseEnter={() => {
          setCursor(true, 1.5); // Assuming setCursorOnButton handles the boolean state
          setHov(true);
        }}
        onMouseLeave={() => {
          setCursor(false, 1); // Assuming setCursorOnButton handles the boolean state
          setHov(false);
        }}
        onClick={
          props.link
            ? () => {
                window.open(props.link, "_blank");
              }
            : null
        }
        className="bg-text-highlight text-white button relative overflow-hidden capitalize font-bold tracking-wider text-xl px-4 py-2 rounded-full transition-colors duration-300 "
      >
        {props.text}

        <div
          style={{
            // Control visibility with opacity and top
            bottom: hov ? "0%" : "-100%",
            opacity: hov ? 1 : 0, // Fade in/out
            overflow: "hidden",
            left: "0%",
            backgroundColor: "white",
            color: "black", // Ensure text is visible on white background
            transition: "bottom 0.3s ease-out, opacity 1s ease-out", // Apply transition to both properties
            width: "100%",
            transformOrigin: "center",
            textAlign: "center",
            height: "100%",
            position: "absolute", // Ensure it's positioned correctly
            display: "flex", // Use flex to center text inside
            alignItems: "center",
            justifyContent: "center",
            pointerEvents: "none",
            borderTopLeftRadius: hov ? "0px" : "100%",
            borderTopRightRadius: hov ? "0px" : "100%",
          }}
          className="w-full h-full"
        >
          {props.text}
        </div>
      </button>
    </>
  );
};

export default Button;
