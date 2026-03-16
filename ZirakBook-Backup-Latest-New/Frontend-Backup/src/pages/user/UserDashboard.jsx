import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldAlert, ArrowLeft } from 'lucide-react';

const UserDashboard = () => {

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <div className="App-bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
                <div className="flex justify-center mb-6">
                    <ShieldAlert size={64} className="text-red-500" />
                </div>
                <h1 className="text-2xl font-bold text-gray-800 mb-2">Access Denied</h1>
                <p className="text-gray-600 mb-6">
                    You are unauthorized to access the company dashboard. Please contact your administrator if you believe this is an error.
                </p>
                <button
                    onClick={handleLogout}
                    className="flex items-center justify-center w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-300"
                >
                    <ArrowLeft size={18} className="mr-2" />
                    Back to Login
                </button>
            </div>
        </div>
    );
};

export default UserDashboard;
