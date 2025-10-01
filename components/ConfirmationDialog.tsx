import React, { useEffect } from 'react';

interface ConfirmationDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: string | React.ReactNode;
    confirmText?: string;
    cancelText?: string;
}

export const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
    isOpen,
    onClose,
    onConfirm,
    title,
    message,
    confirmText = "Confirm",
    cancelText = "Cancel"
}) => {

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        if (isOpen) {
            window.addEventListener('keydown', handleKeyDown);
        }

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div 
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[100] p-4" 
            onClick={onClose} 
            role="dialog" 
            aria-modal="true"
            aria-labelledby="dialog-title"
        >
            <div 
                className="bg-gray-900/50 backdrop-blur-md border border-white/10 rounded-xl shadow-xl w-full max-w-md" 
                onClick={e => e.stopPropagation()}
            >
                <div className="p-6">
                    <h2 id="dialog-title" className="text-xl font-bold text-white">{title}</h2>
                    <div className="mt-2 text-gray-400">
                        {message}
                    </div>
                </div>
                <div className="bg-gray-800/50 px-6 py-4 flex justify-end space-x-3">
                    <button 
                        type="button" 
                        onClick={onClose} 
                        className="px-4 py-2 text-sm font-medium text-gray-300 bg-gray-700/80 rounded-md hover:bg-gray-600/80 transition-colors"
                    >
                        {cancelText}
                    </button>
                    <button 
                        type="button" 
                        onClick={onConfirm} 
                        className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 transition-colors"
                    >
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
};