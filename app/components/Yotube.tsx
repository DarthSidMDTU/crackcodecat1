"use client";
import React, { useEffect, useRef } from "react";

declare global {
  interface Window {
    YT: {
      Player: new (id: string, options: object) => YTPlayer;
    };
    onYouTubeIframeAPIReady?: () => void;
  }
}

interface YTPlayer {
  playVideo: () => void;
  pauseVideo: () => void;
  destroy: () => void;
}

interface VideoSectionProps {
  videoId: string;
}

export default function VideoSection({ videoId }: VideoSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<YTPlayer | null>(null);

  useEffect(() => {
    let observer: IntersectionObserver;

    const onYouTubeIframeAPIReady = () => {
      if (!playerRef.current) {
        playerRef.current = new window.YT.Player(`Youtubeer-${videoId}`, {
          videoId: videoId,
          playerVars: {
            autoplay: 0,
            controls: 1,
            mute: 1,
            loop: 1,
            playlist: videoId,
            modestbranding: 1,
            rel: 0,
          },
          events: {
            onReady: onPlayerReady,
          },
        });
      }
    };

    const onPlayerReady = () => {
      observer = new IntersectionObserver(
        (entries: IntersectionObserverEntry[]) => {
          if (entries[0].isIntersecting) {
            playerRef.current?.playVideo();
          } else {
            playerRef.current?.pauseVideo();
          }
        },
        { threshold: 0.5 }
      );

      if (containerRef.current) {
        observer.observe(containerRef.current);
      }
    };

    if (!window.YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;
      const firstScriptTag = document.getElementsByTagName("script")[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
    } else {
      onYouTubeIframeAPIReady();
    }

    return () => {
      if (observer && containerRef.current) {
        observer.unobserve(containerRef.current);
      }
      if (playerRef.current) {
        playerRef.current.destroy();
        playerRef.current = null;
      }
    };
  }, [videoId]);

  return (
    <section className="py-16 sm:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
        <div className="mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">
            See Our Platform in Action
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
            Watch this short video to see how our unique methods can transform
            your CAT preparation.
          </p>
        </div>

        {/* Responsive Video */}
        <div className="w-full max-w-4xl mx-auto">
          <div
            ref={containerRef}
            className="relative w-full overflow-hidden rounded-xl shadow-2xl pt-[56.25%]"
          >
            <div
              id={`Youtubeer-${videoId}`}
              className="absolute inset-0 w-full h-full border-none"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
