





"use client";

import dynamic from "next/dynamic";
import { useState } from "react";

const ReactPlayer = dynamic(() => import("react-player/lazy"), { ssr: false });

interface VideoPlayerProps {
  url: string;
}

export const VideoPlayer = ({ url }: VideoPlayerProps) => {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="relative aspect-video bg-black rounded-xl overflow-hidden">
      {/* Custom Play Button */}
      {!playing && (
        <button
          onClick={() => setPlaying(true)}
          className="absolute inset-0 flex items-center justify-center bg-black/50 text-white text-3xl font-bold rounded-xl"
        >
          ▶ Play
        </button>
      )}

      <ReactPlayer
        url={url}
        width="100%"
        height="100%"
        playing={playing}
        controls={false} // Hide default YouTube controls
        pip={false}
        modestbranding={1}
        config={{
          youtube: {
            playerVars: { showinfo: 0, rel: 0, modestbranding: 1 },
          },

        }}
      />
    </div>
  );
};

