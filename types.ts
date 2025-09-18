export type UserRole = 'producer' | 'artist';

export interface User {
  id: string;
  name: string;
  email: string;
  phoneNumber?: string;
  avatarUrl?: string;
  country?: string;

  // ✅ Add missing fields
  role: "artist" | "producer";  // only two roles in your app
  purchasedBeatIds?: string[];  // list of beats purchased
  favoritedBeatIds?: string[];  // list of beats favorited
  ratings?: { [beatId: string]: number }; // beat ratings by this user
}

export interface Plan {
  id?: string; // optional, in case you don’t always use it
  name: string;
  price: number;
  priceDescription: string;  // ✅ add this
  features: string[];
  isPopular: boolean;        // ✅ add this
}



export interface Beat {
  id: string;
  title: string;
  producer: string;
  coverArt: string;
  audioUrl: string; // watermarked preview
  price: number;
  genre: string;
  mood: string;
  bpm: number;
  key: string;
  tags: string[];
  isFree?: boolean;
  rating?: number;
  ratingsCount?: number;
}


// FIX: Added 'login' and 'signup' to the View type to allow for authentication views.
export type View = 'marketplace' | 'producerDashboard' | 'artistDashboard' | 'subscription' | 'profileSettings' | 'login' | 'signup';

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
    destination: string; // e.g., p***@email.com or **** 1234
}
export interface Currency {
    symbol: string;
    code: string;
    rate: number; // Conversion rate from USD
}
