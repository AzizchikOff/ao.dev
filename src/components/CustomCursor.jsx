import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import "./CustomCursor.css";

export default function CustomCursor() {
  const [label, setLabel] = useState("");
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const dotX = useMotionValue(0);
  const dotY = useMotionValue(0);

  const ringX = useSpring(dotX, { damping: 28, stiffness: 280, mass: 0.4 });
  const ringY = useSpring(dotY, { damping: 28, stiffness: 280, mass: 0.4 });

  const [isTouchDevice] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches
  );

  useEffect(() => {
    if (isTouchDevice) return;

    const handleMove = (e) => {
      dotX.set(e.clientX);
      dotY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleOver = (e) => {
      const target = e.target.closest("[data-cursor]");
      if (target) {
        setIsHovering(true);
        setLabel(target.getAttribute("data-cursor"));
      } else {
        setIsHovering(false);
        setLabel("");
      }
    };

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseover", handleOver);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseover", handleOver);
    };
  }, [dotX, dotY, isVisible, isTouchDevice]);

  if (isTouchDevice) return null;

  return (
    <>
      <motion.div
        className="cursor-dot"
        style={{ x: dotX, y: dotY, opacity: isVisible ? 1 : 0 }}
      />
      <motion.div
        className={`cursor-ring ${isHovering ? "hover" : ""}`}
        style={{ x: ringX, y: ringY, opacity: isVisible ? 1 : 0 }}
      >
        <span className="cursor-label">{label}</span>
      </motion.div>
    </>
  );
}
