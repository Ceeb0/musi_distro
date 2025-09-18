
import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Marketplace } from './components/Marketplace';
import { ProducerDashboard } from './components/ProducerDashboard';
import { ArtistDashboard } from './components/ArtistDashboard';
import { AudioPlayer } from './components/AudioPlayer';
import { SubscriptionPage } from './components/SubscriptionPage';
import { ProfileSettings } from './components/ProfileSettings';
import { LoginPage } from './components/LoginPage';
import { SignUpPage } from './components/SignUpPage';
import { useAudioPlayer } from './hooks/useAudioPlayer';
import { Beat, User, UserRole, View, Plan, Currency } from './types';
import { MOCK_ARTIST, MOCK_PRODUCER, fetchBeats } from './services/mockApi';
import { plans } from './data/plans';

const CURRENCY_MAP: { [country: string]: Currency } = {
    'United States': { symbol: '$', code: 'USD', rate: 1 },
    'United Kingdom': { symbol: '£', code: 'GBP', rate: 0.82 },
    'Canada': { symbol: 'CA$', code: 'CAD', rate: 1.37 },
    'Australia': { symbol: 'A$', code: 'AUD', rate: 1.52 },
    'Germany': { symbol: '€', code: 'EUR', rate: 0.93 },
    'France': { symbol: '€', code: 'EUR', rate: 0.93 },
    'Japan': { symbol: '¥', code: 'JPY', rate: 157.0 },
    'Brazil': { symbol: 'R$', code: 'BRL', rate: 5.35 },
    'Nigeria': { symbol: '₦', code: 'NGN', rate: 1480.0 },
    'India': { symbol: '₹', code: 'INR', rate: 83.5 },
    'Other': { symbol: '$', code: 'USD', rate: 1 },
};

const getCurrencyByCountry = (country: string): Currency => {
    return CURRENCY_MAP[country] || CURRENCY_MAP['Other'];
};


const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [view, setView] = useState<View>('marketplace');
  const [allBeats, setAllBeats] = useState<Beat[]>([]);
  const [loadingBeats, setLoadingBeats] = useState(true);
  const [purchasedBeatIds, setPurchasedBeatIds] = useState<string[]>([]);
  const [favoritedBeatIds, setFavoritedBeatIds] = useState<string[]>([]);
  const [producerPlan, setProducerPlan] = useState<Plan | null>(null);
  const [artistRatings, setArtistRatings] = useState<{ [beatId: string]: number }>({});
  const [currency, setCurrency] = useState<Currency>(getCurrencyByCountry('United States'));

  const { 
    currentTrack, 
    isPlaying, 
    progress, 
    duration,
    playTrack,
    togglePlayPause,
    seek,
    audioRef
  } = useAudioPlayer();

  useEffect(() => {
    const loadBeats = async () => {
        setLoadingBeats(true);
        const data = await fetchBeats();
        setAllBeats(data);
        setLoadingBeats(false);
    };
    loadBeats();
  }, []);

  useEffect(() => {
    if (currentUser?.role === 'artist') {
        setArtistRatings(currentUser.ratings || {});
        setPurchasedBeatIds(currentUser.purchasedBeatIds || []);
        setFavoritedBeatIds(currentUser.favoritedBeatIds || []);
    } else {
        setArtistRatings({});
        setPurchasedBeatIds([]);
        setFavoritedBeatIds([]);
    }
     if (currentUser && currentUser.country) {
        setCurrency(getCurrencyByCountry(currentUser.country));
    } else {
        setCurrency(getCurrencyByCountry('United States')); // Default
    }

    if (currentUser?.role === 'producer') {
        setProducerPlan(prevPlan => {
            if (!prevPlan) {
                return plans.find(p => p.id === 'free') || null;
            }
            return prevPlan;
        });
    } else if (!currentUser) {
        setProducerPlan(null);
    }

  }, [currentUser]);

  const formatCurrency = (priceInUsd: number) => {
    const convertedPrice = priceInUsd * currency.rate;
    const isLargeCurrency = ['JPY', 'NGN', 'INR'].includes(currency.code);
    const formatted = convertedPrice.toLocaleString('en-US', {
        minimumFractionDigits: isLargeCurrency ? 0 : 2,
        maximumFractionDigits: isLargeCurrency ? 0 : 2,
    });
    return `${currency.symbol}${formatted}`;
  };

  const handleLogin = (email: string, role: UserRole): boolean => {
    // This is a mock login. In a real app, you'd verify credentials against a backend.
    const userToLogin = role === 'producer' ? MOCK_PRODUCER : MOCK_ARTIST;
    if (email.toLowerCase() === userToLogin.email.toLowerCase()) {
      setCurrentUser(userToLogin);
      setView(role === 'producer' ? 'producerDashboard' : 'artistDashboard');
      return true;
    }
    // Let's also check the other role in case the user selected the wrong one
    const otherUser = role === 'producer' ? MOCK_ARTIST : MOCK_PRODUCER;
     if (email.toLowerCase() === otherUser.email.toLowerCase()) {
      setCurrentUser(otherUser);
      setView(otherUser.role === 'producer' ? 'producerDashboard' : 'artistDashboard');
      return true;
    }
    return false;
  };

  const handleSignUp = (newUser: User) => {
    // In a real app, you would send this to your backend to create a user.
    // We'll just set them as the current user.
    console.log("New user signed up:", newUser);
    setCurrentUser(newUser);
    setView(newUser.role === 'producer' ? 'producerDashboard' : 'artistDashboard');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setView('marketplace');
  };
  
  const handlePurchase = (beat: Beat) => {
    if (!purchasedBeatIds.includes(beat.id)) {
        setPurchasedBeatIds(prev => [...prev, beat.id]);
        // In a real app, this would also be persisted to the backend.
    }
  }

  const handleToggleFavorite = (beatId: string) => {
    setFavoritedBeatIds(prev =>
      prev.includes(beatId)
        ? prev.filter(id => id !== beatId)
        : [...prev, beatId]
    );
    // In a real app, this would also be persisted to the backend.
  };

  const handleRateBeat = (beatId: string, rating: number) => {
    setAllBeats(prevBeats =>
      prevBeats.map(beat => {
        if (beat.id === beatId) {
          const oldRatingTotal = (beat.rating || 0) * (beat.ratingsCount || 0);
          const hasRatedBefore = artistRatings[beatId] !== undefined;

          const newRatingsCount = hasRatedBefore ? beat.ratingsCount! : (beat.ratingsCount || 0) + 1;
          
          const adjustedRatingTotal = hasRatedBefore
            ? oldRatingTotal - artistRatings[beatId] + rating
            : oldRatingTotal + rating;
          
          const newRating = adjustedRatingTotal / newRatingsCount;

          return { ...beat, rating: newRating, ratingsCount: newRatingsCount };
        }
        return beat;
      })
    );
    setArtistRatings(prev => ({ ...prev, [beatId]: rating }));
  };

  const handleUpdateProfile = (updatedData: Partial<User>, newAvatarUrl?: string) => {
    if (currentUser) {
        const updatedUser = { 
            ...currentUser, 
            ...updatedData,
            ...(newAvatarUrl && { avatarUrl: newAvatarUrl })
        };
        setCurrentUser(updatedUser);
        // This is where you would make an API call in a real app.
        console.log('User profile updated:', updatedUser);
    }
  };

  const handleSetView = (newView: View) => {
    if (!currentUser && (newView === 'producerDashboard' || newView === 'artistDashboard' || newView === 'profileSettings' || newView === 'subscription')) {
      setView('login');
    } else {
      setView(newView);
    }
  };

  const purchasedBeats = allBeats.filter(beat => purchasedBeatIds.includes(beat.id));
  const favoritedBeats = allBeats.filter(beat => favoritedBeatIds.includes(beat.id));

  const MainContent: React.FC = () => {
    switch (view) {
      case 'login':
        return <LoginPage onLogin={handleLogin} setView={handleSetView} />;
      case 'signup':
        return <SignUpPage onSignUp={handleSignUp} setView={handleSetView} />;
      case 'producerDashboard':
        return <ProducerDashboard setView={handleSetView} currentPlan={producerPlan} formatCurrency={formatCurrency} currency={currency} />;
      case 'artistDashboard':
        return <ArtistDashboard 
          purchasedBeats={purchasedBeats} 
          artistRatings={artistRatings}
          onRateBeat={handleRateBeat}
          favoritedBeats={favoritedBeats}
          favoritedBeatIds={favoritedBeatIds}
          onToggleFavorite={handleToggleFavorite}
          playTrack={playTrack}
          currentTrack={currentTrack}
          isPlaying={isPlaying}
          onPurchase={handlePurchase}
          formatCurrency={formatCurrency}
        />;
      case 'subscription':
        return <SubscriptionPage setView={handleSetView} currentPlan={producerPlan} setCurrentPlan={setProducerPlan} formatCurrency={formatCurrency} />;
      case 'profileSettings':
        return currentUser ? <ProfileSettings user={currentUser} onUpdateProfile={handleUpdateProfile} setView={handleSetView} /> : null;
      case 'marketplace':
      default:
        return <Marketplace 
            beats={allBeats}
            loading={loadingBeats}
            playTrack={playTrack} 
            currentTrack={currentTrack} 
            isPlaying={isPlaying}
            onPurchase={handlePurchase}
            isArtist={currentUser?.role === 'artist'}
            favoritedBeatIds={favoritedBeatIds}
// FIX: Changed onToggleFavorite to handleToggleFavorite
            onToggleFavorite={handleToggleFavorite}
            formatCurrency={formatCurrency}
        />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-200 font-sans flex flex-col">
      <Header 
        user={currentUser} 
        onLogout={handleLogout}
        setView={handleSetView}
        currentView={view}
      />
      <main className="flex-grow pt-20 pb-28">
        <MainContent />
      </main>
      {currentTrack && (
         <AudioPlayer 
          track={currentTrack}
          isPlaying={isPlaying}
          progress={progress}
          duration={duration}
          onPlayPause={togglePlayPause}
          onSeek={seek}
        />
      )}
      <audio ref={audioRef} />
    </div>
  );
};

export default App;
