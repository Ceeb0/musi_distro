import React, { useMemo } from 'react';
import { User, Beat } from '../types';
import { CurrencyDollarIcon } from './IconComponents';

interface EarningsDashboardProps {
    currentUser: User;
    allBeats: Beat[];
    formatCurrency: (amount: number) => string;
}

export const EarningsDashboard: React.FC<EarningsDashboardProps> = ({ currentUser, allBeats, formatCurrency }) => {

    const userEarnings = useMemo(() => {
        const contributedBeats: { beat: Beat, userShare: number }[] = [];
        
        // Find beats where the current user is the main producer
        allBeats.forEach(beat => {
            if (beat.producer === currentUser.name) {
                const totalContributorSplit = beat.contributors?.reduce((sum, c) => sum + c.split, 0) || 0;
                contributedBeats.push({ beat, userShare: 100 - totalContributorSplit });
            } 
            // Find beats where the current user is a contributor
            else if (beat.contributors?.some(c => c.name === currentUser.name)) {
                const userContribution = beat.contributors.find(c => c.name === currentUser.name);
                if (userContribution) {
                    contributedBeats.push({ beat, userShare: userContribution.split });
                }
            }
        });

        // Mocking total revenue for each beat
        const earningsData = contributedBeats.map(({ beat, userShare }) => {
            const mockTotalRevenue = (beat.price * (Math.floor(Math.random() * 50) + 5)); // 5 to 55 sales
            const userEarnings = mockTotalRevenue * (userShare / 100);
            return {
                ...beat,
                userShare,
                mockTotalRevenue,
                userEarnings,
            };
        });

        const totalUserEarnings = earningsData.reduce((sum, item) => sum + item.userEarnings, 0);

        return { earningsData, totalUserEarnings };

    }, [currentUser, allBeats]);


    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-8">
                <h1 className="text-3xl font-bold text-adaptive-white">Earnings</h1>
            </div>

            {/* Total Earnings Card */}
            <div className="bg-gray-900/50 backdrop-blur-md border border-white/10 shadow-lg rounded-xl p-6 mb-8 max-w-sm">
                <div className="flex items-center space-x-4">
                    <div className="bg-green-900/50 p-3 rounded-full">
                        <CurrencyDollarIcon className="w-8 h-8 text-green-400" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-400">Total Earnings</p>
                        <p className="text-3xl font-bold text-white">{formatCurrency(userEarnings.totalUserEarnings)}</p>
                    </div>
                </div>
            </div>

            {/* Earnings Breakdown Table */}
            <div>
                 <h2 className="text-xl font-semibold text-adaptive-white mb-4">Earnings Breakdown</h2>
                 <div className="bg-gray-900/50 backdrop-blur-md border border-white/10 shadow-lg rounded-xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-800/50">
                                <tr>
                                    <th className="p-4 text-sm font-semibold text-gray-300">Track</th>
                                    <th className="p-4 text-sm font-semibold text-gray-300 text-center">Your Share</th>
                                    <th className="p-4 text-sm font-semibold text-gray-300 text-right">Total Revenue</th>
                                    <th className="p-4 text-sm font-semibold text-gray-300 text-right">Your Earnings</th>
                                </tr>
                            </thead>
                            <tbody>
                                {userEarnings.earningsData.length > 0 ? userEarnings.earningsData.map((item, index) => (
                                    <tr key={item.id} className={`${index % 2 === 0 ? 'bg-gray-900/30' : 'bg-gray-800/30'} border-t border-white/10`}>
                                        <td className="p-4">
                                            <div className="flex items-center space-x-3">
                                                <img src={item.coverArt} alt={item.title} className="w-10 h-10 rounded-md object-cover" />
                                                <div>
                                                    <p className="font-medium text-white">{item.title}</p>
                                                    <p className="text-xs text-gray-400">{item.producer}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-4 text-center">
                                            <span className="font-semibold text-brand-400">{item.userShare}%</span>
                                        </td>
                                        <td className="p-4 text-gray-400 text-right">{formatCurrency(item.mockTotalRevenue)}</td>
                                        <td className="p-4 text-green-400 font-semibold text-right">{formatCurrency(item.userEarnings)}</td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan={4} className="text-center py-16 text-gray-500">
                                            <h3 className="text-lg font-semibold">No earnings to display yet.</h3>
                                            <p>Create or contribute to tracks to start earning.</p>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                 </div>
            </div>
        </div>
    );
};
