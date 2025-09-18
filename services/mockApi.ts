import { Beat, User, SalesData, Withdrawal } from '../types';
import { Plan } from "../types";

export const MOCK_PLANS: Plan[] = [
  { id: "basic", name: "Basic", price: 10, priceDescription: "mo", features: ["Feature 1"], isPopular: false },
  { id: "pro", name: "Pro", price: 25, priceDescription: "mo", features: ["Feature 1", "Feature 2"], isPopular: true },
];



export const MOCK_PRODUCER: User = {
  id: 'prod_1',
  name: 'Metro Boomin',
  email: 'metro@boomin.com',
  phoneNumber: '555-123-4567',
  avatarUrl: 'https://picsum.photos/seed/producer/100/100',
  role: 'producer',
  country: 'United States',
};

export const MOCK_ARTIST: User = {
  id: 'art_1',
  name: 'Drake',
  email: 'drake@ovo.com',
  avatarUrl: 'https://picsum.photos/seed/artist/100/100',
  role: 'artist',
  country: 'Canada',
  purchasedBeatIds: ['beat_1', 'beat_3', 'beat_7'],
  favoritedBeatIds: ['beat_2', 'beat_4', 'beat_8'],
  ratings: { 'beat_1': 5, 'beat_3': 4 },
};

const beats: Beat[] = [
  { id: 'beat_1', title: 'Sunset Drive', producer: '808Mafia', coverArt: 'https://picsum.photos/seed/beat1/300/300', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', price: 29.99, genre: 'Trap', mood: 'Energetic', bpm: 145, key: 'C#m', tags: ['synth', '808'], rating: 4.8, ratingsCount: 124 },
  { id: 'beat_2', title: 'Midnight City', producer: 'Southside', coverArt: 'https://picsum.photos/seed/beat2/300/300', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3', price: 39.99, genre: 'Hip-Hop', mood: 'Dark', bpm: 130, key: 'Gm', tags: ['piano', 'heavy bass'], rating: 4.5, ratingsCount: 98 },
  { id: 'beat_3', title: 'Ocean Waves', producer: 'TM88', coverArt: 'https://picsum.photos/seed/beat3/300/300', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3', price: 29.99, genre: 'R&B', mood: 'Chill', bpm: 90, key: 'Am', tags: ['guitar', 'smooth'], rating: 4.2, ratingsCount: 55 },
  { id: 'beat_4', title: 'Starlight', producer: 'Wheezy', coverArt: 'https://picsum.photos/seed/beat4/300/300', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3', price: 49.99, genre: 'Pop', mood: 'Happy', bpm: 120, key: 'Fmaj', tags: ['upbeat', 'catchy'], rating: 4.9, ratingsCount: 210 },
  { id: 'beat_5', title: 'Rainy Days', producer: 'Zaytoven', coverArt: 'https://picsum.photos/seed/beat5/300/300', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3', price: 0, genre: 'Lo-Fi', mood: 'Sad', bpm: 85, key: 'Dm', tags: ['vinyl', 'sad piano'], isFree: true, rating: 4.6, ratingsCount: 150 },
  { id: 'beat_6', title: 'Underground King', producer: 'Tay Keith', coverArt: 'https://picsum.photos/seed/beat6/300/300', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3', price: 39.99, genre: 'Drill', mood: 'Intense', bpm: 142, key: 'G#m', tags: ['uk drill', 'sliding 808'], rating: 4.7, ratingsCount: 180 },
  { id: 'beat_7', title: 'Summer Vibe', producer: 'JAE5', coverArt: 'https://picsum.photos/seed/beat7/300/300', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3', price: 29.99, genre: 'Afrobeat', mood: 'Happy', bpm: 105, key: 'Amaj', tags: ['dancehall', 'sunny'], rating: 4.8, ratingsCount: 195 },
  { id: 'beat_8', title: 'Future Bass', producer: 'Flume', coverArt: 'https://picsum.photos/seed/beat8/300/300', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3', price: 49.99, genre: 'EDM', mood: 'Epic', bpm: 150, key: 'D#m', tags: ['future bass', 'vocal chops'], rating: 4.9, ratingsCount: 250 },
];

export const fetchBeats = (): Promise<Beat[]> => {
    return new Promise(resolve => setTimeout(() => resolve(beats), 500));
}

// Mock data for producer's uploads
const producerUploads = beats.slice(0, 5); // Metro Boomin "uploaded" the first 5 beats

export const fetchProducerUploads = (): Promise<Beat[]> => {
    return new Promise(resolve => setTimeout(() => resolve(producerUploads), 500));
}

// Mock data for sales analytics
const salesData: SalesData[] = [
    { month: 'Jan', sales: 4000 },
    { month: 'Feb', sales: 3000 },
    { month: 'Mar', sales: 5000 },
    { month: 'Apr', sales: 4500 },
    { month: 'May', sales: 6000 },
    { month: 'Jun', sales: 5500 },
    { month: 'Jul', sales: 7000 },
];

export const fetchSalesData = (): Promise<SalesData[]> => {
    return new Promise(resolve => setTimeout(() => resolve(salesData), 500));
}

const MOCK_WITHDRAWALS: Withdrawal[] = [
    { id: 'wd_1', amount: 5000, method: 'PayPal', status: 'Completed', date: '2023-06-15', destination: 'm***@boomin.com' },
    { id: 'wd_2', amount: 12000, method: 'Bank Transfer', status: 'Completed', date: '2023-05-20', destination: '**** 5678' },
    { id: 'wd_3', amount: 3500, method: 'PayPal', status: 'Processing', date: '2023-07-01', destination: 'm***@boomin.com' },
];

export const fetchWithdrawalHistory = (): Promise<Withdrawal[]> => {
    return new Promise(resolve => setTimeout(() => resolve(MOCK_WITHDRAWALS), 500));
};