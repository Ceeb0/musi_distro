import React from 'react';
import { Beat } from '../types';
import { PlayIcon, PauseIcon } from './IconComponents';

interface AudioPlayerProps {
  track: Beat;
  isPlaying: boolean;
  progress: number;
  duration: number;
  onPlayPause: () => void;
  onSeek: (time: number) => void;
}

const formatTime = (seconds: number) => {
  if (isNaN(seconds)) return '0:00';
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
};

export const AudioPlayer: React.FC<AudioPlayerProps> = ({ track, isPlaying, progress, duration, onPlayPause, onSeek }) => {
  const progressPercentage = duration > 0 ? (progress / duration) * 100 : 0;

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (duration > 0) {
        const progressBar = e.currentTarget;
        const rect = progressBar.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const width = rect.width;
        const seekTime = (clickX / width) * duration;
        onSeek(seekTime);
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900/50 backdrop-blur-md border-t border-white/10 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-20 flex items-center justify-between">
          <div className="flex items-center space-x-4 w-1/4">
            <img src={track.coverArt} alt={track.title} className="w-12 h-12 rounded-md" />
            <div>
              <p className="text-white font-semibold truncate">{track.title}</p>
              <p className="text-gray-400 text-sm">{track.producer}</p>
            </div>
          </div>
          <div className="flex items-center space-x-4 w-1/2">
             <span className="text-gray-400 text-sm w-12 text-right">{formatTime(progress)}</span>
             <div className="w-full bg-gray-700 rounded-full h-1.5 group relative cursor-pointer" onClick={handleSeek}>
                <div 
                    className="bg-brand-500 h-1.5 rounded-full" 
                    style={{ width: `${progressPercentage}%` }}
                />
                <div 
                    className="w-3.5 h-3.5 bg-white rounded-full absolute top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity" 
                    style={{ left: `${progressPercentage}%`, transform: 'translateX(-50%)' }}
                />
             </div>
             <span className="text-gray-400 text-sm w-12">{formatTime(duration)}</span>
          </div>
          <div className="flex items-center justify-end w-1/4">
             <button onClick={onPlayPause} className="text-white hover:text-brand-500 transition-colors">
                {isPlaying ? <PauseIcon className="w-10 h-10" /> : <PlayIcon className="w-10 h-10" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};