import React from 'react';
import { CheckCircleIcon } from './IconComponents';
import { Plan } from '../types';

interface PricingCardProps {
    plan: Plan;
    isCurrent: boolean;
    onSelect: () => void;
    formatCurrency: (priceInUsd: number) => string;
}

export const PricingCard: React.FC<PricingCardProps> = ({ plan, isCurrent, onSelect, formatCurrency }) => (
    <div className={`relative bg-gray-900 rounded-lg p-6 border-2 flex flex-col ${isCurrent ? 'border-brand-500' : 'border-gray-800'} ${plan.isPopular ? 'shadow-lg shadow-brand-500/20' : ''}`}>
        {plan.isPopular && (
            <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2">
                <span className="bg-brand-500 text-white text-xs font-semibold px-3 py-1 rounded-full uppercase">Most Popular</span>
            </div>
        )}
        <div className="flex-grow">
            <h3 className="text-xl font-bold text-white text-center">{plan.name}</h3>
            <div className="text-center my-4">
                 <p className="text-4xl font-extrabold text-white">
                    {plan.price > 0 ? formatCurrency(plan.price) : 'Free'}
                 </p>
                 {plan.price > 0 && <p className="text-base font-medium text-gray-400">/{plan.priceDescription}</p>}
            </div>
            <ul className="space-y-3 mb-6">
                {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                        <CheckCircleIcon className="w-5 h-5 text-brand-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-400">{feature}</span>
                    </li>
                ))}
            </ul>
        </div>
        <button
            onClick={onSelect}
            disabled={isCurrent}
            className="w-full mt-auto py-3 text-sm font-semibold text-white rounded-lg transition-colors disabled:cursor-not-allowed disabled:bg-gray-700 disabled:text-gray-400 bg-brand-500 hover:bg-brand-600"
        >
            {isCurrent ? 'Current Plan' : 'Select Plan'}
        </button>
    </div>
);
