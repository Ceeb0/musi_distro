
import React, { useState, useMemo } from 'react';
import { Beat } from '../types';
import { BeatCard } from './BeatCard';
import { FilterSidebar } from './FilterSidebar';
import { SearchIcon } from './IconComponents';
import { PaymentModal } from './PaymentModal';

interface MarketplaceProps {
    beats: Beat[];
    loading: boolean;
    playTrack: (track: Beat) => void;
    currentTrack: Beat | null;
    isPlaying: boolean;
    onPurchase: (beat: Beat) => void;
    isArtist: boolean;
    favoritedBeatIds: string[];
    onToggleFavorite: (beatId: string) => void;
    formatCurrency: (priceInUsd: number) => string;
}

export const Marketplace: React.FC<MarketplaceProps> = ({ beats, loading, playTrack, currentTrack, isPlaying, onPurchase, isArtist, favoritedBeatIds, onToggleFavorite, formatCurrency }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeGenres, setActiveGenres] = useState<string[]>([]);
    const [activeMoods, setActiveMoods] = useState<string[]>([]);
    const [bpm, setBpm] = useState([40, 220]);
    const [paymentModalOpen, setPaymentModalOpen] = useState(false);
    const [selectedBeat, setSelectedBeat] = useState<Beat | null>(null);

    const handleBuyClick = (beat: Beat) => {
        if (!isArtist) return; // Or prompt to log in as artist
        
        if (beat.isFree) {
            onPurchase(beat);
            // In a real app, you might show a "Added to your library" toast message.
        } else {
            setSelectedBeat(beat);
            setPaymentModalOpen(true);
        }
    };

    const handleConfirmPurchase = () => {
        if (selectedBeat) {
            onPurchase(selectedBeat);
            setPaymentModalOpen(false);
            setSelectedBeat(null);
        }
    };

    const filteredBeats = useMemo(() => {
        return beats.filter(beat => {
            const searchTermMatch = beat.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                    beat.producer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                    beat.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
            const genreMatch = activeGenres.length === 0 || activeGenres.includes(beat.genre);
            const moodMatch = activeMoods.length === 0 || activeMoods.includes(beat.mood);
            const bpmMatch = beat.bpm >= bpm[0] && beat.bpm <= bpm[1];
            return searchTermMatch && genreMatch && moodMatch && bpmMatch;
        });
    }, [beats, searchTerm, activeGenres, activeMoods, bpm]);
    
    return (
        <>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row gap-8">
                    <FilterSidebar
                        activeGenres={activeGenres}
                        setActiveGenres={setActiveGenres}
                        activeMoods={activeMoods}
                        setActiveMoods={setActiveMoods}
                        bpm={bpm}
                        setBpm={setBpm}
                    />
                    <div className="w-full">
                        <div className="relative mb-6">
                            <input
                                type="text"
                                placeholder="Search for beats, producers, tags..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full bg-gray-800 border border-gray-700 rounded-lg py-3 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-500"
                            />
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <SearchIcon className="text-gray-500" />
                            </div>
                        </div>

                        {loading ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {Array.from({ length: 8 }).map((_, i) => (
                                <div key={i} className="bg-gray-800 rounded-lg p-4 animate-pulse">
                                    <div className="aspect-square bg-gray-700 rounded-md mb-4"></div>
                                    <div className="h-4 bg-gray-700 rounded w-3/4 mb-2"></div>
                                    <div className="h-3 bg-gray-700 rounded w-1/2"></div>
                                </div>
                            ))}
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {filteredBeats.map(beat => (
                                    <BeatCard 
                                        key={beat.id} 
                                        beat={beat} 
                                        onPlayClick={playTrack}
                                        isPlaying={currentTrack?.id === beat.id && isPlaying}
                                        onPurchaseClick={handleBuyClick}
                                        showPurchase={isArtist}
                                        showFavorite={isArtist}
                                        isFavorited={favoritedBeatIds.includes(beat.id)}
                                        onToggleFavorite={onToggleFavorite}
                                        formatCurrency={formatCurrency}
                                    />
                                ))}
                            </div>
                        )}
                        { !loading && filteredBeats.length === 0 && (
                            <div className="text-center py-16 text-gray-500">
                                <h3 className="text-xl font-semibold">No beats found</h3>
                                <p>Try adjusting your search or filters.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <PaymentModal
                isOpen={paymentModalOpen}
                onClose={() => setPaymentModalOpen(false)}
                onConfirm={handleConfirmPurchase}
                beat={selectedBeat}
                formatCurrency={formatCurrency}
            />
        </>
    );
};