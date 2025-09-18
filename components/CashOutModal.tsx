import React, { useState, useEffect } from 'react';
import { CloseIcon, CreditCardIcon, BankIcon, PaypalIcon, CheckCircleIcon } from './IconComponents';
import { Withdrawal, Currency } from '../types';

interface CashOutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (withdrawal: Omit<Withdrawal, "status" | "date" | "id">) => void;
  currentBalance: number;
  formatCurrency: (priceInUsd: number) => string;
  currency: Currency;
}


const PaymentMethodButton: React.FC<{
    label: string;
    icon: React.ReactNode;
    isActive: boolean;
    onClick: () => void;
}> = ({ label, icon, isActive, onClick }) => (
    <button
        type="button"
        onClick={onClick}
        className={`flex-1 flex items-center justify-center space-x-2 py-3 text-sm font-medium border-b-2 transition-all duration-200 ${
            isActive
                ? 'border-brand-500 text-white'
                : 'border-transparent text-gray-400 hover:text-white hover:border-gray-600'
        }`}
    >
        {icon}
        <span>{label}</span>
    </button>
);

export const CashOutModal: React.FC<CashOutModalProps> = ({ isOpen, onClose, onConfirm, currentBalance, formatCurrency, currency }) => {
    const [amount, setAmount] = useState('');
    const [method, setMethod] = useState<'PayPal' | 'Bank Transfer'>('PayPal');
    const [destination, setDestination] = useState('');
    const [error, setError] = useState('');
    const [view, setView] = useState<'form' | 'success'>('form');

    const convertedBalance = currentBalance * currency.rate;

    useEffect(() => {
        if (isOpen) {
            setAmount('');
            setDestination('');
            setError('');
            setView('form');
        }
    }, [isOpen]);

    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (/^\d*\.?\d{0,2}$/.test(value)) {
            setAmount(value);
            if (parseFloat(value) > convertedBalance) {
                setError('Amount cannot exceed your current balance.');
            } else {
                setError('');
            }
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const numericAmount = parseFloat(amount);
        if (!numericAmount || numericAmount <= 0) {
            setError('Please enter a valid amount.');
            return;
        }
        if (numericAmount > convertedBalance) {
            setError('Amount cannot exceed your current balance.');
            return;
        }
        if (!destination.trim()) {
            setError(`Please enter your ${method === 'PayPal' ? 'PayPal email' : 'account number'}.`);
            return;
        }
        setError('');
        // Convert amount back to USD for backend/state management
        const amountInUSD = numericAmount / currency.rate;
        onConfirm({ amount: amountInUSD, method, destination });
        setView('success');
    };

    const handleClose = () => {
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[100] p-4" onClick={handleClose} role="dialog" aria-modal="true">
            <div className="bg-gray-900 rounded-lg shadow-xl w-full max-w-md" onClick={e => e.stopPropagation()}>
                <div className="flex justify-between items-center p-5 border-b border-gray-800">
                    <h2 className="text-lg font-bold text-white">
                        {view === 'form' ? 'Request Withdrawal' : 'Request Submitted'}
                    </h2>
                    <button onClick={handleClose} className="text-gray-400 hover:text-white" aria-label="Close"><CloseIcon /></button>
                </div>

                {view === 'success' ? (
                     <div className="p-6 text-center">
                        <CheckCircleIcon className="w-16 h-16 mx-auto mb-4 text-green-500" />
                        <h2 className="text-2xl font-bold text-white">Withdrawal Requested</h2>
                        <p className="text-gray-400 mt-2 mb-8">
                            Your request for <strong>{currency.symbol}{parseFloat(amount).toFixed(2)}</strong> has been submitted. It will be processed within 3-5 business days.
                        </p>
                        <button
                            onClick={handleClose}
                            className="w-full px-4 py-3 text-sm font-medium text-white bg-brand-500 rounded-md hover:bg-brand-600 transition-colors"
                        >
                            Close
                        </button>
                    </div>
                ) : (
                    <div className="p-6">
                        <div className="bg-gray-800 p-4 rounded-lg text-center mb-6">
                            <p className="text-sm text-gray-400">Withdrawable Balance</p>
                            <p className="text-3xl font-bold text-white">{formatCurrency(currentBalance)}</p>
                        </div>
                        
                        <div className="border-b border-gray-800 mb-6">
                            <div className="flex">
                                <PaymentMethodButton label="PayPal" icon={<PaypalIcon />} isActive={method === 'PayPal'} onClick={() => { setMethod('PayPal'); setDestination(''); }} />
                                <PaymentMethodButton label="Bank Transfer" icon={<BankIcon />} isActive={method === 'Bank Transfer'} onClick={() => { setMethod('Bank Transfer'); setDestination(''); }} />
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="amount" className="block text-sm font-medium text-gray-300 mb-1">Amount ({currency.code})</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">{currency.symbol}</div>
                                    <input 
                                        type="text" 
                                        id="amount" 
                                        value={amount}
                                        onChange={handleAmountChange}
                                        className="w-full bg-gray-800 border border-gray-700 rounded-lg py-2 pl-7 pr-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-500" 
                                        placeholder="0.00" 
                                    />
                                </div>
                            </div>
                             <div>
                                <label htmlFor="destination" className="block text-sm font-medium text-gray-300 mb-1">
                                    {method === 'PayPal' ? 'PayPal Email' : 'Account Number'}
                                </label>
                                <input 
                                    type={method === 'PayPal' ? 'email' : 'text'}
                                    id="destination" 
                                    value={destination}
                                    onChange={(e) => setDestination(e.target.value)}
                                    className="w-full bg-gray-800 border border-gray-700 rounded-lg py-2 px-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-500" 
                                    placeholder={method === 'PayPal' ? 'your.email@example.com' : '1234567890'}
                                />
                            </div>

                            {error && <p className="text-sm text-red-500">{error}</p>}
                            
                            <div className="pt-4">
                                <button type="submit" className="w-full px-4 py-3 text-sm font-medium text-white bg-brand-500 rounded-md hover:bg-brand-600 transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed" disabled={!!error || !amount || !destination}>
                                    Request Withdrawal
                                </button>
                            </div>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
};
