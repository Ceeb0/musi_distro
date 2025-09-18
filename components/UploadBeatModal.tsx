import React, { useState, useEffect, useCallback } from 'react';
import { Beat } from '../types';
import { GENRES, MOODS } from '../constants';
import { CloseIcon } from './IconComponents';

interface UploadBeatModalProps {
    isOpen: boolean;
    onClose: () => void;
    onUpload: (newBeat: Beat) => void;
}

const FormInput: React.FC<React.InputHTMLAttributes<HTMLInputElement> & { label: string }> = ({ label, id, ...props }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-gray-300 mb-1">{label}</label>
        <input
            id={id}
            {...props}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg py-2 px-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-500 disabled:bg-gray-700 disabled:cursor-not-allowed"
        />
    </div>
);

const FormSelect: React.FC<React.SelectHTMLAttributes<HTMLSelectElement> & { label: string; children: React.ReactNode }> = ({ label, id, children, ...props }) => (
     <div>
        <label htmlFor={id} className="block text-sm font-medium text-gray-300 mb-1">{label}</label>
        <select
            id={id}
            {...props}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
        >
            {children}
        </select>
    </div>
);


export const UploadBeatModal: React.FC<UploadBeatModalProps> = ({ isOpen, onClose, onUpload }) => {
    const [title, setTitle] = useState('');
    const [genre, setGenre] = useState(GENRES[0]);
    const [mood, setMood] = useState(MOODS[0]);
    const [bpm, setBpm] = useState(120);
    const [beatKey, setBeatKey] = useState('');
    const [price, setPrice] = useState(29.99);
    const [isFree, setIsFree] = useState(false);
    const [coverArtFile, setCoverArtFile] = useState<File | null>(null);
    const [audioFile, setAudioFile] = useState<File | null>(null);
    const [coverArtPreview, setCoverArtPreview] = useState<string | null>(null);
    const [isUploading, setIsUploading] = useState(false);

    useEffect(() => {
        if (!coverArtFile) {
            setCoverArtPreview(null);
            return;
        }
        const objectUrl = URL.createObjectURL(coverArtFile);
        setCoverArtPreview(objectUrl);
        return () => URL.revokeObjectURL(objectUrl);
    }, [coverArtFile]);

    useEffect(() => {
        if (isFree) {
            setPrice(0);
        } else {
            setPrice(29.99);
        }
    }, [isFree]);

    const resetForm = useCallback(() => {
        setTitle('');
        setGenre(GENRES[0]);
        setMood(MOODS[0]);
        setBpm(120);
        setBeatKey('');
        setPrice(29.99);
        setIsFree(false);
        setCoverArtFile(null);
        setAudioFile(null);
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!audioFile || !coverArtFile) {
            alert("Please select both a cover art and an audio file.");
            return;
        }
        setIsUploading(true);

        // Simulate upload and watermarking process
        await new Promise(resolve => setTimeout(resolve, 1500));

        const newBeat: Beat = {
            id: `beat_${Date.now()}`,
            title,
            producer: 'Metro Boomin', // Mocked as current user
            coverArt: coverArtPreview || `https://picsum.photos/seed/${title.replace(/\s/g, '')}/300/300`,
            audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3',
            price: Number(price),
            isFree,
            genre,
            mood,
            bpm: Number(bpm),
            key: beatKey.trim() || 'N/A',
            tags: [genre, mood],
        };

        onUpload(newBeat);
        setIsUploading(false);
        resetForm();
    };
    
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[100] p-4" onClick={onClose} role="dialog" aria-modal="true">
            <div className="bg-gray-900 rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col" onClick={e => e.stopPropagation()}>
                <div className="flex justify-between items-center p-6 border-b border-gray-800 flex-shrink-0">
                    <h2 className="text-xl font-bold text-white">Upload a New Beat</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-white" aria-label="Close">
                        <CloseIcon />
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="p-6 space-y-6 overflow-y-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormInput label="Title" id="title" value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g., Sunset Drive" required />
                         <div>
                            <FormInput label="Price ($)" id="price" type="number" value={price} onChange={e => setPrice(Number(e.target.value))} required min="0" step="0.01" disabled={isFree} />
                             <div className="flex items-center mt-2">
                                <input type="checkbox" id="isFree" checked={isFree} onChange={e => setIsFree(e.target.checked)} className="h-4 w-4 rounded border-gray-600 bg-gray-700 text-brand-500 focus:ring-brand-500" />
                                <label htmlFor="isFree" className="ml-2 block text-sm text-gray-300">Make this beat available for free</label>
                            </div>
                        </div>
                        <FormSelect label="Genre" id="genre" value={genre} onChange={e => setGenre(e.target.value)}>
                             {GENRES.map(g => <option key={g} value={g}>{g}</option>)}
                        </FormSelect>
                        <FormSelect label="Mood" id="mood" value={mood} onChange={e => setMood(e.target.value)}>
                             {MOODS.map(m => <option key={m} value={m}>{m}</option>)}
                        </FormSelect>
                        <FormInput label="BPM" id="bpm" type="number" value={bpm} onChange={e => setBpm(Number(e.target.value))} required />
                        <FormInput label="Key" id="key" value={beatKey} onChange={e => setBeatKey(e.target.value)} placeholder="e.g., C#m" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Cover Art</label>
                            <label htmlFor="cover-art-upload" className="cursor-pointer bg-gray-800 border-2 border-dashed border-gray-700 rounded-lg p-4 text-center text-gray-400 hover:border-brand-500 hover:text-white transition-colors">
                                <p>{coverArtFile ? coverArtFile.name : 'Click to select an image'}</p>
                                <p className="text-xs mt-1">PNG, JPG up to 10MB</p>
                            </label>
                            <input id="cover-art-upload" type="file" accept="image/png, image/jpeg" className="hidden" onChange={e => setCoverArtFile(e.target.files?.[0] || null)} />
                        </div>
                        {coverArtPreview && (
                            <div className="flex justify-center">
                                <img src={coverArtPreview} alt="Cover art preview" className="w-32 h-32 rounded-lg object-cover" />
                            </div>
                        )}
                    </div>
                     <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Audio File (Watermarked Preview)</label>
                        <label htmlFor="audio-upload" className="cursor-pointer bg-gray-800 border-2 border-dashed border-gray-700 rounded-lg p-4 text-center text-gray-400 hover:border-brand-500 hover:text-white transition-colors">
                            <p>{audioFile ? audioFile.name : 'Click to select an audio file'}</p>
                            <p className="text-xs mt-1">MP3, WAV up to 20MB</p>
                        </label>
                        <input id="audio-upload" type="file" accept="audio/mpeg, audio/wav" className="hidden" onChange={e => setAudioFile(e.target.files?.[0] || null)} />
                    </div>

                     <div className="pt-4 flex justify-end border-t border-gray-800 mt-2 flex-shrink-0">
                        <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-300 bg-gray-700 rounded-md hover:bg-gray-600 transition-colors mr-3">Cancel</button>
                        <button type="submit" disabled={isUploading || !audioFile || !coverArtFile} className="flex items-center justify-center min-w-[120px] px-4 py-2 text-sm font-medium text-white bg-brand-500 rounded-md hover:bg-brand-600 transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed">
                            {isUploading ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    <span>Processing...</span>
                                </>
                            ) : 'Upload Beat'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};