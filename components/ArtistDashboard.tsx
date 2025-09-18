import React, { useState } from 'react';
import { Beat } from '../types';
import { StarRating } from './StarRating';
import { BeatCard } from './BeatCard';
import { PaymentModal } from './PaymentModal';

interface ArtistDashboardProps {
    purchasedBeats: Beat[];
    artistRatings: { [beatId: string]: number };
    onRateBeat: (beatId: string, rating: number) => void;
    favoritedBeats: Beat[];
    favoritedBeatIds: string[];
    onToggleFavorite: (beatId: string) => void;
    playTrack: (track: Beat) => void;
    currentTrack: Beat | null;
    isPlaying: boolean;
    onPurchase: (beat: Beat) => void;
    formatCurrency: (priceInUsd: number) => string;
}

const TabButton: React.FC<{
    label: string;
    isActive: boolean;
    onClick: () => void;
}> = ({ label, isActive, onClick }) => (
    <button
        onClick={onClick}
        className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
            isActive ? 'bg-brand-500 text-white' : 'text-gray-400 hover:bg-gray-800'
        }`}
    >
        {label}
    </button>
);

export const ArtistDashboard: React.FC<ArtistDashboardProps> = ({ 
    purchasedBeats, 
    artistRatings, 
    onRateBeat,
    favoritedBeats,
    favoritedBeatIds,
    onToggleFavorite,
    playTrack,
    currentTrack,
    isPlaying,
    onPurchase,
    formatCurrency
}) => {
    const [activeTab, setActiveTab] = useState<'purchased' | 'favorites'>('purchased');
    const [paymentModalOpen, setPaymentModalOpen] = useState(false);
    const [selectedBeat, setSelectedBeat] = useState<Beat | null>(null);

    const handleBuyClick = (beat: Beat) => {
        if (beat.isFree) {
            onPurchase(beat);
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


    return (
        <>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-8">
                 <h1 className="text-3xl font-bold text-white">Artist Dashboard</h1>
                 <div className="flex items-center space-x-2 bg-gray-900 p-1 rounded-lg">
                    <TabButton label="Purchased" isActive={activeTab === 'purchased'} onClick={() => setActiveTab('purchased')} />
                    <TabButton label="Favorites" isActive={activeTab === 'favorites'} onClick={() => setActiveTab('favorites')} />
                 </div>
            </div>

            {activeTab === 'purchased' && (
                <div>
                    <h2 className="text-xl font-semibold text-white mb-4">My Purchased Beats</h2>
                    <div className="bg-gray-900 rounded-lg overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-gray-800">
                                    <tr>
                                        <th className="p-4 text-sm font-semibold text-gray-300">Beat</th>
                                        <th className="p-4 text-sm font-semibold text-gray-300">Your Rating</th>
                                        <th className="p-4 text-sm font-semibold text-gray-300 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {purchasedBeats.length > 0 ? purchasedBeats.map((beat, index) => (
                                        <tr key={beat.id} className={`${index % 2 === 0 ? 'bg-gray-900' : 'bg-gray-800/50'} border-t border-gray-800`}>
                                            <td className="p-4">
                                                <div className="flex items-center space-x-4">
                                                    <img src={beat.coverArt} alt={beat.title} className="w-12 h-12 rounded-md" />
                                                    <div>
                                                        <p className="text-white font-medium">{beat.title}</p>
                                                        <p className="text-sm text-gray-400">{beat.producer}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <StarRating 
                                                    rating={artistRatings[beat.id] || 0}
                                                    onRate={(rating) => onRateBeat(beat.id, rating)}
                                                    size="w-5 h-5"
                                                />
                                            </td>
                                            <td className="p-4 text-right">
                                                <button className="px-4 py-2 text-sm font-medium text-white bg-brand-500 rounded-md hover:bg-brand-600 transition-colors">
                                                    Download
                                                </button>
                                            </td>
                                        </tr>
                                    )) : (
                                        <tr>
                                            <td colSpan={3} className="text-center py-16 text-gray-500">
                                                <h3 className="text-lg font-semibold">No beats purchased yet.</h3>
                                                <p>Explore the marketplace to find your next hit.</p>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}
            
            {activeTab === 'favorites' && (
                 <div>
                    <h2 className="text-xl font-semibold text-white mb-4">My Favorites</h2>
                    {favoritedBeats.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                            {favoritedBeats.map(beat => (
                                <BeatCard 
                                    key={beat.id}
                                    beat={beat}
                                    onPlayClick={playTrack}
                                    isPlaying={currentTrack?.id === beat.id && isPlaying}
                                    onPurchaseClick={handleBuyClick}
                                    showPurchase={true}
                                    showFavorite={true}
                                    isFavorited={favoritedBeatIds.includes(beat.id)}
                                    onToggleFavorite={onToggleFavorite}
                                    formatCurrency={formatCurrency}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-16 text-gray-500 bg-gray-900 rounded-lg">
                            <h3 className="text-lg font-semibold">Your favorites list is empty.</h3>
                            <p>Browse the marketplace and click the heart icon to add beats.</p>
                        </div>
                    )}
                 </div>
            )}

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