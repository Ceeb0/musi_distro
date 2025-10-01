import React, { useState, useEffect } from 'react';
import { View } from '../types';
import { LogoIcon } from './IconComponents';
import { SimpleCaptcha } from './SimpleCaptcha';

const generateCaptchaText = (length = 6) => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // Avoided confusing chars like I, 1, O, 0
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
};


interface ForgotPasswordPageProps {
    setView: (view: View) => void;
}

export const ForgotPasswordPage: React.FC<ForgotPasswordPageProps> = ({ setView }) => {
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [captchaText, setCaptchaText] = useState('');
    const [captchaInput, setCaptchaInput] = useState('');

    const refreshCaptcha = () => {
        setCaptchaText(generateCaptchaText());
        setCaptchaInput('');
    };

    useEffect(() => {
        refreshCaptcha();
    }, []);

    const isCaptchaVerified = captchaInput.toLowerCase() === captchaText.toLowerCase() && captchaText !== '';

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            setSubmitted(true);
        }, 1500);
    };

    return (
        <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8 bg-white dark:bg-gray-900/50 dark:backdrop-blur-md dark:border dark:border-white/10 p-8 rounded-2xl shadow-lg">
                <div>
                    <div className="flex justify-center">
                       <LogoIcon className="w-12 h-12" />
                    </div>
                    <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Forgot Password
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
                        Enter your email to receive a recovery link.
                    </p>
                </div>
                
                {submitted ? (
                    <div className="text-center p-4 bg-green-900/50 border border-green-700 rounded-lg">
                        <p className="text-green-300">If an account with that email exists, a recovery link has been sent.</p>
                        <a onClick={() => setView('login')} className="font-medium text-brand-500 hover:text-brand-600 cursor-pointer mt-4 block">
                           &larr; Back to Login
                        </a>
                    </div>
                ) : (
                    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                        <div className="space-y-4 rounded-md shadow-sm">
                            <div>
                                <label htmlFor="email-recovery" className="sr-only">Email address</label>
                                <input
                                    id="email-recovery"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-gray-100 dark:bg-gray-800/50 border border-gray-300 dark:border-gray-700 rounded-lg py-3 px-4 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-500"
                                    placeholder="Your email address"
                                />
                            </div>
                            
                            <SimpleCaptcha 
                                text={captchaText}
                                onRefresh={refreshCaptcha}
                                value={captchaInput}
                                onChange={(e) => setCaptchaInput(e.target.value)}
                            />

                            <p className="text-xs text-gray-500 text-center">For your safety, we use captcha to prevent automated attacks.</p>
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={loading || !email || !isCaptchaVerified}
                                className="group relative flex w-full justify-center rounded-md border border-transparent bg-brand-500 py-3 px-4 text-sm font-medium text-white hover:bg-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 focus:ring-offset-gray-50 dark:focus:ring-offset-gray-900 disabled:bg-gray-600 disabled:cursor-not-allowed"
                            >
                                {loading ? 'Sending...' : 'Send Recovery Link'}
                            </button>
                        </div>
                         <div className="text-center">
                            <a onClick={() => setView('login')} className="font-medium text-brand-500 hover:text-brand-600 cursor-pointer text-sm">
                                Back to Login
                            </a>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};
