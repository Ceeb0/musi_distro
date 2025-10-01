import React from 'react';
import { Beat } from '../types';
import { PlayIcon, PauseIcon, CartIcon, DownloadIcon, HeartIcon } from './IconComponents';
import { StarRating } from './StarRating';

interface BeatCardProps {
    beat: Beat;
    onPlayClick: (beat: Beat) => void;
    isPlaying: boolean;
    onPurchaseClick: (beat: Beat) => void;
    showPurchase: boolean;
    showFavorite?: boolean;
    isFavorited?: boolean;
    onToggleFavorite?: (beatId: string) => void;
    formatCurrency: (priceInUsd: number) => string;
    onProducerClick?: (producerName: string) => void;
}

export const BeatCard: React.FC<BeatCardProps> = ({ 
    beat, 
    onPlayClick, 
    isPlaying, 
    onPurchaseClick, 
    showPurchase,
    showFavorite = false,
    isFavorited = false,
    onToggleFavorite = () => {},
    formatCurrency,
    onProducerClick
}) => {
    return (
        <div className="bg-gray-900/50 backdrop-blur-md border border-white/10 shadow-lg rounded-xl overflow-hidden group transition-all duration-300 hover:shadow-lg hover:shadow-brand-500/20">
            <div className="relative aspect-square">
                <img src={beat.coverArt} alt={beat.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button 
                        onClick={() => onPlayClick(beat)}
                        className="w-16 h-16 bg-brand-500/80 rounded-full flex items-center justify-center text-white hover:bg-brand-500 transition-colors"
                        aria-label={isPlaying ? 'Pause' : 'Play'}
                    >
                        {isPlaying ? <PauseIcon className="w-8 h-8"/> : <PlayIcon className="w-8 h-8" />}
                    </button>
                </div>
            </div>
            <div className="p-4">
                <h3 className="text-white font-semibold truncate">{beat.title}</h3>
                <p 
                    className={`text-gray-400 text-sm truncate ${onProducerClick ? 'cursor-pointer hover:text-white transition-colors' : ''}`}
                    onClick={onProducerClick ? () => onProducerClick(beat.producer) : undefined}
                >
                    {beat.producer}
                </p>
                <div className="flex items-center justify-between mt-3">
                     <div className="flex flex-col">
                        {beat.isFree ? (
                            <span className="text-green-400 font-bold">Free</span>
                        ) : (
                            <span className="text-brand-500 font-bold">{formatCurrency(beat.price)}</span>
                        )}
                        {beat.rating !== undefined && beat.ratingsCount !== undefined && beat.ratingsCount > 0 && (
                            <div className="flex items-center gap-1 mt-1">
                                <StarRating rating={beat.rating} readOnly size="w-3 h-3" />
                                <span className="text-xs text-gray-500">({beat.ratingsCount})</span>
                            </div>
                        )}
                    </div>
                     <div className="flex items-center space-x-2">
                        {showFavorite && (
                            <button 
                                onClick={() => onToggleFavorite(beat.id)} 
                                className={`p-2 bg-gray-800/50 rounded-full transition-colors ${isFavorited ? 'text-red-500' : 'text-gray-400 hover:text-red-500'}`}
                                aria-label={isFavorited ? "Remove from favorites" : "Add to favorites"}
                            >
                                <HeartIcon className="w-4 h-4" filled={isFavorited} />
                            </button>
                        )}
                        {showPurchase && (
                            <button 
                                onClick={() => onPurchaseClick(beat)} 
                                className="p-2 bg-gray-800/50 rounded-full text-gray-400 hover:bg-brand-500 hover:text-white transition-colors"
                                aria-label={beat.isFree ? "Download beat" : "Purchase beat"}
                            >
                                {beat.isFree ? <DownloadIcon className="w-4 h-4" /> : <CartIcon className="w-4 h-4" />}
                            </button>
                        )}
                        <span className="text-xs text-gray-500 bg-gray-800/50 px-2 py-1 rounded">{beat.bpm} BPM</span>
                    </div>
                </div>
            </div>
        </div>
    );
};