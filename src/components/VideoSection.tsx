import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaExpand, FaCompress, FaVolumeUp, FaVolumeMute } from 'react-icons/fa';

interface VideoSectionProps {
  videoId: string;
  title?: string;
  description?: string;
}

// Define interfaces for the non-standard browser APIs
interface FullscreenElement extends HTMLDivElement {
  webkitRequestFullscreen?: () => Promise<void>;
  msRequestFullscreen?: () => Promise<void>;
}

interface FullscreenDocument extends Document {
  webkitExitFullscreen?: () => Promise<void>;
  msExitFullscreen?: () => Promise<void>;
  webkitFullscreenElement?: Element;
  msFullscreenElement?: Element;
}

const VideoSection: React.FC<VideoSectionProps> = ({
  videoId = "dQw4w9WgXcQ", // Default video ID (replace with your actual tutorial video)
  title = "See How It Works",
  description = "Watch this quick tutorial to learn how to make the most of our platform"
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [showControls, setShowControls] = useState<boolean>(false);
  
  const videoRef = useRef<HTMLIFrameElement>(null);
  const containerRef = useRef<FullscreenElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.3 });
  
  useEffect(() => {
    if (isInView && !isPlaying) {
      // Auto-play when in view (muted for browser autoplay policies)
      if (videoRef.current?.contentWindow) {
        videoRef.current.contentWindow.postMessage(
          '{"event":"command","func":"playVideo","args":""}', 
          '*'
        );
        setIsPlaying(true);
        setIsMuted(true);
      }
    }
  }, [isInView, isPlaying]);

  const toggleMute = () => {
    if (videoRef.current?.contentWindow) {
      if (isMuted) {
        videoRef.current.contentWindow.postMessage(
          '{"event":"command","func":"unMute","args":""}', 
          '*'
        );
      } else {
        videoRef.current.contentWindow.postMessage(
          '{"event":"command","func":"mute","args":""}', 
          '*'
        );
      }
      setIsMuted(!isMuted);
    }
  };

  const toggleFullscreen = () => {
    if (!isFullscreen && containerRef.current) {
      if (containerRef.current.requestFullscreen) {
        containerRef.current.requestFullscreen();
      } else if (containerRef.current.webkitRequestFullscreen) {
        containerRef.current.webkitRequestFullscreen();
      } else if (containerRef.current.msRequestFullscreen) {
        containerRef.current.msRequestFullscreen();
      }
    } else {
      const doc = document as FullscreenDocument;
      if (doc.exitFullscreen) {
        doc.exitFullscreen();
      } else if (doc.webkitExitFullscreen) {
        doc.webkitExitFullscreen();
      } else if (doc.msExitFullscreen) {
        doc.msExitFullscreen();
      }
    }
    setIsFullscreen(!isFullscreen);
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      const doc = document as FullscreenDocument;
      setIsFullscreen(
        !!doc.fullscreenElement || 
        !!doc.webkitFullscreenElement || 
        !!doc.msFullscreenElement
      );
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('msfullscreenchange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('msfullscreenchange', handleFullscreenChange);
    };
  }, []);

  return (
    <section className="py-24 px-4 bg-gray-100 text-gray-700">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-6xl mx-auto text-center"
      >
        <h2 className="text-4xl md:text-5xl font-bold font-serif mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">{title}</h2>
        <p className="text-lg md:text-xl mb-12 max-w-2xl mx-auto opacity-80">{description}</p>
        
        <div 
          className="relative w-full max-w-4xl mx-auto rounded-xl overflow-hidden shadow-[0_20px_80px_rgba(0,0,0,0.45)] aspect-video bg-black group"
          ref={containerRef}
          onMouseEnter={() => setShowControls(true)}
          onMouseLeave={() => setShowControls(false)}
        >
          <iframe
            ref={videoRef}
            src={`https://www.youtube.com/embed/${videoId}?enablejsapi=1&controls=0&rel=0&showinfo=0`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute top-0 left-0 w-full h-full border-0"
          ></iframe>
          
          {/* Custom video controls */}
          <div className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 flex justify-center gap-4 transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'} z-10`}>

            <button 
              onClick={toggleMute} 
              className="bg-white/20 hover:bg-white/30 w-10 h-10 rounded-full flex items-center justify-center text-white transition-all duration-200 hover:scale-110"
            >
              {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
            </button>
            <button 
              onClick={toggleFullscreen} 
              className="bg-white/20 hover:bg-white/30 w-10 h-10 rounded-full flex items-center justify-center text-white transition-all duration-200 hover:scale-110"
            >
              {isFullscreen ? <FaCompress /> : <FaExpand />}
            </button>
          </div>
          
          {/* Glowing border effect on hover */}
          <div className="absolute -inset-[2px] bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
        </div>
      </motion.div>
    </section>
  );
};

export default VideoSection;
