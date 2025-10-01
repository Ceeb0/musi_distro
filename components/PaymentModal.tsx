import React, { useState } from 'react';
import { Beat } from '../types';
import { CloseIcon, CreditCardIcon, BankIcon, BitcoinIcon, CheckCircleIcon, ClockIcon, ShareIcon } from './IconComponents';
import { MOCK_ARTIST, MOCK_USERS } from '../services/mockApi';
import { generateContractText } from '../utils/contractHelper';

interface PaymentModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (licenseType: 'Non-Exclusive' | 'Exclusive', signature: string) => void;
    beat: Beat | null;
    formatCurrency: (priceInUsd: number) => string;
}

type ModalView = 'license' | 'contract' | 'payment' | 'pending' | 'success' | 'receipt';

const LicenseCard: React.FC<{
    type: 'Non-Exclusive' | 'Exclusive';
    price: string;
    description: string;
    isSelected: boolean;
    onSelect: () => void;
}> = ({ type, price, description, isSelected, onSelect }) => (
    <div
        onClick={onSelect}
        className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${isSelected ? 'border-brand-500 bg-brand-500/10' : 'border-gray-700 hover:border-gray-600'}`}
    >
        <div className="flex justify-between items-center">
            <h4 className="font-bold text-lg text-white">{type}</h4>
            <p className="font-bold text-lg text-brand-500">{price}</p>
        </div>
        <p className="text-sm text-gray-400 mt-1">{description}</p>
    </div>
);

const ESignatureSection: React.FC<{
    signature: string;
    setSignature: (value: string) => void;
    agreed: boolean;
    setAgreed: (value: boolean) => void;
    beat: Beat;
}> = ({ signature, setSignature, agreed, setAgreed, beat }) => (
    <div className="mt-6 space-y-4">
        <p className="text-xs text-gray-500">By signing, you confirm that you have read and agree to the terms of the {beat.title} license agreement.</p>
        <div>
            <label htmlFor="signature" className="block text-sm font-medium text-gray-300 mb-1">Type your full legal name to sign:</label>
            <input
                id="signature"
                type="text"
                value={signature}
                onChange={(e) => setSignature(e.target.value)}
                className="w-full bg-gray-800/50 border border-gray-700 rounded-lg py-2 px-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-500"
                placeholder="Your Full Name"
            />
        </div>
        <div className="flex items-start">
            <div className="flex h-5 items-center">
                <input id="agree-terms" type="checkbox" checked={agreed} onChange={e => setAgreed(e.target.checked)} className="h-4 w-4 rounded border-gray-600 bg-gray-700 text-brand-500 focus:ring-brand-500" />
            </div>
            <div className="ml-3 text-sm">
                <label htmlFor="agree-terms" className="font-medium text-gray-300">I agree to the terms and conditions.</label>
            </div>
        </div>
    </div>
);


export const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose, onConfirm, beat, formatCurrency }) => {
    const [view, setView] = useState<ModalView>('license');
    const [licenseType, setLicenseType] = useState<'Non-Exclusive' | 'Exclusive'>('Non-Exclusive');
    const [signature, setSignature] = useState('');
    const [agreedToTerms, setAgreedToTerms] = useState(false);

    const handleClose = () => {
        onClose();
        setTimeout(() => {
            setView('license');
            setLicenseType('Non-Exclusive');
            setSignature('');
            setAgreedToTerms(false);
        }, 300);
    };

    if (!isOpen || !beat) return null;

    const handleConfirmAndPay = () => {
        onConfirm(licenseType, signature);
        setView('success');
    };

    const producer = MOCK_USERS.find(u => u.name === beat.producer);
    const contractText = producer ? generateContractText(beat, MOCK_ARTIST, producer, licenseType, licenseType === 'Exclusive' ? beat.exclusivePrice! : beat.price, formatCurrency) : "Contract could not be generated.";


    const renderContent = () => {
        switch (view) {
            case 'license':
                return (
                    <div className="p-6">
                        <h3 className="text-xl font-bold text-white mb-4 text-center">Choose Your License</h3>
                        <div className="space-y-4">
                            <LicenseCard
                                type="Non-Exclusive"
                                price={formatCurrency(beat.price)}
                                description="Use for one commercial project. Producer retains ownership. Must credit producer."
                                isSelected={licenseType === 'Non-Exclusive'}
                                onSelect={() => setLicenseType('Non-Exclusive')}
                            />
                            <LicenseCard
                                type="Exclusive"
                                price={formatCurrency(beat.exclusivePrice || beat.price * 10)}
                                description="Unlimited commercial use. Beat is removed from the store. You own the exclusive rights."
                                isSelected={licenseType === 'Exclusive'}
                                onSelect={() => setLicenseType('Exclusive')}
                            />
                        </div>
                        <button
                            onClick={() => setView('contract')}
                            className="w-full mt-6 px-4 py-3 text-sm font-medium text-white bg-brand-500 rounded-md hover:bg-brand-600"
                        >
                            Next: Review Contract
                        </button>
                    </div>
                );
            case 'contract':
                return (
                    <div className="p-6">
                         <h3 className="text-xl font-bold text-white mb-4">Review & Sign Agreement</h3>
                         <div className="h-48 overflow-y-auto p-3 bg-gray-800/50 border border-gray-700 rounded-lg text-xs text-gray-300 whitespace-pre-wrap font-mono">
                             {contractText}
                         </div>
                         <ESignatureSection
                            signature={signature}
                            setSignature={setSignature}
                            agreed={agreedToTerms}
                            setAgreed={setAgreedToTerms}
                            beat={beat}
                         />
                         <div className="flex gap-4 mt-6">
                            <button onClick={() => setView('license')} className="w-full px-4 py-3 text-sm font-medium text-gray-300 bg-gray-700 rounded-md hover:bg-gray-600">Back</button>
                            <button
                                onClick={() => setView('payment')}
                                disabled={!signature || !agreedToTerms}
                                className="w-full px-4 py-3 text-sm font-medium text-white bg-brand-500 rounded-md hover:bg-brand-600 disabled:bg-gray-600 disabled:cursor-not-allowed"
                            >
                                Next: Payment
                            </button>
                         </div>
                    </div>
                );
            case 'payment':
                 const price = licenseType === 'Exclusive' ? beat.exclusivePrice! : beat.price;
                return (
                    <div className="p-6">
                        <div className="flex items-center space-x-4 mb-6">
                            <img src={beat.coverArt} alt={beat.title} className="w-20 h-20 rounded-lg object-cover" />
                            <div>
                                <h3 className="text-white font-semibold">{beat.title}</h3>
                                <p className="text-gray-400 text-sm">{licenseType} License</p>
                                <p className="text-brand-500 font-bold text-lg mt-1">{formatCurrency(price)}</p>
                            </div>
                        </div>
                        <CreditCardIcon className="w-full" />
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="card-number" className="block text-sm font-medium text-gray-300 mb-1">Card Number</label>
                                <div className="relative">
                                    <input type="text" id="card-number" className="w-full bg-gray-800/50 border border-gray-700 rounded-lg py-2 pl-10 pr-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-500" placeholder="0000 0000 0000 0000" defaultValue="4242 4242 4242 4242" />
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500"><CreditCardIcon /></div>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="expiry" className="block text-sm font-medium text-gray-300 mb-1">Expiry Date</label>
                                    <input type="text" id="expiry" className="w-full bg-gray-800/50 border border-gray-700 rounded-lg py-2 px-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-500" placeholder="MM / YY" defaultValue="12 / 28" />
                                </div>
                                <div>
                                    <label htmlFor="cvc" className="block text-sm font-medium text-gray-300 mb-1">CVC</label>
                                    <input type="text" id="cvc" className="w-full bg-gray-800/50 border border-gray-700 rounded-lg py-2 px-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-500" placeholder="123" defaultValue="123" />
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-4 mt-6">
                            <button onClick={() => setView('contract')} className="w-full px-4 py-3 text-sm font-medium text-gray-300 bg-gray-700 rounded-md hover:bg-gray-600">Back</button>
                            <button
                                type="button"
                                onClick={handleConfirmAndPay}
                                className="w-full px-4 py-3 text-sm font-medium text-white bg-brand-500 rounded-md hover:bg-brand-600"
                            >
                                Pay {formatCurrency(price)}
                            </button>
                        </div>
                    </div>
                );
            case 'success':
                 return (
                    <div className="p-6 text-center">
                        <CheckCircleIcon className="w-16 h-16 mx-auto mb-4 text-green-500" />
                        <h2 className="text-2xl font-bold text-white">Payment Successful!</h2>
                        <p className="text-gray-400 mt-2 mb-8">Your new beat has been added to your library. You can download it and view the contract from your dashboard.</p>
                        <button onClick={handleClose} className="w-full px-4 py-3 text-sm font-medium text-white bg-brand-500 rounded-md hover:bg-brand-600 transition-colors">
                            Close
                        </button>
                    </div>
                 );
            default:
                return null;
        }
    };
    
    const getTitle = () => {
        switch (view) {
            case 'license': return 'Select License';
            case 'contract': return 'Sign Contract';
            case 'payment': return 'Complete Purchase';
            case 'success': return 'Purchase Complete';
            default: return 'Checkout';
        }
    }


    return (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[100] p-4" onClick={handleClose} role="dialog" aria-modal="true">
            <div className="bg-gray-900/50 backdrop-blur-md border border-white/10 rounded-xl shadow-xl w-full max-w-lg" onClick={e => e.stopPropagation()}>
                <div className="flex justify-between items-center p-5 border-b border-white/10">
                    <h2 className="text-lg font-bold text-white">{getTitle()}</h2>
                    <button onClick={handleClose} className="text-gray-400 hover:text-white" aria-label="Close"><CloseIcon /></button>
                </div>
                {renderContent()}
            </div>
        </div>
    );
};
