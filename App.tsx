
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
import { ForgotPasswordPage } from './components/ForgotPasswordPage';
import { CollaborationHub } from './components/CollaborationHub';
import { EarningsDashboard } from './components/EarningsDashboard';
import { useAudioPlayer } from './hooks/useAudioPlayer';
import { Beat, User, UserRole, View, Plan, Currency, Contract } from './types';
import { MOCK_ARTIST, MOCK_PRODUCER, fetchBeats, MOCK_USERS } from './services/mockApi';
import { plans } from './data/plans';
import { ProducerProfilePage } from './components/ProducerProfilePage';
import { generateContractText } from './utils/contractHelper';

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
  const [viewedProducer, setViewedProducer] = useState<User | null>(null);
  const [allBeats, setAllBeats] = useState<Beat[]>([]);
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [loadingBeats, setLoadingBeats] = useState(true);
  const [purchasedBeatIds, setPurchasedBeatIds] = useState<string[]>([]);
  const [favoritedBeatIds, setFavoritedBeatIds] = useState<string[]>([]);
  const [producerPlan, setProducerPlan] = useState<Plan | null>(null);
  const [artistRatings, setArtistRatings] = useState<{ [beatId: string]: number }>({});
  const [currency, setCurrency] = useState<Currency>(getCurrencyByCountry('United States'));
  const [contracts, setContracts] = useState<Contract[]>([]);

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
    const loadData = async () => {
        setLoadingBeats(true);
        const beatsData = await fetchBeats();
        setAllBeats(beatsData);
        setAllUsers(MOCK_USERS); // Load all mock users
        setLoadingBeats(false);
    };
    loadData();
  }, []);

  useEffect(() => {
    if (currentUser?.role === 'artist') {
        setArtistRatings(currentUser.ratings || {});
        setPurchasedBeatIds(currentUser.purchasedBeatIds || []);
        setFavoritedBeatIds(currentUser.favoritedBeatIds || []);
        setContracts(currentUser.contracts || []);
    } else {
        setArtistRatings({});
        setPurchasedBeatIds([]);
        setFavoritedBeatIds([]);
        setContracts([]);
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
    const userToLogin = MOCK_USERS.find(u => u.email.toLowerCase() === email.toLowerCase());
    
    if (userToLogin) {
      setCurrentUser(userToLogin);
      setView(userToLogin.role === 'producer' ? 'producerDashboard' : 'artistDashboard');
      return true;
    }
    return false;
  };

  const handleSignUp = (newUser: User) => {
    console.log("New user signed up:", newUser);
    MOCK_USERS.push(newUser); // Add to our mock user base
    setAllUsers([...MOCK_USERS]);
    setCurrentUser(newUser);
    setView(newUser.role === 'producer' ? 'producerDashboard' : 'artistDashboard');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setView('marketplace');
  };
  
  const handlePurchase = (beat: Beat, licenseType: 'Non-Exclusive' | 'Exclusive', signature: string) => {
    if (!currentUser || currentUser.role !== 'artist') return;

    if (!purchasedBeatIds.includes(beat.id)) {
        const producer = MOCK_USERS.find(u => u.name === beat.producer);
        if (!producer) {
            console.error("Producer not found for this beat");
            return;
        }

        const price = licenseType === 'Exclusive' ? beat.exclusivePrice! : beat.price;

        const newContract: Contract = {
            id: `contract_${Date.now()}`,
            beatId: beat.id,
            beatTitle: beat.title,
            artistId: currentUser.id,
            artistName: currentUser.name,
            producerId: producer.id,
            producerName: producer.name,
            licenseType,
            price,
            signedDate: new Date().toISOString(),
            signature,
            contractText: generateContractText(beat, currentUser, producer, licenseType, price, formatCurrency)
        };
        
        setContracts(prev => [...prev, newContract]);
        setPurchasedBeatIds(prev => [...prev, beat.id]);
        
        // In a real app, this would be persisted to the backend for both artist and producer.
        console.log("New Contract created:", newContract);
    }
  }

  const handleToggleFavorite = (beatId: string) => {
    setFavoritedBeatIds(prev =>
      prev.includes(beatId)
        ? prev.filter(id => id !== beatId)
        : [...prev, beatId]
    );
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
        setAllUsers(prevUsers => prevUsers.map(u => u.id === currentUser.id ? updatedUser : u));
        console.log('User profile updated:', updatedUser);
    }
  };

  const handleSetView = (newView: View) => {
    if (newView !== 'producerProfile') {
      setViewedProducer(null);
    }
    const protectedViews: View[] = ['producerDashboard', 'artistDashboard', 'profileSettings', 'subscription', 'earnings'];
    if (!currentUser && (protectedViews.includes(newView) || (newView === 'producerProfile' && !viewedProducer))) {
      setView('login');
    } else {
      setView(newView);
    }
  };

  const handleViewProducer = (producerName: string) => {
    const producer = MOCK_USERS.find(u => u.name === producerName && u.role === 'producer');
    if (producer) {
      setViewedProducer(producer);
      setView('producerProfile');
    } else {
      console.warn(`Profile for ${producerName} not found.`);
    }
  };

  const handleBeatUpload = (newBeat: Beat) => {
    setAllBeats(prev => [newBeat, ...prev]);
  };

  const purchasedBeats = allBeats.filter(beat => purchasedBeatIds.includes(beat.id));
  const favoritedBeats = allBeats.filter(beat => favoritedBeatIds.includes(beat.id));

  const MainContent: React.FC = () => {
    switch (view) {
      case 'login':
        return <LoginPage onLogin={handleLogin} setView={handleSetView} />;
      case 'signup':
        return <SignUpPage onSignUp={handleSignUp} setView={handleSetView} />;
      case 'forgotPassword':
        return <ForgotPasswordPage setView={handleSetView} />;
      case 'producerDashboard':
        const producerBeatsForDashboard = allBeats.filter(b => b.producer === currentUser?.name);
        return <ProducerDashboard beats={producerBeatsForDashboard} setView={handleSetView} currentPlan={producerPlan} formatCurrency={formatCurrency} currency={currency} />;
      case 'artistDashboard':
        return <ArtistDashboard 
          purchasedBeats={purchasedBeats} 
          contracts={contracts}
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
          onViewProducer={handleViewProducer}
        />;
      case 'subscription':
        return <SubscriptionPage setView={handleSetView} currentPlan={producerPlan} setCurrentPlan={setProducerPlan} formatCurrency={formatCurrency} />;
      case 'profileSettings':
        return currentUser ? <ProfileSettings user={currentUser} onUpdateProfile={handleUpdateProfile} setView={handleSetView} /> : null;
      case 'producerProfile':
        const producerToShow = viewedProducer || (currentUser?.role === 'producer' ? currentUser : null);
        if (!producerToShow) {
          setView('marketplace');
          return null; 
        }
        const producerBeats = allBeats.filter(beat => beat.producer === producerToShow.name);
        return <ProducerProfilePage
            producer={producerToShow}
            beats={producerBeats}
            currentUser={currentUser}
            onUploadBeat={handleBeatUpload}
            playTrack={playTrack}
            currentTrack={currentTrack}
            isPlaying={isPlaying}
            onPurchase={handlePurchase}
            isArtist={currentUser?.role === 'artist'}
            favoritedBeatIds={favoritedBeatIds}
            onToggleFavorite={handleToggleFavorite}
            formatCurrency={formatCurrency}
            setView={handleSetView}
            onViewProducer={handleViewProducer}
        />;
      case 'collaborationHub':
        return <CollaborationHub allUsers={allUsers} onViewProfile={handleViewProducer} />;
      case 'earnings':
        return currentUser ? <EarningsDashboard currentUser={currentUser} allBeats={allBeats} formatCurrency={formatCurrency} /> : null;
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
            onToggleFavorite={handleToggleFavorite}
            onViewProducer={handleViewProducer}
            formatCurrency={formatCurrency}
        />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 dark:bg-gray-950 dark:text-gray-200 font-sans flex flex-col">
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