import React, { useState, useMemo } from 'react';
import { User } from '../types';
import { GENRES } from '../constants';
import { SearchIcon } from './IconComponents';
import { UserCard } from './UserCard';

interface CollaborationHubProps {
    allUsers: User[];
    onViewProfile: (userName: string) => void;
}

const FilterButton: React.FC<{ label: string; isActive: boolean; onClick: () => void }> = ({ label, isActive, onClick }) => (
    <button
        onClick={onClick}
        className={`px-3 py-1.5 text-sm rounded-full border transition-colors ${isActive ? 'bg-brand-500 border-brand-500 text-white' : 'bg-gray-700/50 border-gray-600 text-gray-300 hover:bg-gray-600/50'}`}
    >
        {label}
    </button>
);

export const CollaborationHub: React.FC<CollaborationHubProps> = ({ allUsers, onViewProfile }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeRole, setActiveRole] = useState<'any' | 'producer' | 'artist'>('any');
    const [activeGenres, setActiveGenres] = useState<string[]>([]);
    const [lookingFor, setLookingFor] = useState<string>('any');

    const LOOKING_FOR_OPTIONS = ['any', 'Co-producer', 'Singer', 'Songwriter', 'Beatmaker'];

    const filteredUsers = useMemo(() => {
        return allUsers.filter(user => {
            const searchTermMatch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (user.bio && user.bio.toLowerCase().includes(searchTerm.toLowerCase()));
            
            const roleMatch = activeRole === 'any' || user.role === activeRole;

            const genreMatch = activeGenres.length === 0 || 
                (user.genres && activeGenres.every(g => user.genres?.includes(g)));

            const lookingForMatch = lookingFor === 'any' ||
                (user.lookingFor && user.lookingFor.includes(lookingFor as any));

            return searchTermMatch && roleMatch && genreMatch && lookingForMatch;
        });
    }, [allUsers, searchTerm, activeRole, activeGenres, lookingFor]);

    const toggleGenre = (genre: string) => {
        setActiveGenres(prev =>
            prev.includes(genre)
                ? prev.filter(g => g !== genre)
                : [...prev, genre]
        );
    };

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-extrabold text-adaptive-white sm:text-5xl">
                    Collaboration Hub
                </h1>
                <p className="mt-4 text-xl text-gray-400 max-w-2xl mx-auto">
                    Find your next creative partner. Search for artists and producers to work with on your next project.
                </p>
            </div>

            {/* Filters */}
            <div className="bg-gray-900/50 backdrop-blur-md border border-white/10 rounded-xl p-6 mb-8 space-y-6">
                 <div className="relative">
                    <input
                        type="text"
                        placeholder="Search by name, bio..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-gray-800/50 border border-gray-700 rounded-lg py-3 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-500"
                    />
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <SearchIcon className="text-gray-500" />
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">I am a...</label>
                        <select onChange={(e) => setActiveRole(e.target.value as any)} value={activeRole} className="w-full bg-gray-800/50 border border-gray-700 rounded-lg py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-brand-500">
                            <option value="any">Any Role</option>
                            <option value="producer">Producer</option>
                            <option value="artist">Artist</option>
                        </select>
                    </div>
                     <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Looking for a...</label>
                        <select onChange={(e) => setLookingFor(e.target.value)} value={lookingFor} className="w-full bg-gray-800/50 border border-gray-700 rounded-lg py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-brand-500">
                            {LOOKING_FOR_OPTIONS.map(opt => <option key={opt} value={opt}>{opt === 'any' ? 'Anyone' : opt}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">With Genre...</label>
                        <div className="flex flex-wrap gap-2">
                            {GENRES.slice(0, 4).map(genre => (
                                <FilterButton key={genre} label={genre} isActive={activeGenres.includes(genre)} onClick={() => toggleGenre(genre)} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Results */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredUsers.map(user => (
                    <UserCard key={user.id} user={user} onViewProfile={onViewProfile} />
                ))}
            </div>
             {filteredUsers.length === 0 && (
                <div className="text-center py-16 text-gray-500 col-span-full">
                    <h3 className="text-xl font-semibold">No users found</h3>
                    <p>Try adjusting your search filters to find more creators.</p>
                </div>
            )}
        </div>
    );
};
