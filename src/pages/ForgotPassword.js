import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { sendResetPasswordLink } from '../api';

function ForgotPassword() {
    const auth = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [send, setSend] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSend(true);

        if (!email) {
            return toast.error("Please fill mandatory fields", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }

        const response = await sendResetPasswordLink(email);

        if (response.success) {
            setEmail('');
            toast.success(response.message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        } else {
            toast.error(response.message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
        setSend(false);
    }

    useEffect(() => {
        if (auth.user) {
            navigate('/');
        }
    }, [auth.user, navigate]);

    return (
        <div
            className="relative min-h-screen bg-teal-900 backdrop-blur flex justify-center items-center bg-texture bg-cover py-28 sm:py-0">
            <div className="p-4 sm:p-8 flex-1 ">
                <div className="max-w-[420px] min-w-[320px] bg-white rounded-b-3xl mx-auto">
                    <div className="relative h-auto">
                        <svg className="absolute -top-20 " xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                            <path fill="#fff" fillOpacity="1"
                                d="M0,64L48,80C96,96,192,128,288,128C384,128,480,96,576,85.3C672,75,768,85,864,122.7C960,160,1056,224,1152,245.3C1248,267,1344,245,1392,234.7L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z">
                            </path>
                        </svg>
                    </div>
                    <div className="px-10 pt-4 pb-8 rounded-3xl shadow-xl">
                        <div className="mx-auto text-center">
                            <h1 className="text-4xl text-gray-800">Forgot Password</h1>
                        </div>
                        <form method="POST" autoComplete="off" onSubmit={handleSubmit}>
                            <div className="mt-10 relative">
                                <input id="email" name="email" type="text"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="peer w-full px-0.5 border-0 border-b-2 border-gray-300 placeholder-transparent focus:ring-0 focus:border-teal-700 focus:outline-none"
                                    placeholder="willPig@tailwind.com" required />
                                <label for="email"
                                    className="absolute left-0 -top-4 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-1 peer-focus:-top-4 peer-focus:text-teal-700 peer-focus:text-sm">Email</label>
                            </div>
                            <p className="text-sm text-gray-400 mt-4"><strong>Note:</strong> An email will be sent to this email address where a password reset link will be provided. Please follow that link to reset your account's password.</p>
                            <button type="submit" disabled={send}
                                className="w-full mt-8 py-4 text-lg text-white font-semibold text-center rounded-full bg-teal-700 transition-all hover:bg-teal-800 focus:outline-none">
                                {send ? 'Sending...' : 'Send'}
                            </button>
                            <Link to="/users/signin" class="flex items-center justify-center mt-4 text-sm font-semibold text-teal-700 hover:underline">Back to Sign In</Link>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword;