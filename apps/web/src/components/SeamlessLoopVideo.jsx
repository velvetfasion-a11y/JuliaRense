
import React, { useEffect, useRef, useState } from 'react';

/**
 * Crossfades between two video elements at loop boundaries for a seamless repeat.
 */
const SeamlessLoopVideo = ({
  src,
  className = '',
  poster,
  playbackRate = 1,
  loopLeadSeconds = 0.5,
  crossfadeMs = 700,
}) => {
  const videoA = useRef(null);
  const videoB = useRef(null);
  const [active, setActive] = useState('a');
  const swapping = useRef(false);

  const applyPlaybackRate = (video) => {
    if (video) video.playbackRate = playbackRate;
  };

  useEffect(() => {
    applyPlaybackRate(videoA.current);
    applyPlaybackRate(videoB.current);
  }, [playbackRate]);

  useEffect(() => {
    const playBoth = async () => {
      applyPlaybackRate(videoA.current);
      applyPlaybackRate(videoB.current);
      try {
        await videoA.current?.play();
        await videoB.current?.play();
      } catch {
        /* autoplay policies */
      }
    };
    playBoth();
  }, [src, playbackRate]);

  useEffect(() => {
    const current = active === 'a' ? videoA.current : videoB.current;
    const next = active === 'a' ? videoB.current : videoA.current;
    if (!current || !next) return undefined;

    const onTimeUpdate = () => {
      const duration = current.duration;
      if (!duration || swapping.current) return;
      if (current.currentTime >= duration - loopLeadSeconds) {
        swapping.current = true;
        next.currentTime = 0;
        applyPlaybackRate(next);
        next.play().catch(() => {});
        setActive((prev) => (prev === 'a' ? 'b' : 'a'));
        window.setTimeout(() => {
          swapping.current = false;
        }, crossfadeMs);
      }
    };

    current.addEventListener('timeupdate', onTimeUpdate);
    return () => current.removeEventListener('timeupdate', onTimeUpdate);
  }, [active, loopLeadSeconds, crossfadeMs, playbackRate]);

  const sharedProps = {
    src,
    muted: true,
    playsInline: true,
    autoPlay: true,
    preload: 'auto',
    poster,
  };

  return (
    <div className={`relative h-full w-full overflow-hidden ${className}`}>
      <video
        ref={videoA}
        {...sharedProps}
        style={{ transitionDuration: `${crossfadeMs}ms` }}
        className={`absolute inset-0 h-full w-full object-cover transition-opacity ease-in-out ${
          active === 'a' ? 'opacity-100' : 'opacity-0'
        }`}
        aria-hidden={active !== 'a'}
      />
      <video
        ref={videoB}
        {...sharedProps}
        style={{ transitionDuration: `${crossfadeMs}ms` }}
        className={`absolute inset-0 h-full w-full object-cover transition-opacity ease-in-out ${
          active === 'b' ? 'opacity-100' : 'opacity-0'
        }`}
        aria-hidden={active !== 'b'}
      />
    </div>
  );
};

export default SeamlessLoopVideo;
