
import React from 'react';
import { GENRES, MOODS } from '../constants';

interface FilterSidebarProps {
    activeGenres: string[];
    setActiveGenres: React.Dispatch<React.SetStateAction<string[]>>;
    activeMoods: string[];
    setActiveMoods: React.Dispatch<React.SetStateAction<string[]>>;
    bpm: number[];
    setBpm: React.Dispatch<React.SetStateAction<number[]>>;
}

const FilterSection: React.FC<{ title: string, children: React.ReactNode }> = ({ title, children }) => (
    <div className="mb-6">
        <h3 className="text-lg font-semibold text-white mb-3">{title}</h3>
        {children}
    </div>
);

const TagButton: React.FC<{ label: string, isActive: boolean, onClick: () => void }> = ({ label, isActive, onClick }) => (
    <button
        onClick={onClick}
        className={`px-3 py-1.5 text-sm rounded-full border transition-colors ${isActive ? 'bg-brand-500 border-brand-500 text-white' : 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600'}`}
    >
        {label}
    </button>
);

export const FilterSidebar: React.FC<FilterSidebarProps> = ({ activeGenres, setActiveGenres, activeMoods, setActiveMoods, bpm, setBpm }) => {
    
    const toggleTag = (tag: string, activeTags: string[], setActiveTags: React.Dispatch<React.SetStateAction<string[]>>) => {
        const currentIndex = activeTags.indexOf(tag);
        const newTags = [...activeTags];
        if (currentIndex === -1) {
            newTags.push(tag);
        } else {
            newTags.splice(currentIndex, 1);
        }
        setActiveTags(newTags);
    };

    return (
        <aside className="w-full md:w-64 lg:w-72 flex-shrink-0">
            <div className="bg-gray-900 p-6 rounded-lg">
                <FilterSection title="Genres">
                    <div className="flex flex-wrap gap-2">
                        {GENRES.map(genre => (
                            <TagButton key={genre} label={genre} isActive={activeGenres.includes(genre)} onClick={() => toggleTag(genre, activeGenres, setActiveGenres)} />
                        ))}
                    </div>
                </FilterSection>

                <FilterSection title="Moods">
                    <div className="flex flex-wrap gap-2">
                        {MOODS.map(mood => (
                            <TagButton key={mood} label={mood} isActive={activeMoods.includes(mood)} onClick={() => toggleTag(mood, activeMoods, setActiveMoods)} />
                        ))}
                    </div>
                </FilterSection>

                <FilterSection title="BPM">
                    <div className="flex items-center justify-between text-white mb-2">
                        <span>{bpm[0]}</span>
                        <span>BPM</span>
                        <span>{bpm[1]}</span>
                    </div>

                    {/* Min BPM slider */}
                    <input
                        type="range"
                        min={40}
                        max={220}
                        step={1}
                        value={bpm[0]}
                        onChange={(e) => setBpm([Number(e.target.value), bpm[1]])}
                        className="w-full accent-orange-500 mb-2"
                        aria-label="Minimum BPM"
                    />

                    
                </FilterSection>


            </div>
        </aside>
    );
};
