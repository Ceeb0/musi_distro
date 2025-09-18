import React, { useState } from 'react';
import { User, UserRole, View } from '../types';
import { COUNTRIES } from '../constants';
import { LogoIcon } from './IconComponents';

interface SignUpPageProps {
    onSignUp: (newUser: User) => void;
    setView: (view: View) => void;
}

const TabButton: React.FC<{
    label: string;
    isActive: boolean;
    onClick: () => void;
}> = ({ label, isActive, onClick }) => (
    <button
        type="button"
        onClick={onClick}
        className={`w-1/2 py-3 text-sm font-semibold transition-colors ${
            isActive ? 'bg-gray-700 text-white' : 'text-gray-400 hover:bg-gray-800'
        }`}
    >
        {label}
    </button>
);

const FormInput: React.FC<React.InputHTMLAttributes<HTMLInputElement> & { label: string }> = ({ label, id, ...props }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-gray-300 mb-1">{label}</label>
        <input
            id={id}
            {...props}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg py-2 px-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-500"
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

const FormCheckbox: React.FC<React.InputHTMLAttributes<HTMLInputElement> & { label: string | React.ReactNode }> = ({ label, id, ...props }) => (
    <div className="flex items-start">
        <div className="flex h-5 items-center">
            <input
                id={id}
                type="checkbox"
                {...props}
                className="h-4 w-4 rounded border-gray-600 bg-gray-700 text-brand-500 focus:ring-brand-500"
            />
        </div>
        <div className="ml-3 text-sm">
            <label htmlFor={id} className="font-medium text-gray-300">{label}</label>
        </div>
    </div>
);


export const SignUpPage: React.FC<SignUpPageProps> = ({ onSignUp, setView }) => {
    const [role, setRole] = useState<UserRole>('artist');
    // Common fields
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [country, setCountry] = useState(COUNTRIES[0]);
    // Artist specific
    const [artistName, setArtistName] = useState('');
    // Producer specific
    const [username, setUsername] = useState('');
    const [ownsRights, setOwnsRights] = useState(false);
    const [hasSamplePermission, setHasSamplePermission] = useState(false);
    // Agreements
    const [agreedToTerms, setAgreedToTerms] = useState(false);

    const [loading, setLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!canSubmit) return;
        setLoading(true);

        const commonData = {
            id: `user_${Date.now()}`,
            name: fullName,
            email,
            country,
            avatarUrl: `https://picsum.photos/seed/${email}/100/100`, // Generate a random avatar
            purchasedBeatIds: [],
            favoritedBeatIds: [],
            ratings: {},
        };

        let newUser: User;

        if (role === 'artist') {
            newUser = {
                ...commonData,
                name: artistName || fullName, // Use stage name if provided
                role: 'artist',
            };
        } else { // Producer
            newUser = {
                ...commonData,
                name: username || fullName, // Use username if provided
                role: 'producer',
            };
        }

        // Simulate API call
        setTimeout(() => {
            onSignUp(newUser);
            setLoading(false);
        }, 1000);
    };

    const isArtistFormValid = fullName !== '' && artistName !== '' && email !== '' && password !== '' && agreedToTerms;
    const isProducerFormValid = fullName !== '' && username !== '' && email !== '' && password !== '' && ownsRights && hasSamplePermission && agreedToTerms;
    const canSubmit = role === 'artist' ? isArtistFormValid : isProducerFormValid;

    return (
        <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-lg space-y-8 bg-gray-900 p-8 rounded-2xl shadow-lg">
                <div>
                    <div className="flex justify-center">
                       <LogoIcon className="w-12 h-12" />
                    </div>
                    <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-white">
                        Create your account
                    </h2>
                     <p className="mt-2 text-center text-sm text-gray-400">
                        Already a member?{' '}
                        <a onClick={() => setView('login')} className="font-medium text-brand-500 hover:text-brand-600 cursor-pointer">
                           Sign in
                        </a>
                    </p>
                </div>
                 <div className="flex bg-gray-800 rounded-lg overflow-hidden">
                    <TabButton label="I'm an Artist" isActive={role === 'artist'} onClick={() => setRole('artist')} />
                    <TabButton label="I'm a Producer" isActive={role === 'producer'} onClick={() => setRole('producer')} />
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    {role === 'artist' ? (
                        <div className="space-y-4">
                            <FormInput label="Full Name" id="fullName" value={fullName} onChange={e => setFullName(e.target.value)} required />
                            <FormInput label="Artist/Stage Name" id="artistName" value={artistName} onChange={e => setArtistName(e.target.value)} placeholder="e.g., Drake" required />
                            <FormInput label="Email Address" id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
                            <FormInput label="Password" id="password-signup" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
                            <FormSelect label="Country of Residence" id="country" value={country} onChange={e => setCountry(e.target.value)}>
                                {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
                            </FormSelect>
                            <FormCheckbox label="I agree to the Distribution Agreement & Terms of Service." id="tos-artist" checked={agreedToTerms} onChange={e => setAgreedToTerms(e.target.checked)} required />
                        </div>
                    ) : (
                         <div className="space-y-4">
                            <FormInput label="Full Name" id="fullName" value={fullName} onChange={e => setFullName(e.target.value)} required />
                            <FormInput label="Username" id="username" value={username} onChange={e => setUsername(e.target.value)} placeholder="e.g., MetroBoomin" required />
                            <FormInput label="Email Address" id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
                            <FormInput label="Password" id="password-signup" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
                            <FormSelect label="Country of Residence" id="country" value={country} onChange={e => setCountry(e.target.value)}>
                                {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
                            </FormSelect>
                            <div className="space-y-3 pt-2">
                                <FormCheckbox label="I own the rights to the music I upload." id="rights-owner" checked={ownsRights} onChange={e => setOwnsRights(e.target.checked)} required />
                                <FormCheckbox label="I have permission for any samples used in my music." id="sample-permission" checked={hasSamplePermission} onChange={e => setHasSamplePermission(e.target.checked)} required />
                                <FormCheckbox label="I agree to the Terms of Service & Distribution Rights." id="tos-producer" checked={agreedToTerms} onChange={e => setAgreedToTerms(e.target.checked)} required />
                            </div>
                        </div>
                    )}
                    <div>
                        <button
                            type="submit"
                            disabled={loading || !canSubmit}
                            className="group relative flex w-full justify-center rounded-md border border-transparent bg-brand-500 py-3 px-4 text-sm font-medium text-white hover:bg-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:bg-gray-600 disabled:cursor-not-allowed"
                        >
                            {loading && (
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            )}
                            Create Account
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};