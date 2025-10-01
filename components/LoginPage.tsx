import React, { useState } from 'react';
import { UserRole, View } from '../types';
import { LogoIcon } from './IconComponents';
import { GoogleSignInButton } from './GoogleSignInButton';
import { MOCK_ARTIST } from '../services/mockApi';

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
      isActive
        ? 'bg-gray-700/80 text-white'
        : 'text-gray-400 hover:bg-gray-800/50'
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

    setTimeout(() => {
      const success = onLogin(email, role);
      if (!success) {
        setError('Invalid credentials. Please try again.');
      }
      setLoading(false);
    }, 1000);
  };

  const handleGoogleLogin = () => {
    setLoading(true);
    setTimeout(() => {
      const success = onLogin(MOCK_ARTIST.email, MOCK_ARTIST.role);
      if (!success) {
        setError('Could not sign in with Google. Please try again.');
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 bg-white dark:bg-gray-900/50 dark:backdrop-blur-md dark:border dark:border-white/10 p-8 rounded-2xl shadow-lg">
        <div>
          <div className="flex justify-center">
            <LogoIcon className="w-12 h-12" />
          </div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            Or{' '}
            <a
              onClick={() => setView('signup')}
              className="font-medium text-brand-500 hover:text-brand-600 cursor-pointer"
            >
              create a new account
            </a>
          </p>
        </div>

        <div className="flex bg-gray-200 dark:bg-gray-800/50 rounded-lg overflow-hidden">
          <TabButton
            label="Artist"
            isActive={role === 'artist'}
            onClick={() => setRole('artist')}
          />
          <TabButton
            label="Producer"
            isActive={role === 'producer'}
            onClick={() => setRole('producer')}
          />
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4 rounded-md shadow-sm">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-gray-100 dark:bg-gray-800/50 border border-gray-300 dark:border-gray-700 rounded-lg py-3 px-4 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-500"
                placeholder="Email address"
              />
            </div>
            <div>
              <label htmlFor="password-login" className="sr-only">
                Password
              </label>
              <input
                id="password-login"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-gray-100 dark:bg-gray-800/50 border border-gray-300 dark:border-gray-700 rounded-lg py-3 px-4 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-500"
                placeholder="Password"
              />
            </div>
          </div>

          <div className="flex items-center justify-end">
            <div className="text-sm">
              <a
                onClick={() => setView('forgotPassword')}
                className="font-medium text-brand-500 hover:text-brand-600 cursor-pointer"
              >
                Forgot your password?
              </a>
            </div>
          </div>

          {error && <p className="text-sm text-red-500 text-center">{error}</p>}

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative flex w-full justify-center rounded-md border border-transparent bg-brand-500 py-3 px-4 text-sm font-medium text-white hover:bg-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 focus:ring-offset-gray-50 dark:focus:ring-offset-gray-900 disabled:bg-gray-600"
            >
              {loading && (
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 
                       5.291A7.962 7.962 0 014 12H0c0 
                       3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
              )}
              Sign in
            </button>
          </div>
        </form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300 dark:border-gray-700" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-white dark:bg-gray-900/50 px-2 text-gray-500 dark:text-gray-400">
              Or continue with
            </span>
          </div>
        </div>

        <div>
          <GoogleSignInButton
            onClick={handleGoogleLogin}
            label="Continue with Google"
          />
        </div>
      </div>
    </div>
  );
};
