import React, { useState } from 'react';
import { User, View } from '../types';
import { CameraIcon } from './IconComponents';
import { COUNTRIES } from '../constants';

interface ProfileSettingsProps {
    user: User;
    onUpdateProfile: (updatedData: Partial<User>, newAvatarUrl?: string) => void;
    setView: (view: View) => void;
}

const FormInput: React.FC<React.InputHTMLAttributes<HTMLInputElement> & { label: string }> = ({ label, id, ...props }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-gray-300 mb-1">{label}</label>
        <input
            id={id}
            {...props}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg py-2 px-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-500"
        />
    </div>
);

const FormSelect: React.FC<React.SelectHTMLAttributes<HTMLSelectElement> & { label: string; children: React.ReactNode }> = ({ label, id, children, ...props }) => (
     <div>
        <label htmlFor={id} className="block text-sm font-medium text-gray-300 mb-1">{label}</label>
        <select
            id={id}
            {...props}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
        >
            {children}
        </select>
    </div>
);


const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="bg-gray-900 p-6 rounded-lg">
        <h2 className="text-xl font-semibold text-white border-b border-gray-800 pb-4 mb-6">{title}</h2>
        <div className="space-y-4">
            {children}
        </div>
    </div>
);

export const ProfileSettings: React.FC<ProfileSettingsProps> = ({ user, onUpdateProfile, setView }) => {
    const [formData, setFormData] = useState({
        name: user.name,
        email: user.email,
        phoneNumber: user.phoneNumber || '',
        country: user.country || COUNTRIES[0],
    });
    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [avatarFile, setAvatarFile] = useState<File | null>(null);
    const [avatarPreview, setAvatarPreview] = useState<string>(user.avatarUrl);
    const [isSaving, setIsSaving] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
    };

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setAvatarFile(file);
            setAvatarPreview(URL.createObjectURL(file));
        }
    };
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (passwordData.newPassword && passwordData.newPassword !== passwordData.confirmPassword) {
            alert("New passwords do not match.");
            return;
        }

        setIsSaving(true);
        setSuccessMessage('');

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const updatedData: Partial<User> = {};
        if (formData.name !== user.name) updatedData.name = formData.name;
        if (formData.email !== user.email) updatedData.email = formData.email;
        if (formData.phoneNumber !== (user.phoneNumber || '')) updatedData.phoneNumber = formData.phoneNumber;
        if (formData.country !== (user.country || '')) updatedData.country = formData.country;
        
        onUpdateProfile(updatedData, avatarFile ? avatarPreview : undefined);

        if (passwordData.newPassword) {
            console.log("Password changed successfully (mocked).");
            setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: ''});
        }

        setIsSaving(false);
        setSuccessMessage('Profile updated successfully!');
        setTimeout(() => setSuccessMessage(''), 3000);
    };

    const dashboardView = user.role === 'producer' ? 'producerDashboard' : 'artistDashboard';

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <button onClick={() => setView(dashboardView)} className="text-sm text-gray-400 hover:text-white mb-6">
                &larr; Back to Dashboard
            </button>
            <h1 className="text-3xl font-bold text-white mb-8">Profile Settings</h1>

            {successMessage && (
                <div className="bg-green-900/50 border border-green-700 text-green-300 px-4 py-3 rounded-lg relative mb-6" role="alert">
                    <span className="block sm:inline">{successMessage}</span>
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">
                <Section title="Profile Picture">
                    <div className="flex items-center gap-6">
                        <img src={avatarPreview} alt="Profile Avatar" className="w-24 h-24 rounded-full object-cover" />
                        <label htmlFor="avatar-upload" className="cursor-pointer bg-gray-700 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-600 transition-colors flex items-center gap-2">
                           <CameraIcon className="w-4 h-4" />
                           Change Photo
                        </label>
                        <input id="avatar-upload" type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
                    </div>
                </Section>

                <Section title="Personal Information">
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormInput label="Full Name" id="name" name="name" value={formData.name} onChange={handleFormChange} />
                        <FormInput label="Email Address" id="email" name="email" type="email" value={formData.email} onChange={handleFormChange} />
                        <FormInput label="Phone Number" id="phoneNumber" name="phoneNumber" type="tel" value={formData.phoneNumber} onChange={handleFormChange} placeholder="e.g., 555-123-4567" />
                        <FormSelect label="Country" id="country" name="country" value={formData.country} onChange={handleFormChange}>
                           {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
                        </FormSelect>
                    </div>
                </Section>
                
                <Section title="Change Password">
                    <FormInput label="Current Password" id="currentPassword" name="currentPassword" type="password" value={passwordData.currentPassword} onChange={handlePasswordChange} placeholder="••••••••" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormInput label="New Password" id="newPassword" name="newPassword" type="password" value={passwordData.newPassword} onChange={handlePasswordChange} placeholder="••••••••" />
                        <FormInput label="Confirm New Password" id="confirmPassword" name="confirmPassword" type="password" value={passwordData.confirmPassword} onChange={handlePasswordChange} placeholder="••••••••" />
                    </div>
                </Section>
                
                <div className="flex justify-end pt-4">
                     <button 
                        type="submit" 
                        disabled={isSaving}
                        className="flex items-center justify-center min-w-[120px] px-6 py-3 text-sm font-medium text-white bg-brand-500 rounded-md hover:bg-brand-600 transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed"
                    >
                         {isSaving ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                <span>Saving...</span>
                            </>
                        ) : 'Save Changes'}
                    </button>
                </div>
            </form>
        </div>
    );
};
