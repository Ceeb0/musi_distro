import React, { useMemo, useState } from 'react';
import { Beat, User, View } from '../types';
import { BeatCard } from './BeatCard';
import { UploadBeatModal } from './UploadBeatModal';
import { 
    TwitterIcon, InstagramIcon, SpotifyIcon, YoutubeIcon, UserEditIcon, 
    UploadIcon, MusicNoteIcon, DownloadIcon, CurrencyDollarIcon, StarIcon, LinkedInIcon 
} from './IconComponents';
import { PaymentModal } from './PaymentModal';

interface ProducerProfilePageProps {
    producer: User;
    beats: Beat[];
    currentUser: User | null;
    onUploadBeat: (newBeat: Beat) => void;
    playTrack: (track: Beat) => void;
    currentTrack: Beat | null;
    isPlaying: boolean;
    // FIX: Update onPurchase signature to match what App.tsx provides.
    onPurchase: (beat: Beat, licenseType: 'Non-Exclusive' | 'Exclusive', signature: string) => void;
    isArtist: boolean;
    favoritedBeatIds: string[];
    onToggleFavorite: (beatId: string) => void;
    formatCurrency: (priceInUsd: number) => string;
    setView: (view: View) => void;
    onViewProducer: (producerName: string) => void;
}

const StatCard: React.FC<{
    icon: React.ReactNode;
    label: string;
    value: string | number;
}> = ({ icon, label, value }) => (
    <div className="bg-gray-900/50 backdrop-blur-md border border-white/10 shadow-lg rounded-xl p-4 flex items-center space-x-4">
        <div className="bg-gray-800/50 p-3 rounded-full">
            {icon}
        </div>
        <div>
            <p className="text-sm text-gray-400">{label}</p>
            <p className="text-xl font-bold text-white">{value}</p>
        </div>
    </div>
);

const SocialLink: React.FC<{ href?: string; children: React.ReactNode }> = ({ href, children }) => {
    if (!href) return null;
    return (
        <a href={href} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-brand-500 transition-colors">
            {children}
        </a>
    );
};

export const ProducerProfilePage: React.FC<ProducerProfilePageProps> = (props) => {
    const { producer, beats, currentUser, onUploadBeat, setView, formatCurrency, onPurchase, isArtist } = props;
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
    const [paymentModalOpen, setPaymentModalOpen] = useState(false);
    const [selectedBeat, setSelectedBeat] = useState<Beat | null>(null);

    const isOwner = currentUser?.id === producer.id;

    const stats = useMemo(() => {
        const totalUploads = beats.length;
        const totalSalesValue = beats.reduce((acc, beat) => acc + (Math.random() * 50 * beat.price), 0); // Mocked sales
        const totalDownloads = Math.floor(totalSalesValue / 20 + totalUploads * 10); // Mocked downloads
        const validRatings = beats.filter(b => b.rating && b.ratingsCount && b.ratingsCount > 0);
        const totalRatingValue = validRatings.reduce((acc, b) => acc + (b.rating! * b.ratingsCount!), 0);
        const totalRatingsCount = validRatings.reduce((acc, b) => acc + b.ratingsCount!, 0);
        const averageRating = totalRatingsCount > 0 ? (totalRatingValue / totalRatingsCount).toFixed(1) : 'N/A';

        return { totalUploads, totalSalesValue, totalDownloads, averageRating };
    }, [beats]);

    const handleUpload = (newBeat: Beat) => {
        onUploadBeat(newBeat);
        setIsUploadModalOpen(false);
    };

    const handleBuyClick = (beat: Beat) => {
        if (!isArtist) return; 
        
        if (beat.isFree) {
            onPurchase(beat, 'Non-Exclusive', 'N/A (Free Download)');
        } else {
            setSelectedBeat(beat);
            setPaymentModalOpen(true);
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
                {/* Profile Header */}
                <div className="bg-gray-900/50 backdrop-blur-md border border-white/10 shadow-lg rounded-xl p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 md:gap-8 mb-8">
                    <img src={producer.avatarUrl} alt={producer.name} className="w-32 h-32 rounded-full object-cover border-4 border-gray-700/50" />
                    <div className="text-center md:text-left flex-grow">
                        <h1 className="text-3xl md:text-4xl font-bold text-white">{producer.name}</h1>
                        <p className="text-gray-400 mt-2 max-w-2xl">{producer.bio || 'This producer has not set a bio yet.'}</p>
                        <div className="flex items-center justify-center md:justify-start space-x-4 mt-4">
                            <SocialLink href={producer.socialLinks?.twitter}><TwitterIcon /></SocialLink>
                            <SocialLink href={producer.socialLinks?.instagram}><InstagramIcon /></SocialLink>
                            <SocialLink href={producer.socialLinks?.linkedin}><LinkedInIcon /></SocialLink>
                            <SocialLink href={producer.socialLinks?.spotify}><SpotifyIcon /></SocialLink>
                            <SocialLink href={producer.socialLinks?.youtube}><YoutubeIcon /></SocialLink>
                        </div>
                    </div>
                    {isOwner && (
                        <button 
                            onClick={() => setView('profileSettings')} 
                            className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-white bg-gray-700/80 rounded-md hover:bg-gray-600/80 transition-colors flex-shrink-0"
                        >
                            <UserEditIcon className="w-4 h-4" />
                            <span>Edit Profile</span>
                        </button>
                    )}
                </div>

                {/* Stats Section */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <StatCard icon={<MusicNoteIcon className="w-6 h-6 text-brand-500" />} label="Beats Uploaded" value={stats.totalUploads} />
                    <StatCard icon={<DownloadIcon className="w-6 h-6 text-blue-400" />} label="Total Downloads" value={stats.totalDownloads.toLocaleString()} />
                    <StatCard icon={<CurrencyDollarIcon className="w-6 h-6 text-green-400" />} label="Total Sales" value={formatCurrency(stats.totalSalesValue)} />
                    <StatCard icon={<StarIcon className="w-6 h-6 text-yellow-400" fill="currentColor" />} label="Average Rating" value={stats.averageRating} />
                </div>
                
                {/* Beats Section */}
                <div>
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-adaptive-white">Uploaded Beats</h2>
                        {isOwner && (
                             <button 
                                onClick={() => setIsUploadModalOpen(true)}
                                className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-white bg-brand-500 rounded-md hover:bg-brand-600 transition-colors"
                            >
                                <UploadIcon className="w-4 h-4" />
                                <span>Upload Beat</span>
                            </button>
                        )}
                    </div>

                    {beats.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {beats.map(beat => (
                                <BeatCard 
                                    key={beat.id} 
                                    beat={beat}
                                    onPlayClick={props.playTrack}
                                    isPlaying={props.currentTrack?.id === beat.id && props.isPlaying}
                                    onPurchaseClick={handleBuyClick}
                                    showPurchase={props.isArtist}
                                    showFavorite={props.isArtist}
                                    isFavorited={props.favoritedBeatIds.includes(beat.id)}
                                    onToggleFavorite={props.onToggleFavorite}
                                    onProducerClick={props.onViewProducer}
                                    formatCurrency={props.formatCurrency}
                                />
                            ))}
                        </div>
                    ) : (
                         <div className="text-center py-20 text-gray-500 bg-gray-900/50 backdrop-blur-md border border-dashed border-white/10 rounded-xl">
                            <h3 className="text-xl font-semibold">{isOwner ? 'You have no beats uploaded.' : `${producer.name} has no beats uploaded.`}</h3>
                            <p className="mt-1">{isOwner ? 'Click the "Upload Beat" button to get started.' : 'Check back later!'}</p>
                        </div>
                    )}
                </div>
            </div>
            <UploadBeatModal
                isOpen={isUploadModalOpen}
                onClose={() => setIsUploadModalOpen(false)}
                onUpload={handleUpload}
            />
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