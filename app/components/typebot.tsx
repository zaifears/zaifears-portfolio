"use client"; // This directive marks the component as a Client Component

import { Bubble } from "@typebot.io/react";
import { useEffect, useState } from "react";

export function TypebotBubble() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint is 768px
    };

    // Check initially
    checkIsMobile();

    // Listen for window resize
    window.addEventListener('resize', checkIsMobile);

    // Cleanup
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  // Only render on mobile
  if (!isMobile) {
    return null;
  }

  return (
    <div className="md:hidden">
      <Bubble
        typebot="cmdr248uk000bju049mwjv96l"
        theme={{
          button: {
            backgroundColor: "#0042DA",
          },
          chatContainer: {
            backgroundColor: "#000000",
          },
        }}
        style={{
          left: "20px",
          right: "auto",
          bottom: "100px", // Position above mobile navigation
        }}
      />
    </div>
  );
}