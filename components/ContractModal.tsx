import React from 'react';
import { Contract } from '../types';
import { CloseIcon, DownloadIcon } from './IconComponents';

interface ContractModalProps {
    isOpen: boolean;
    onClose: () => void;
    contract: Contract | null;
}

export const ContractModal: React.FC<ContractModalProps> = ({ isOpen, onClose, contract }) => {
    
    const handleDownload = () => {
        if (!contract) return;
        const blob = new Blob([contract.contractText], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `CACSdistro_Contract_${contract.beatTitle.replace(/\s+/g, '_')}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    if (!isOpen || !contract) return null;

    return (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[100] p-4" onClick={onClose} role="dialog" aria-modal="true">
            <div className="bg-gray-900/50 backdrop-blur-md border border-white/10 rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col" onClick={e => e.stopPropagation()}>
                <div className="flex justify-between items-center p-5 border-b border-white/10 flex-shrink-0">
                    <div>
                        <h2 className="text-lg font-bold text-white">Lease Agreement</h2>
                        <p className="text-sm text-gray-400">{contract.licenseType} License for "{contract.beatTitle}"</p>
                    </div>
                    <button onClick={onClose} className="text-gray-400 hover:text-white" aria-label="Close"><CloseIcon /></button>
                </div>

                <div className="p-6 overflow-y-auto">
                    <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                        <div className="bg-gray-800/50 p-3 rounded-lg">
                            <p className="text-gray-400">Producer</p>
                            <p className="text-white font-semibold">{contract.producerName}</p>
                        </div>
                         <div className="bg-gray-800/50 p-3 rounded-lg">
                            <p className="text-gray-400">Artist (Licensee)</p>
                            <p className="text-white font-semibold">{contract.artistName}</p>
                        </div>
                         <div className="bg-gray-800/50 p-3 rounded-lg">
                            <p className="text-gray-400">Signed Date</p>
                            <p className="text-white font-semibold">{new Date(contract.signedDate).toLocaleDateString()}</p>
                        </div>
                         <div className="bg-gray-800/50 p-3 rounded-lg">
                            <p className="text-gray-400">Artist Signature</p>
                            <p className="text-white font-semibold font-mono">{contract.signature}</p>
                        </div>
                    </div>

                    <h3 className="text-md font-semibold text-white mb-2">Terms & Conditions</h3>
                    <div className="h-64 overflow-y-auto p-4 bg-gray-800/50 border border-gray-700 rounded-lg text-xs text-gray-300 whitespace-pre-wrap font-mono">
                        {contract.contractText}
                    </div>
                </div>

                <div className="p-6 mt-auto border-t border-white/10 flex-shrink-0">
                    <button 
                        onClick={handleDownload}
                        className="w-full flex items-center justify-center space-x-2 px-4 py-3 text-sm font-medium text-white bg-brand-500 rounded-md hover:bg-brand-600 transition-colors"
                    >
                        <DownloadIcon />
                        <span>Download Contract (.txt)</span>
                    </button>
                </div>
            </div>
        </div>
    );
};
