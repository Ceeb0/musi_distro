import React, { useState } from 'react';
import { Beat } from '../types';
import { CloseIcon, CreditCardIcon, BankIcon, BitcoinIcon, CheckCircleIcon, ClockIcon, ShareIcon } from './IconComponents';
import { MOCK_ARTIST } from '../services/mockApi';

interface PaymentModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    beat: Beat | null;
    formatCurrency: (priceInUsd: number) => string;
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

const CardPaymentForm: React.FC = () => (
    <div className="space-y-4">
        <div>
            <label htmlFor="card-number" className="block text-sm font-medium text-gray-300 mb-1">Card Number</label>
            <div className="relative">
                <input type="text" id="card-number" className="w-full bg-gray-800 border border-gray-700 rounded-lg py-2 pl-10 pr-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-500" placeholder="0000 0000 0000 0000" defaultValue="4242 4242 4242 4242" />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500"><CreditCardIcon /></div>
            </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
            <div>
                <label htmlFor="expiry" className="block text-sm font-medium text-gray-300 mb-1">Expiry Date</label>
                <input type="text" id="expiry" className="w-full bg-gray-800 border border-gray-700 rounded-lg py-2 px-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-500" placeholder="MM / YY" defaultValue="12 / 28" />
            </div>
            <div>
                <label htmlFor="cvc" className="block text-sm font-medium text-gray-300 mb-1">CVC</label>
                <input type="text" id="cvc" className="w-full bg-gray-800 border border-gray-700 rounded-lg py-2 px-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-500" placeholder="123" defaultValue="123" />
            </div>
        </div>
    </div>
);

const TransferPaymentDetails: React.FC = () => (
    <div className="bg-gray-800 p-4 rounded-lg text-sm">
        <p className="text-gray-300 mb-3">Please transfer the total amount to the following bank account:</p>
        <div className="space-y-2 text-white">
            <div className="flex justify-between"><span className="text-gray-400">Bank Name:</span> <span>Beat Bank Inc.</span></div>
            <div className="flex justify-between"><span className="text-gray-400">Account Number:</span> <span>1234567890</span></div>
            <div className="flex justify-between"><span className="text-gray-400">SWIFT/BIC:</span> <span>BEATBANKUS</span></div>
            <div className="flex justify-between"><span className="text-gray-400">Reference:</span> <span>CACS-BEAT-{Date.now()}</span></div>
        </div>
        <p className="text-xs text-gray-500 mt-4">Your download will be available once the payment is confirmed (usually within 1-2 business days).</p>
    </div>
);

const BitcoinPaymentDetails: React.FC<{ beat: Beat }> = ({ beat }) => {
    const btcAddress = 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh';
    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=bitcoin:${btcAddress}?amount=${(beat.price / 50000).toFixed(6)}`; // Dummy conversion

    return (
        <div className="text-center">
            <p className="text-gray-300 mb-3 text-sm">Send the exact amount to the Bitcoin address below.</p>
            <div className="bg-gray-800 p-4 rounded-lg">
                <img src={qrCodeUrl} alt="Bitcoin QR Code" className="mx-auto mb-3 rounded-md bg-white p-1" />
                <p className="text-white font-mono break-all text-xs">{btcAddress}</p>
            </div>
            <p className="text-xs text-gray-500 mt-4">Your download will be available after the transaction is confirmed on the blockchain.</p>
        </div>
    );
};

const PostPaymentScreen: React.FC<{
    status: 'success' | 'pending';
    onViewReceipt: () => void;
    onClose: () => void;
}> = ({ status, onViewReceipt, onClose }) => {
    const isSuccess = status === 'success';
    const messages = {
        success: {
            title: 'Payment Successful!',
            body: 'Your new beat has been added to your library. You can download it from your dashboard.',
            Icon: CheckCircleIcon,
            iconClass: 'text-green-500',
        },
        pending: {
            title: 'Payment Processing',
            body: 'Your purchase will be available once payment is confirmed. Check your dashboard for updates.',
            Icon: ClockIcon,
            iconClass: 'text-yellow-500',
        }
    };
    const { title, body, Icon, iconClass } = messages[status];

    return (
        <div className="p-6 text-center">
            <Icon className={`w-16 h-16 mx-auto mb-4 ${iconClass}`} />
            <h2 className="text-2xl font-bold text-white">{title}</h2>
            <p className="text-gray-400 mt-2 mb-8">{body}</p>
            <div className="flex flex-col sm:flex-row gap-3">
                <button
                    onClick={onViewReceipt}
                    className="w-full px-4 py-3 text-sm font-medium text-white bg-gray-700 rounded-md hover:bg-gray-600 transition-colors"
                >
                    View Receipt
                </button>
                <button
                    onClick={onClose}
                    className="w-full px-4 py-3 text-sm font-medium text-white bg-brand-500 rounded-md hover:bg-brand-600 transition-colors"
                >
                    Close
                </button>
            </div>
        </div>
    );
};

const ReceiptView: React.FC<{
    beat: Beat;
    paymentMethod: string;
    status: 'Completed' | 'Processing';
    onBack: () => void;
    formatCurrency: (priceInUsd: number) => string;
}> = ({ beat, paymentMethod, status, onBack, formatCurrency }) => {
    const [shareStatus, setShareStatus] = useState('');
    const receiptId = `CACS-${beat.id.slice(-4)}-${Date.now().toString().slice(-6)}`;
    const user = MOCK_ARTIST; // Using mock artist for receipt details

    const handleShare = async () => {
        const shareData = {
            title: 'Your Beat Purchase Receipt',
            text: `Here is my receipt for purchasing "${beat.title}" from CACSdistro. Receipt ID: ${receiptId}`,
            url: window.location.href, // In a real app, this would be a dedicated receipt page URL
        };
        try {
            if (navigator.share) {
                await navigator.share(shareData);
                setShareStatus('Shared!');
            } else {
                await navigator.clipboard.writeText(`${shareData.text}\n${shareData.url}`);
                setShareStatus('Receipt link copied!');
            }
        } catch (error) {
            console.error('Error sharing:', error);
            setShareStatus('Could not share.');
        } finally {
            setTimeout(() => setShareStatus(''), 2000);
        }
    };

    return (
        <div className="p-6">
            <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-white">Receipt</h2>
                <p className="text-sm text-gray-500">{receiptId}</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg space-y-3 text-sm mb-6">
                <div className="flex justify-between"><span className="text-gray-400">Date:</span> <span className="text-white">{new Date().toLocaleDateString()}</span></div>
                <div className="flex justify-between"><span className="text-gray-400">Billed To:</span> <span className="text-white">{user.name}</span></div>
                <div className="flex justify-between"><span className="text-gray-400">Payment Method:</span> <span className="text-white capitalize">{paymentMethod}</span></div>
                <div className="flex justify-between"><span className="text-gray-400">Status:</span> <span className={`font-semibold ${status === 'Completed' ? 'text-green-400' : 'text-yellow-400'}`}>{status}</span></div>
            </div>
            <div className="border-t border-b border-gray-800 py-4 mb-4">
                 <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-300">{beat.title}</span>
                    <span className="text-white font-medium">{formatCurrency(beat.price)}</span>
                 </div>
            </div>
            <div className="flex justify-between items-center text-lg font-bold">
                <span className="text-gray-300">Total</span>
                <span className="text-brand-500">{formatCurrency(beat.price)}</span>
            </div>
             <div className="flex flex-col sm:flex-row gap-3 mt-8">
                <button onClick={onBack} className="w-full px-4 py-3 text-sm font-medium text-white bg-gray-700 rounded-md hover:bg-gray-600 transition-colors">
                    Back
                </button>
                <button onClick={handleShare} className="w-full flex items-center justify-center space-x-2 px-4 py-3 text-sm font-medium text-white bg-brand-500 rounded-md hover:bg-brand-600 transition-colors">
                    <ShareIcon />
                    <span>{shareStatus || 'Share'}</span>
                </button>
            </div>
        </div>
    );
};

export const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose, onConfirm, beat, formatCurrency }) => {
    const [paymentMethod, setPaymentMethod] = useState<'card' | 'transfer' | 'bitcoin'>('card');
    const [view, setView] = useState<'form' | 'pending' | 'success' | 'receipt'>('form');

    const handleClose = () => {
        onClose();
        // Delay state reset to allow for closing animation
        setTimeout(() => {
            setView('form');
            setPaymentMethod('card');
        }, 300);
    };
    
    if (!isOpen || !beat) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onConfirm();
        if (paymentMethod === 'card') {
            setView('success');
        } else {
            setView('pending');
        }
    };
    
    const getButtonText = () => {
        switch (paymentMethod) {
            case 'card': return `Pay ${formatCurrency(beat.price)}`;
            case 'transfer': return 'I have completed the transfer';
            case 'bitcoin': return 'I have sent the payment';
            default: return 'Confirm Purchase';
        }
    }

    const renderContent = () => {
        switch (view) {
            case 'receipt':
                return <ReceiptView beat={beat} paymentMethod={paymentMethod} status={paymentMethod === 'card' ? 'Completed' : 'Processing'} onBack={() => setView(paymentMethod === 'card' ? 'success' : 'pending')} formatCurrency={formatCurrency} />;
            case 'success':
                return <PostPaymentScreen status="success" onViewReceipt={() => setView('receipt')} onClose={handleClose} />;
            case 'pending':
                return <PostPaymentScreen status="pending" onViewReceipt={() => setView('receipt')} onClose={handleClose} />;
            case 'form':
            default:
                return (
                    <>
                        <div className="p-6">
                            <div className="flex items-center space-x-4 mb-6">
                                <img src={beat.coverArt} alt={beat.title} className="w-20 h-20 rounded-lg object-cover" />
                                <div>
                                    <h3 className="text-white font-semibold">{beat.title}</h3>
                                    <p className="text-gray-400 text-sm">{beat.producer}</p>
                                    <p className="text-brand-500 font-bold text-lg mt-1">{formatCurrency(beat.price)}</p>
                                </div>
                            </div>
                            
                            <div className="border-b border-gray-800 mb-6">
                                <div className="flex">
                                    <PaymentMethodButton label="Card" icon={<CreditCardIcon />} isActive={paymentMethod === 'card'} onClick={() => setPaymentMethod('card')} />
                                    <PaymentMethodButton label="Transfer" icon={<BankIcon />} isActive={paymentMethod === 'transfer'} onClick={() => setPaymentMethod('transfer')} />
                                    <PaymentMethodButton label="Bitcoin" icon={<BitcoinIcon />} isActive={paymentMethod === 'bitcoin'} onClick={() => setPaymentMethod('bitcoin')} />
                                </div>
                            </div>

                            <form onSubmit={handleSubmit}>
                                {paymentMethod === 'card' && <CardPaymentForm />}
                                {paymentMethod === 'transfer' && <TransferPaymentDetails />}
                                {paymentMethod === 'bitcoin' && <BitcoinPaymentDetails beat={beat} />}
                                
                                <div className="mt-8">
                                    <button type="submit" className="w-full px-4 py-3 text-sm font-medium text-white bg-brand-500 rounded-md hover:bg-brand-600 transition-colors">
                                        {getButtonText()}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </>
                );
        }
    };

    return (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[100] p-4" onClick={handleClose} role="dialog" aria-modal="true">
            <div className="bg-gray-900 rounded-lg shadow-xl w-full max-w-md" onClick={e => e.stopPropagation()}>
                <div className="flex justify-between items-center p-5 border-b border-gray-800">
                    <h2 className="text-lg font-bold text-white">
                        {view === 'form' ? 'Complete Purchase' : view === 'receipt' ? 'Purchase Receipt' : 'Purchase Status'}
                    </h2>
                    <button onClick={handleClose} className="text-gray-400 hover:text-white" aria-label="Close"><CloseIcon /></button>
                </div>
                {renderContent()}
            </div>
        </div>
    );
};