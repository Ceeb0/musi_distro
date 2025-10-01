import React, { useState } from 'react';
import { Beat, Contract } from '../types';
import { StarRating } from './StarRating';
import { BeatCard } from './BeatCard';
import { PaymentModal } from './PaymentModal';
import { DownloadIcon } from './IconComponents';
import { ContractModal } from './ContractModal';

interface ArtistDashboardProps {
    purchasedBeats: Beat[];
    contracts: Contract[];
    artistRatings: { [beatId: string]: number };
    onRateBeat: (beatId: string, rating: number) => void;
    favoritedBeats: Beat[];
    favoritedBeatIds: string[];
    onToggleFavorite: (beatId: string) => void;
    playTrack: (track: Beat) => void;
    currentTrack: Beat | null;
    isPlaying: boolean;
    onPurchase: (beat: Beat, licenseType: 'Non-Exclusive' | 'Exclusive', signature: string) => void;
    formatCurrency: (priceInUsd: number) => string;
    onViewProducer: (producerName: string) => void;
}

const TabButton: React.FC<{
    label: string;
    isActive: boolean;
    onClick: () => void;
}> = ({ label, isActive, onClick }) => (
    <button
        onClick={onClick}
        className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
            isActive ? 'bg-brand-500 text-white' : 'text-gray-400 hover:bg-gray-800/50'
        }`}
    >
        {label}
    </button>
);

export const ArtistDashboard: React.FC<ArtistDashboardProps> = ({ 
    purchasedBeats, 
    contracts,
    artistRatings, 
    onRateBeat,
    favoritedBeats,
    favoritedBeatIds,
    onToggleFavorite,
    playTrack,
    currentTrack,
    isPlaying,
    onPurchase,
    formatCurrency,
    onViewProducer
}) => {
    const [activeTab, setActiveTab] = useState<'purchased' | 'favorites'>('purchased');
    const [paymentModalOpen, setPaymentModalOpen] = useState(false);
    const [contractModalOpen, setContractModalOpen] = useState(false);
    const [selectedBeat, setSelectedBeat] = useState<Beat | null>(null);
    const [selectedContract, setSelectedContract] = useState<Contract | null>(null);
    const [downloadingBeatId, setDownloadingBeatId] = useState<string | null>(null);

    const handleDownload = async (beat: Beat) => {
        setDownloadingBeatId(beat.id);
        try {
            // In a real app, this URL should point to the full, non-watermarked version
            // and the request might need authentication headers.
            const response = await fetch(beat.audioUrl);
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            a.download = `${beat.title} - ${beat.producer}.mp3`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            a.remove();
        } catch (error) {
            console.error('Download failed:', error);
            alert('Could not download the file. Please try again later.');
        } finally {
            setDownloadingBeatId(null);
        }
    };

    const handleBuyClick = (beat: Beat) => {
        if (beat.isFree) {
            onPurchase(beat, 'Non-Exclusive', 'N/A (Free Download)');
        } else {
            setSelectedBeat(beat);
            setPaymentModalOpen(true);
        }
    };
    
    const handleViewContract = (beatId: string) => {
        const contract = contracts.find(c => c.beatId === beatId);
        if (contract) {
            setSelectedContract(contract);
            setContractModalOpen(true);
        }
    };

    const handleConfirmPurchase = (licenseType: 'Non-Exclusive' | 'Exclusive', signature: string) => {
        if (selectedBeat) {
            onPurchase(selectedBeat, licenseType, signature);
            setPaymentModalOpen(false);
            setSelectedBeat(null);
        }
    };

    return (
        <>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-8">
                 <h1 className="text-3xl font-bold text-adaptive-white">Artist Dashboard</h1>
                 <div className="flex items-center space-x-2 bg-gray-900/50 backdrop-blur-md border border-white/10 p-1 rounded-lg">
                    <TabButton label="Purchased" isActive={activeTab === 'purchased'} onClick={() => setActiveTab('purchased')} />
                    <TabButton label="Favorites" isActive={activeTab === 'favorites'} onClick={() => setActiveTab('favorites')} />
                 </div>
            </div>

            {activeTab === 'purchased' && (
                <div>
                    <h2 className="text-xl font-semibold text-adaptive-white mb-4">My Purchased Beats</h2>
                    <div className="bg-gray-900/50 backdrop-blur-md border border-white/10 shadow-lg rounded-xl overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-gray-800/50">
                                    <tr>
                                        <th className="p-4 text-sm font-semibold text-gray-300">Beat</th>
                                        <th className="p-4 text-sm font-semibold text-gray-300">Your Rating</th>
                                        <th className="p-4 text-sm font-semibold text-gray-300">Contract</th>
                                        <th className="p-4 text-sm font-semibold text-gray-300 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {purchasedBeats.length > 0 ? purchasedBeats.map((beat, index) => (
                                        <tr key={beat.id} className={`${index % 2 === 0 ? 'bg-gray-900/30' : 'bg-gray-800/30'} border-t border-white/10`}>
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
                                            <td className="p-4">
                                                <button onClick={() => handleViewContract(beat.id)} className="text-sm text-brand-500 hover:underline">
                                                    View
                                                </button>
                                            </td>
                                            <td className="p-4 text-right">
                                                <button
                                                    onClick={() => handleDownload(beat)}
                                                    disabled={downloadingBeatId === beat.id}
                                                    className="px-4 py-2 text-sm font-medium text-white bg-brand-500 rounded-md hover:bg-brand-600 transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed flex items-center justify-center min-w-[120px]"
                                                >
                                                    {downloadingBeatId === beat.id ? (
                                                        <>
                                                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                            </svg>
                                                            <span>Downloading...</span>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <DownloadIcon className="w-4 h-4 mr-2" />
                                                            <span>Download</span>
                                                        </>
                                                    )}
                                                </button>
                                            </td>
                                        </tr>
                                    )) : (
                                        <tr>
                                            <td colSpan={4} className="text-center py-16 text-gray-500">
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
                    <h2 className="text-xl font-semibold text-adaptive-white mb-4">My Favorites</h2>
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
                                    onProducerClick={onViewProducer}
                                    formatCurrency={formatCurrency}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-16 text-gray-400 bg-gray-900/50 backdrop-blur-md border border-white/10 shadow-lg rounded-xl">
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
        <ContractModal
            isOpen={contractModalOpen}
            onClose={() => setContractModalOpen(false)}
            contract={selectedContract}
        />
        </>
    );
};
