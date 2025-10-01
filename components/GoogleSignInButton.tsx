import React from 'react';
import { GoogleIcon } from './IconComponents';

interface GoogleSignInButtonProps {
    onClick: () => void;
    label: string;
}

export const GoogleSignInButton: React.FC<GoogleSignInButtonProps> = ({ onClick, label }) => (
    <button
        type="button"
        onClick={onClick}
        className="w-full flex items-center justify-center py-3 px-4 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-800 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 focus:ring-offset-gray-50 dark:focus:ring-offset-gray-900 transition-colors"
    >
        <GoogleIcon className="w-5 h-5 mr-3" />
        {label}
    </button>
);
