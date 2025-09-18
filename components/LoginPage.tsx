import React, { useState } from 'react';
import { UserRole, View } from '../types';
import { LogoIcon } from './IconComponents';

interface LoginPageProps {
    onLogin: (email: string, role: UserRole) => boolean;
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


export const LoginPage: React.FC<LoginPageProps> = ({ onLogin, setView }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState<UserRole>('artist');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        // Simulate API call
        setTimeout(() => {
            const success = onLogin(email, role);
            if (!success) {
                setError('Invalid credentials. Please try again.');
            }
            setLoading(false);
        }, 1000);
    };

    return (
        <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8 bg-gray-900 p-8 rounded-2xl shadow-lg">
                <div>
                    <div className="flex justify-center">
                       <LogoIcon className="w-12 h-12" />
                    </div>
                    <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-white">
                        Sign in to your account
                    </h2>
                     <p className="mt-2 text-center text-sm text-gray-400">
                        Or{' '}
                        <a onClick={() => setView('signup')} className="font-medium text-brand-500 hover:text-brand-600 cursor-pointer">
                           create a new account
                        </a>
                    </p>
                </div>
                 <div className="flex bg-gray-800 rounded-lg overflow-hidden">
                    <TabButton label="Artist" isActive={role === 'artist'} onClick={() => setRole('artist')} />
                    <TabButton label="Producer" isActive={role === 'producer'} onClick={() => setRole('producer')} />
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-4 rounded-md shadow-sm">
                        <div>
                            <label htmlFor="email-address" className="sr-only">Email address</label>
                            <input
                                id="email-address"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-gray-800 border border-gray-700 rounded-lg py-3 px-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-500"
                                placeholder="Email address"
                            />
                        </div>
                        <div>
                            <label htmlFor="password-login" className="sr-only">Password</label>
                            <input
                                id="password-login"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-gray-800 border border-gray-700 rounded-lg py-3 px-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-500"
                                placeholder="Password"
                            />
                        </div>
                    </div>

                    {error && <p className="text-sm text-red-500 text-center">{error}</p>}

                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="group relative flex w-full justify-center rounded-md border border-transparent bg-brand-500 py-3 px-4 text-sm font-medium text-white hover:bg-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:bg-gray-600"
                        >
                            {loading && (
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            )}
                            Sign in
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};