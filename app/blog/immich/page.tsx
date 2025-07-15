import Image from 'next/image';
import Link from 'next/link';

export default function ImmichPostPage() {
  return (
    <article className="prose dark:prose-invert max-w-none">
      <h1 className="text-3xl font-bold mb-4">
        My Adventure in Ditching Google Photos for Immich
      </h1>
      <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-8">
        Posted on July 16, 2025
      </p>
      
      <div className="relative w-full h-64 md:h-96 mb-8">
        <Image
          src="/immich-post.png"
          alt="A decorative image for the Immich blog post."
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
        />
      </div>

      <p>
        For years, I, like millions of others, lived under the rule of Google Photos. It was easy, it was convenient, but it was also limiting. That pesky 15GB storage limit felt like a ticking clock, and the nagging thought of how my personal data was being used in some shady, algorithmic way was always in the back of my mind. So, I asked myself a simple question: "Why not take back control?" And that's how my adventure with <Link href="https://immich.app/" target="_blank" rel="noopener noreferrer" className="underline">Immich</Link>, the self-hosted photo and video solution, began.
      </p>

      <h2 className="text-2xl font-bold mt-8 mb-4">Why Immich? Because, Why Not?</h2>
      <p>
        The main reason for this project was simple curiosity and the desire for digital freedom. I wanted a photo library that was truly <em>mine</em>, with no storage limits other than the size of my own hard drives, and no questions about who was looking at my data. Immich promised a Google Photos-like experience—with facial recognition, map views, and a great mobile app—but running entirely on my own hardware.
      </p>

      <h2 className="text-2xl font-bold mt-8 mb-4">The Setup: Docker to the Rescue</h2>
      <p>
        Getting started was surprisingly straightforward, thanks to Docker. The official Immich documentation is excellent, but as a visual learner, I found video tutorials to be a huge help. For anyone looking to do the same, these two are fantastic resources:
      </p>
      <ul className="list-disc list-inside">
        <li>For English speakers: <Link href="https://youtu.be/ZJH3ee-fnCc?si=aSHAlUQ2NfUeG_9d" target="_blank" rel="noopener noreferrer" className="underline">This comprehensive guide</Link> is a great starting point.</li>
        <li>For Bangla speakers: <Link href="https://youtu.be/NCxpkCTDnk8?si=Aqpl5r4Jxp6VLHDL" target="_blank" rel="noopener noreferrer" className="underline">This tutorial</Link> provides a clear, step-by-step walkthrough.</li>
      </ul>
      <p>
        I used Docker Desktop, which made managing the different parts of Immich (the server, the database, etc.) much simpler. I followed the guides, set up my storage paths, and everything seemed to be working. Or so I thought.
      </p>

      <h2 className="text-2xl font-bold mt-8 mb-4">The Mistake: The Glitch in the Machine</h2>
      <p>
        After the initial setup, I ran into some strange glitches. The interface would hang, or new photos wouldn't show up correctly. I spent a frustrating amount of time checking my configuration files, thinking I had made a complex error.
      </p>
      <p>
        The real problem? It was embarrassingly simple. <strong>I wasn't restarting the Docker containers after making changes.</strong>
      </p>
      <p>
        <strong>Lesson Learned:</strong> When you're working with a multi-container application like Immich, a simple restart is often the solution. If you edit your configuration, don't just save the file. Go into Docker Desktop and restart the entire Immich stack. It takes ten seconds and can save you hours of pointless troubleshooting.
      </p>

      <h2 className="text-2xl font-bold mt-8 mb-4">The Payoff: The Joy of Local Network Speed</h2>
      <p>
        Once I got past that simple hurdle, the magic happened. I opened the Immich app on my phone, pointed it to my server's local IP address, and started my first backup.
      </p>
      <p>
        And it was <em>fast</em>. Watching thousands of photos and videos fly from my phone to my server over my local Wi-Fi network was incredibly satisfying. There was no slow, throttled upload to a distant cloud server. It was pure, unadulterated local network speed. This was the moment I knew I had made the right choice.
      </p>
      <p>
        Now, I have a photo solution that's private, powerful, and entirely under my control. If you've ever felt limited by cloud storage and have a spare computer or server, I can't recommend giving Immich a try enough. The journey might have a few small bumps, but the destination is well worth it.
      </p>
    </article>
  );
}
