import React, { useEffect, useState } from 'react';
import { Beat, SalesData, View, Withdrawal, Currency } from '../types';
import { fetchProducerUploads, fetchSalesData, fetchWithdrawalHistory } from '../services/mockApi';
import { SalesChart } from './SalesChart';
import { UploadBeatModal } from './UploadBeatModal';
import { UploadIcon, TrashIcon, SparklesIcon, CashOutIcon } from './IconComponents';
import { ConfirmationDialog } from './ConfirmationDialog';
import { CashOutModal } from './CashOutModal';
// src/components/ProducerDashboard.tsx
import { Plan } from "../types";

interface ProducerDashboardProps {
  setView: (view: string) => void;
  currentPlan: Plan | null;   // ⬅️ change from string to Plan | null
  formatCurrency: (value: number) => string;
  currency: Currency;
}



const getStatusChip = (status: Withdrawal['status']) => {
    switch (status) {
        case 'Completed':
            return <span className="px-2 py-1 text-xs font-medium text-green-300 bg-green-900/50 rounded-full">Completed</span>;
        case 'Processing':
            return <span className="px-2 py-1 text-xs font-medium text-yellow-300 bg-yellow-900/50 rounded-full">Processing</span>;
        case 'Failed':
            return <span className="px-2 py-1 text-xs font-medium text-red-300 bg-red-900/50 rounded-full">Failed</span>;
    }
};

export const ProducerDashboard: React.FC<ProducerDashboardProps> = ({ setView, currentPlan, formatCurrency, currency }) => {
    const [uploads, setUploads] = useState<Beat[]>([]);
    const [sales, setSales] = useState<SalesData[]>([]);
    const [withdrawals, setWithdrawals] = useState<Withdrawal[]>([]);
    const [loading, setLoading] = useState(true);
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
    const [isCashOutModalOpen, setIsCashOutModalOpen] = useState(false);
    const [beatToDelete, setBeatToDelete] = useState<Beat | null>(null);

    const isPremium = currentPlan?.name !== 'Basic' && currentPlan?.name !== 'Free';
    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            const [uploadsData, salesData, withdrawalsData] = await Promise.all([
                fetchProducerUploads(),
                fetchSalesData(),
                fetchWithdrawalHistory(),
            ]);
            setUploads(uploadsData);
            setSales(salesData);
            setWithdrawals(withdrawalsData);
            setLoading(false);
        }
        loadData();
    }, []);

    const handleBeatUpload = (newBeat: Beat) => {
        setUploads(prevUploads => [newBeat, ...prevUploads]);
        setIsUploadModalOpen(false);
    };

    const handleDeleteClick = (beat: Beat) => {
        setBeatToDelete(beat);
    };

    const handleConfirmDelete = () => {
        if (beatToDelete) {
            setUploads(prevUploads => prevUploads.filter(b => b.id !== beatToDelete.id));
            setBeatToDelete(null);
        }
    };
    
    const handleWithdrawalRequest = (withdrawal: Omit<Withdrawal, 'id' | 'date' | 'status'>) => {
        // NOTE: In a real app, the amount would be converted back to a base currency (e.g., USD)
        // before being sent to the backend. Here we are passing the local currency amount.
        const newWithdrawal: Withdrawal = {
            ...withdrawal,
            id: `wd_${Date.now()}`,
            date: new Date().toISOString().split('T')[0],
            status: 'Processing',
        };
        setWithdrawals(prev => [newWithdrawal, ...prev]);
    };

    const totalRevenue = sales.reduce((acc, month) => acc + month.sales, 0);
    const totalWithdrawn = withdrawals
        .filter(w => w.status === 'Completed' || w.status === 'Processing')
        .reduce((acc, w) => acc + w.amount, 0);
    const currentBalance = totalRevenue - totalWithdrawn;
    const totalUploads = uploads.length;

    return (
        <>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-8">
                    <h1 className="text-3xl font-bold text-white">Producer Dashboard</h1>
                    <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-2 flex items-center justify-between sm:justify-start space-x-4">
                        <div className="text-center">
                           <p className="text-xs text-gray-400">Current Plan</p>
                           <p className="font-bold text-white">{currentPlan ? currentPlan.name : "No plan"}</p>
                        </div>
                        <button onClick={() => setView('subscription')} className="px-4 py-2 text-sm font-medium text-white bg-brand-500 rounded-md hover:bg-brand-600 transition-colors">
                            Manage Subscription
                        </button>
                    </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-gray-900 p-6 rounded-lg flex flex-col justify-between">
                        <div>
                            <h3 className="text-gray-400 text-sm font-medium">Withdrawable Balance</h3>
                            <p className="text-3xl font-bold text-white mt-1">{formatCurrency(currentBalance)}</p>
                            <p className="text-xs text-gray-500 mt-1">Total Revenue: {formatCurrency(totalRevenue)}</p>
                        </div>
                        <button onClick={() => setIsCashOutModalOpen(true)} className="mt-4 flex items-center justify-center space-x-2 w-full px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 transition-colors">
                            <CashOutIcon className="w-4 h-4" />
                            <span>Cash Out</span>
                        </button>
                    </div>
                    <div className="bg-gray-900 p-6 rounded-lg">
                        <h3 className="text-gray-400 text-sm font-medium">Total Sales</h3>
                        <p className="text-3xl font-bold text-white mt-1">{(totalRevenue / 29.99).toFixed(0)}</p>
                    </div>
                     <div className="bg-gray-900 p-6 rounded-lg">
                        <h3 className="text-gray-400 text-sm font-medium">Total Uploads</h3>
                        <p className="text-3xl font-bold text-white mt-1">{totalUploads}</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                    <div className="xl:col-span-2 bg-gray-900 p-6 rounded-lg">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-semibold text-white">Sales Analytics</h2>
                            {!isPremium && 
                                <div className="flex items-center space-x-2 text-sm bg-yellow-500/10 text-yellow-400 px-3 py-1 rounded-full">
                                    <SparklesIcon className="w-4 h-4" />
                                    <span>Upgrade for more details</span>
                                </div>
                            }
                        </div>
                        <div className={`h-80 relative ${!isPremium ? 'opacity-30 blur-sm' : ''}`}>
                            <SalesChart data={sales} formatCurrency={formatCurrency} />
                            {!isPremium && <div className="absolute inset-0 bg-transparent z-10"></div>}
                        </div>
                    </div>

                    <div className="bg-gray-900 p-6 rounded-lg">
                        <h2 className="text-xl font-semibold text-white mb-4">Withdrawal History</h2>
                        <div className="space-y-4 max-h-80 overflow-y-auto pr-2">
                            {withdrawals.length > 0 ? withdrawals.map(w => (
                                <div key={w.id} className="flex justify-between items-center text-sm">
                                    <div>
                                        <p className="font-medium text-white">{formatCurrency(w.amount)}</p>
                                        <p className="text-xs text-gray-400">{w.method} to {w.destination}</p>
                                    </div>
                                    {getStatusChip(w.status)}
                                </div>
                            )) : (
                                <p className="text-sm text-gray-500 text-center pt-8">No withdrawal history.</p>
                            )}
                        </div>
                    </div>
                </div>

                <div className="mt-8">
                     <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold text-white">My Uploads</h2>
                         <button 
                            onClick={() => setIsUploadModalOpen(true)}
                            className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-white bg-brand-500 rounded-md hover:bg-brand-600 transition-colors"
                        >
                            <UploadIcon className="w-4 h-4" />
                            <span>Upload Beat</span>
                        </button>
                     </div>
                     <div className="bg-gray-900 rounded-lg overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-gray-800">
                                    <tr>
                                        <th className="p-4 text-sm font-semibold text-gray-300">Title</th>
                                        <th className="p-4 text-sm font-semibold text-gray-300">Genre</th>
                                        <th className="p-4 text-sm font-semibold text-gray-300">Price</th>
                                        <th className="p-4 text-sm font-semibold text-gray-300">Plays</th>
                                        <th className="p-4 text-sm font-semibold text-gray-300">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {uploads.map((beat, index) => (
                                        <tr key={beat.id} className={`${index % 2 === 0 ? 'bg-gray-900' : 'bg-gray-800/50'} border-t border-gray-800`}>
                                            <td className="p-4 flex items-center space-x-3">
                                                <img src={beat.coverArt} alt={beat.title} className="w-10 h-10 rounded-md object-cover" />
                                                <span className="font-medium text-white">{beat.title}</span>
                                            </td>
                                            <td className="p-4 text-gray-400">{beat.genre}</td>
                                            <td className="p-4 text-gray-400">
                                                {beat.isFree ? <span className="font-semibold text-green-400">Free</span> : formatCurrency(beat.price)}
                                            </td>
                                            <td className="p-4 text-gray-400">{(Math.random() * 5000 + 1000).toFixed(0)}</td>
                                            <td className="p-4 text-gray-400">
                                                <button
                                                    onClick={() => handleDeleteClick(beat)}
                                                    className="text-gray-500 hover:text-red-500 transition-colors"
                                                    aria-label="Delete beat"
                                                    >
                                                    <TrashIcon />
                                                </button>

                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                     </div>
                </div>
            </div>
            <UploadBeatModal 
                isOpen={isUploadModalOpen} 
                onClose={() => setIsUploadModalOpen(false)} 
                onUpload={handleBeatUpload} 
            />
            <ConfirmationDialog
                isOpen={!!beatToDelete}
                onClose={() => setBeatToDelete(null)}
                onConfirm={handleConfirmDelete}
                title="Delete Beat"
                message={<>Are you sure you want to delete <strong>{beatToDelete?.title}</strong>? This action cannot be undone.</>}
                confirmText="Delete"
            />
            <CashOutModal 
                isOpen={isCashOutModalOpen}
                onClose={() => setIsCashOutModalOpen(false)}
                onConfirm={handleWithdrawalRequest}
                currentBalance={currentBalance}
                formatCurrency={formatCurrency}
                currency={currency}
            />
        </>
    );
};
