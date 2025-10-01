import React from 'react';
import { User } from '../types';
import { TwitterIcon, InstagramIcon, LinkedInIcon } from './IconComponents';

interface UserCardProps {
    user: User;
    onViewProfile: (userName: string) => void;
}

const SocialLink: React.FC<{ href?: string; children: React.ReactNode }> = ({ href, children }) => {
    if (!href) return null;
    return (
        <a 
          href={href} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-gray-500 hover:text-brand-500 transition-colors"
          onClick={(e) => e.stopPropagation()} // Prevents card's onViewProfile from firing
        >
            {children}
        </a>
    );
};

export const UserCard: React.FC<UserCardProps> = ({ user, onViewProfile }) => {
    const availabilityColor = user.availability === 'Open to Collab' ? 'bg-green-500' : 'bg-gray-500';

    return (
        <div className="bg-gray-900/50 backdrop-blur-md border border-white/10 shadow-lg rounded-xl p-5 text-center flex flex-col">
            <img src={user.avatarUrl} alt={user.name} className="w-24 h-24 rounded-full mx-auto mb-4 border-2 border-gray-700" />
            <h3 className="text-lg font-bold text-white truncate">{user.name}</h3>
            <p className="text-sm text-brand-400 capitalize">{user.role}</p>

            <div className="flex items-center justify-center gap-2 mt-3">
                <div className={`w-2 h-2 rounded-full ${availabilityColor}`}></div>
                <span className="text-xs text-gray-400">{user.availability || 'Not Specified'}</span>
            </div>

            <div className="flex items-center justify-center space-x-3 my-2">
                <SocialLink href={user.socialLinks?.twitter}><TwitterIcon className="w-4 h-4" /></SocialLink>
                <SocialLink href={user.socialLinks?.instagram}><InstagramIcon className="w-4 h-4" /></SocialLink>
                <SocialLink href={user.socialLinks?.linkedin}><LinkedInIcon className="w-4 h-4" /></SocialLink>
            </div>
            
            <div className="flex-grow min-h-[4rem] flex items-center justify-center">
                {user.genres && user.genres.length > 0 ? (
                     <div className="flex flex-wrap justify-center gap-1.5">
                        {user.genres.slice(0, 3).map(genre => (
                            <span key={genre} className="px-2 py-0.5 text-xs bg-gray-700/50 text-gray-300 rounded-full">{genre}</span>
                        ))}
                    </div>
                ) : (
                     <p className="text-xs text-gray-500">No genres specified</p>
                )}
            </div>

            <button
                onClick={() => onViewProfile(user.name)}
                className="w-full mt-auto py-2 px-4 text-sm font-semibold text-white bg-brand-500 rounded-lg transition-colors hover:bg-brand-600"
            >
                View Profile
            </button>
        </div>
    );
};