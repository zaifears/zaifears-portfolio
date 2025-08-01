"use client"; // This directive marks the component as a Client Component

import { Bubble } from "@typebot.io/react";

export function TypebotBubble() {
  return (
    <Bubble
      typebot="cmdr248uk000bju049mwjv96l"
      theme={{
        button: {
          backgroundColor: "#0042DA",
        },
      }}
    />
  );
}