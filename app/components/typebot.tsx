"use client";

import { Bubble } from "@typebot.io/react";

export function TypebotBubble() {
  return (
    <Bubble
      typebot="cmdr248uk000bju049mwjv96l"
      apiHost="https://typebot.io" // <-- Add this line
      theme={{ button: { backgroundColor: "#0042DA" } }}
    />
  );
}