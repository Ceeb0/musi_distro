import React, { useEffect, useRef } from 'react';
import { useTheme } from '../contexts/ThemeContext';

interface SimpleCaptchaProps {
    text: string;
    onRefresh: () => void;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
}

export const SimpleCaptcha: React.FC<SimpleCaptchaProps> = ({ text, onRefresh, value, onChange, placeholder = "Enter text from image" }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { theme } = useTheme();

    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas) {
            const ctx = canvas.getContext('2d');
            if (ctx) {
                const width = canvas.width;
                const height = canvas.height;

                const isDark = theme === 'dark';
                const bgColor = isDark ? '#1E1E1E' : '#f3f4f6';
                const textColor = isDark ? '#FFFFFF' : '#111827';
                const noiseColor = isDark ? 'rgba(163, 163, 163, 0.4)' : 'rgba(115, 115, 115, 0.4)';

                ctx.fillStyle = bgColor;
                ctx.fillRect(0, 0, width, height);

                ctx.font = 'bold 32px "Comic Sans MS", cursive, sans-serif';
                ctx.fillStyle = textColor;
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';

                for (let i = 0; i < text.length; i++) {
                    const char = text[i];
                    const x = (i + 0.8) * (width / (text.length + 1));
                    const y = height / 2;
                    const rotation = (Math.random() - 0.5) * 0.5;
                    const yShift = (Math.random() - 0.5) * 10;
                    ctx.save();
                    ctx.translate(x, y + yShift);
                    ctx.rotate(rotation);
                    ctx.fillText(char, 0, 0);
                    ctx.restore();
                }

                ctx.strokeStyle = noiseColor;
                ctx.lineWidth = 1;
                for (let i = 0; i < 8; i++) {
                    ctx.beginPath();
                    ctx.moveTo(Math.random() * width, Math.random() * height);
                    ctx.lineTo(Math.random() * width, Math.random() * height);
                    ctx.stroke();
                }
            }
        }
    }, [text, theme]);

    return (
        <div className="space-y-3">
            <div className="flex items-stretch gap-2">
                <canvas ref={canvasRef} width="200" height="50" className="rounded-lg border border-gray-300 dark:border-gray-700" />
                <button
                    type="button"
                    onClick={onRefresh}
                    className="p-3 bg-gray-200 dark:bg-gray-800/50 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
                    aria-label="Refresh CAPTCHA"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 3a9 9 0 11-9.902 12.832M15 3v6h-6"></path>
                    </svg>
                </button>
            </div>
            <input
                type="text"
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck="false"
                className="w-full bg-gray-100 dark:bg-gray-800/50 border border-gray-300 dark:border-gray-700 rounded-lg py-3 px-4 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
        </div>
    );
};
