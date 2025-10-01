export type UserRole = 'producer' | 'artist';

export interface User {
  id: string;
  name: string;
  email: string;
  phoneNumber?: string;
  avatarUrl?: string;
  country?: string;
  bio?: string;
  socialLinks?: {
    twitter?: string;
    instagram?: string;
    spotify?: string;
    youtube?: string;
    linkedin?: string;
  };
  role: "artist" | "producer";
  purchasedBeatIds?: string[];
  favoritedBeatIds?: string[];
  ratings?: { [beatId: string]: number };
  // Collaboration fields
  genres?: string[];
  availability?: 'Open to Collab' | 'Not Available';
  lookingFor?: ('Co-producer' | 'Singer' | 'Songwriter' | 'Beatmaker')[];
  // Contracts field
  contracts?: Contract[];
}

export interface Plan {
  id?: string;
  name: string;
  price: number;
  priceDescription: string;
  features: string[];
  isPopular: boolean;
}

export interface Contributor {
  userId: string;
  name: string;
  role: 'Co-producer' | 'Songwriter' | 'Vocalist' | 'Instrumentalist';
  split: number;
}

export interface Beat {
  id: string;
  title: string;
  producer: string;
  coverArt: string;
  audioUrl: string; // watermarked preview
  price: number;
  exclusivePrice?: number;
  genre: string;
  mood: string;
  bpm: number;
  key: string;
  tags: string[];
  isFree?: boolean;
  rating?: number;
  ratingsCount?: number;
  contributors?: Contributor[];
}

export type View = 'marketplace' | 'producerDashboard' | 'artistDashboard' | 'subscription' | 'profileSettings' | 'login' | 'signup' | 'producerProfile' | 'forgotPassword' | 'collaborationHub' | 'earnings';

export interface SalesData {
  month: string;
  sales: number;
}

export interface Withdrawal {
    id: string;
    amount: number;
    method: 'PayPal' | 'Bank Transfer';
    status: 'Completed' | 'Processing' | 'Failed';
    date: string;
    destination: string;
}
export interface Currency {
    symbol: string;
    code: string;
    rate: number;
}

export interface Contract {
  id: string;
  beatId: string;
  beatTitle: string;
  artistId: string;
  artistName: string;
  producerId: string;
  producerName: string;
  licenseType: 'Non-Exclusive' | 'Exclusive';
  price: number;
  signedDate: string;
  signature: string;
  contractText: string;
}