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
        className={`px-3 py-1.5 text-sm rounded-full border transition-colors ${isActive ? 'bg-brand-500 border-brand-500 text-white' : 'bg-gray-700/50 border-gray-600 text-gray-300 hover:bg-gray-600/50'}`}
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
            <div className="bg-gray-900/50 backdrop-blur-md border border-white/10 shadow-lg rounded-xl p-6">
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
                        <span className="text-sm text-gray-400">BPM</span>
                        <span>{bpm[1]}</span>
                    </div>
                    <div className="space-y-3 pt-2">
                        <div>
                             <label className="text-xs text-gray-400">Min</label>
                            <input
                                type="range"
                                min={40}
                                max={220}
                                step={1}
                                value={bpm[0]}
                                onChange={(e) => {
                                    const newMin = Number(e.target.value);
                                    if (newMin < bpm[1]) {
                                        setBpm([newMin, bpm[1]]);
                                    }
                                }}
                                className="w-full accent-brand-500"
                                aria-label="Minimum BPM"
                            />
                        </div>
                        <div>
                             <label className="text-xs text-gray-400">Max</label>
                            <input
                                type="range"
                                min={40}
                                max={220}
                                step={1}
                                value={bpm[1]}
                                onChange={(e) => {
                                    const newMax = Number(e.target.value);
                                    if (newMax > bpm[0]) {
                                        setBpm([bpm[0], newMax]);
                                    }
                                }}
                                className="w-full accent-brand-500"
                                aria-label="Maximum BPM"
                            />
                        </div>
                    </div>
                </FilterSection>
            </div>
        </aside>
    );
};