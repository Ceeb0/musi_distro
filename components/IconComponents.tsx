import React from 'react';

export const LogoIcon: React.FC<{ className?: string }> = ({ className = "w-8 h-8" }) => (
    <svg className={className} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="logo-gradient" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#38bdf8"/>
                <stop offset="100%" stopColor="#a78bfa"/>
            </linearGradient>
        </defs>
        <path fillRule="evenodd" clipRule="evenodd" d="M16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32ZM16 26.6667C21.8845 26.6667 26.6667 21.8845 26.6667 16C26.6667 10.1155 21.8845 5.33334 16 5.33334C10.1155 5.33334 5.33333 10.1155 5.33333 16C5.33333 21.8845 10.1155 26.6667 16 26.6667Z" fill="url(#logo-gradient)"/>
        <rect x="14" y="6" width="4" height="8" rx="2" fill="#09090B"/>
        <rect x="14" y="18" width="4" height="8" rx="2" fill="#09090B"/>
        <rect x="6" y="14" width="8" height="4" rx="2" fill="#09090B"/>
        <rect x="18" y="14" width="8" height="4" rx="2" fill="#09090B"/>
    </svg>
);

export const PlayIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd"></path></svg>
);

export const PauseIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 00-1 1v4a1 1 0 001 1h1a1 1 0 001-1V8a1 1 0 00-1-1H8zm3 0a1 1 0 00-1 1v4a1 1 0 001 1h1a1 1 0 001-1V8a1 1 0 00-1-1h-1z" clipRule="evenodd"></path></svg>
);

export const CartIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
);

export const SearchIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
);

export const ChevronDownIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
);

export const UploadIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
);

export const DownloadIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
);

export const CloseIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
);

export const TrashIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
);

export const CreditCardIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path></svg>
);

export const CheckCircleIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
);

export const ClockIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
);

export const ShareIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12s-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6.348l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.348a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"></path></svg>
);

export const SparklesIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6.22 6.22l2.12 2.12m10.24-4.66l-2.12 2.12M21 5h-4M19 3v4M17.78 17.78l-2.12-2.12M12 12a2 2 0 11-4 0 2 2 0 014 0zM7.76 19.58l2.12-2.12m4.24 4.24l2.12-2.12M18 21v-4M21 19h-4"></path></svg>
);

export const BankIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2h8a2 2 0 002-2v-1a2 2 0 012-2h1.945M4 11V9a2 2 0 012-2h12a2 2 0 012 2v2m-6 8v3m-4-3v3m-4-3v3M4 21h16"></path></svg>
);

export const BitcoinIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M11.685 5.942c.23-.66.03-1.29-.53-1.61l.53-.53a.75.75 0 00-1.06-1.06l-.53.53c-.41-.18-.84-.31-1.28-.39V1.5a.75.75 0 00-1.5 0v1.375c-.42.06-.82.17-1.19.31l.53-.53a.75.75 0 10-1.06-1.06l-.53.53c-.34.25-.61.6-.75 1.03h-1.31a.75.75 0 000 1.5h1.22c.1.75.46 1.42.98 1.95H5.75a.75.75 0 000 1.5h2.95c-.1.38-.16.78-.17 1.18v.07c0 .41.06.81.18 1.2H5.75a.75.75 0 000 1.5h3.13c.53.53 1.2 1.03 1.98 1.48H5.75a.75.75 0 000 1.5h5.18c.03.04.07.08.1.12l-1.39 1.39a.75.75 0 001.06 1.06l1.39-1.39c.4.15.82.26 1.25.33v1.44a.75.75 0 001.5 0v-1.44c1.49-.21 2.82-1.03 3.65-2.2h1.35a.75.75 0 000-1.5h-1.45c-.14-.85-.56-1.63-1.19-2.23h2.64a.75.75 0 000-1.5h-2.5c.08-.38.13-.77.13-1.17v-.07c0-.4-.05-.8-.14-1.18h2.51a.75.75 0 000-1.5h-2.65c-.47-.53-1.07-1.02-1.78-1.36h4.43a.75.75 0 000-1.5h-4.33c-.09-.45-.24-.88-.43-1.28zm.565 6.058v.07c0 .8-.31 1.52-.82 2.06v.01a.75.75 0 00-.03.02c-.5.5-1.21.8-2.02.8s-1.52-.3-2.02-.8a.75.75 0 00-.03-.02v-.01c-.5-.54-.82-1.26-.82-2.06v-.07c0-.8.32-1.52.82-2.06.5-.5 1.22-.8 2.02-.8s1.52.3 2.02.8c.5.54.82 1.26.82 2.06zm1.5 3.5c-.7.97-1.84 1.5-3.07 1.5s-2.37-.53-3.06-1.5c-.7-.97-1.12-2.22-1.12-3.57v-.07c0-1.35.42-2.6 1.12-3.57.7-.97 1.83-1.5 3.06-1.5s2.37.53 3.07 1.5c.7.97 1.12 2.22 1.12 3.57v.07c0 1.35-.42 2.6-1.12 3.57z"></path></svg>
);

export const PaypalIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M7.375 6.092c-.224-.002-.448.005-.67.012-1.33.044-2.176.36-2.615.932-.423.553-.39 1.343.09 2.19.46.81 1.34 1.29 2.5 1.48.02.003.04.006.06.01.07-.003.11-.006.14-.008.28-.016.56-.04.84-.06.27-.02.55-.04.82-.07.82-.08 1.63-.18 2.43-.3.8-.12 1.58-.27 2.34-.45.39-.09.77-.18 1.15-.28.4-.1.8-.2 1.18-.3.33-.08.66-.16 1-.25.13-.03.25-.06.38-.1.4-.1.79-.18 1.17-.24.1-.01.19-.02.29-.03.3-.04.6-.06.9-.07.03,0 .06-.002.09-.003C21.82 9.07 22 8.52 22 7.94c0-.58-.18-1.12-.5-1.55-.35-.47-.85-.77-1.48-.92-.5-.11-1.07-.12-1.68-.12H18c-.33 0-.66.01-1 .02-1.07.03-2.14.12-3.2.24-1.28.15-2.55.38-3.79.68-.2.05-.38.09-.57.14-.52.12-1.03.25-1.54.38-.12.03-.24.06-.36.09-.23.05-.46.1-.68.16-.13.03-.25.06-.38.09zm-1.14 4.34c-.5.08-1 .18-1.5.28-.5.1-1 .2-1.5.32-.4.1-.8.2-1.17.3-.1.02-.18.04-.27.06-.3.08-.6.16-.88.24-.12.03-.24.07-.36.1-.2.05-.4.1-.6.16-.13.04-.26.08-.4.12-.1.03-.2.06-.3.09-.07.02-.13.04-.2.06-.1.03-.18.06-.27.09-.1.03-.2.07-.3.1-.1.04-.2.08-.3.12-.07.03-.14.06-.2.1-.03.02-.06.03-.08.05-.12.06-.23.13-.34.2-.13.08-.26.16-.38.25-.1.08-.2.15-.28.23-.1.1-.18.2-.27.3-.04.05-.08.1-.12.15-.03.05-.07.1-.1.15-.03.05-.06.1-.08.15-.03.05-.06.1-.08.15l-.04.1c-.02.04-.03.08-.04.12s-.02.08-.02.13c0 .03.01.06.01.08.01.1.04.2.06.3.05.2.13.4.24.6.13.23.3.45.5.65.2.2.4.38.63.55.22.17.47.32.74.45.28.13.58.25.9.35.3.1.6.18.92.25.65.15 1.3.28 1.98.38.7.1 1.4.18 2.1.23.7.05 1.4.08 2.1.08h.2c.5 0 1-.02 1.5-.05.8-.05 1.6-.14 2.38-.28.4-.07.78-.15 1.16-.25.38-.1.75-.2 1.1-.32.35-.12.68-.26.98-.4.3-.14.58-.3.82-.45.24-.15.45-.3.64-.48.2-.17.36-.35.5-.54.14-.18.25-.38.34-.58.08-.2.15-.4-.2-.6s.08-.4.1-.6c.02-.2.03-.4.03-.6v-.1c-.08-1.05-.5-1.88-1.2-2.48-.68-.6-1.6-.9-2.68-.9h-.2c-.5 0-1 .02-1.5.05-.8.05-1.6.14-2.38.28-.4.07-.78-.15-1.16-.25-.38.1-.75.2-1.1.32-.35.12-.68.26-.98.4-.3.14-.58.3-.82.45-.24.15-.45.3-.64.48-.2.17-.36.35-.5.54-.14.18-.25.38-.34-.58-.08-.2-.15-.4-.2-.6-.04-.2-.06-.4-.08-.6-.02-.2-.02-.4.02-.6 0-.05.01-.1.02-.14.02-.06.04-.12.08-.18.03-.06.07-.12.1-.18.04-.06.08-.12.12-.18.05-.06.1-.12.15-.18.05-.06.1-.12.15-.18.05-.06.1-.1.14-.15.02-.02.04-.04.06-.06.08-.08.17-.15.25-.22.08-.07.17-.14.25-.2.08-.07.17-.13.25-.19.08-.06.16-.12.24-.18.08-.06.16-.1.25-.15.04-.02.08-.04.12-.06.08-.04.16-.08.24-.12.08-.04.16-.08.24-.12z" />
    </svg>
);

export const CashOutIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
);


export const StarIcon: React.FC<{ className?: string; fill?: string; stroke?: string }> = ({
    className = "w-5 h-5",
    fill = "none",
    stroke = "currentColor",
}) => (
    <svg
        className={className}
        fill={fill}
        stroke={stroke}
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
        ></path>
    </svg>
);

export const CameraIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
);

export const HeartIcon: React.FC<{ className?: string; filled?: boolean }> = ({ className = "w-5 h-5", filled = false }) => (
    <svg className={className} fill={filled ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.672l1.318-1.354a4.5 4.5 0 116.364 6.364L12 20.364l-7.682-7.682a4.5 4.5 0 010-6.364z"></path>
    </svg>
);

export const SunIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
    </svg>
);

export const MoonIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
    </svg>
);

export const TwitterIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M22.46 6c-.77.35-1.6.58-2.46.67.88-.53 1.56-1.37 1.88-2.38-.83.49-1.74.85-2.7 1.03A4.26 4.26 0 0016.3 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.58-.7-.02-1.37-.21-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 01-1.93.07 4.28 4.28 0 004 2.98 8.52 8.52 0 01-5.33 1.84c-.34 0-.68-.02-1.01-.06C3.14 20.27 5.22 21 7.49 21c7.79 0 12.05-6.46 12.05-12.05 0-.18 0-.36-.01-.54.83-.6 1.56-1.36 2.13-2.22z"></path></svg>
);

export const InstagramIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.012 3.584-.07 4.85c-.148 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.85-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.85 0-3.204.013-3.583.07-4.85.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.85-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.689-.073-4.948-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.79 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44 1.441-.645 1.441-1.44-.645-1.44-1.441-1.44z"></path></svg>
);

export const SpotifyIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.75 17.02c-.22.36-.66.48-1.02.26-2.92-1.78-6.55-2.18-10.82-.99-.42.12-.86-.14-.98-.56-.12-.42.14-.86.56-.98 4.67-1.29 8.7- .83 11.92 1.11.36.22.48.66.26 1.02.02-.02 0 .04 0 .14zm1.3-2.58c-.28.44-.82.58-1.26.3-3.24-1.98-8.15-2.58-11.8-1.42-.5.16-1.04-.16-1.2-.66-.16-.5.16-1.04.66-1.2 4.14-1.28 9.5- .62 13.14 1.62.44.28.58.82.3 1.26v.1zM19.4 12c-.34.54-1 .7-1.54.34C14.4 9.98 9.4 9.68 5.6 10.8c-.6.18-1.22-.2-1.4-.8-.18-.6.2-1.22.8-1.4 4.3-.12 9.82.2 13.88 2.66.54.36.7 1 .36 1.56v-.02z"></path></svg>
);

export const YoutubeIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"></path></svg>
);

export const UserEditIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
);

export const MusicNoteIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2z"></path></svg>
);

export const CurrencyDollarIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v.01M12 6v-1.5M12 9a2 2 0 00-2 2c0 1.105.895 2 2 2s2-.895 2-2c0-1.105-.895-2-2-2z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M15 11.252A4.004 4.004 0 0112 14c-2.21 0-4-1.79-4-4 0-2.21 1.79-4 4-4 1.63 0 3.06.98 3.65 2.347M12 12a2 2 0 100-4 2 2 0 000 4z"></path></svg>
);

export const GoogleIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
    <svg className={className} viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
        <path fill="#4285F4" d="M24 9.5c3.23 0 5.45 1.39 6.7 2.58l4.47-4.47C32.17 4.96 28.53 3 24 3 15.42 3 8.33 8.38 6.13 16.29l5.5 4.29C13.29 14.53 18.21 9.5 24 9.5z"></path>
        <path fill="#34A853" d="M46.13 24.5c0-1.63-.15-3.2-.42-4.7H24v8.99h12.42c-.54 2.89-2.14 5.35-4.6 6.96l5.28 4.09C42.47 36.33 46.13 31.02 46.13 24.5z"></path>
        <path fill="#FBBC05" d="M11.63 20.58C11.19 19.23 10.9 17.78 10.9 16.29s.29-2.94.73-4.29l-5.5-4.29C3.82 10.87 3 13.5 3 16.29s.82 5.42 2.13 7.58l5.5-4.29z"></path>
        <path fill="#EA4335" d="M24 45c4.53 0 8.17-1.52 10.9-4.11l-5.28-4.09c-1.52 1.03-3.48 1.64-5.62 1.64-5.79 0-10.71-5.03-12.37-11.71l-5.5 4.29C8.33 39.62 15.42 45 24 45z"></path>
        <path fill="none" d="M3 3h42v42H3z"></path>
    </svg>
);

export const LinkedInIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path></svg>
);