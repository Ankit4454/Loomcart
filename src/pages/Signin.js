import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks';
import { toast } from 'react-toastify';

function Signin() {
  const [emailOrMobileNumber, setEmailOrMobileNumber] = useState('');
  const [password, setPassword] = useState('');
  const [signingIn, setSigningIn] = useState(false);
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.user) {
      navigate('/');
    }
  }, [auth.user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSigningIn(true);
    if (!emailOrMobileNumber || !password) {
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

    const response = await auth.login(emailOrMobileNumber, password);

    if (response.success) {
      navigate('/');
      setEmailOrMobileNumber('');
      setPassword('');
      return toast.success(response.message, {
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
    setSigningIn(false);
}

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
            <h1 className="text-4xl text-gray-800">Sign In</h1>
          </div>
          <form method="POST" autoComplete="off" onSubmit={handleSubmit}>
            <div className="mt-10 relative">
              <input id="emailOrMobileNumber" name="emailOrMobileNumber" type="text" maxLength={50} value={emailOrMobileNumber} onChange={(e) => setEmailOrMobileNumber(e.target.value)}
                className="peer w-full px-0.5 border-0 bg-white border-b-2 border-gray-300 placeholder-transparent focus:ring-0 focus:border-teal-700 focus:outline-none"
                placeholder="willPig@tailwind.com" required />
              <label htmlFor="emailOrMobileNumber"
                className="absolute left-0 -top-4 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-1 peer-focus:-top-4 peer-focus:text-teal-700 peer-focus:text-sm">Email or mobile number</label>
            </div>
            <div className="mt-10 relative">
              <input id="password" type="password" name="password" maxLength={50} value={password} onChange={(e) => setPassword(e.target.value)}
                className="peer w-full px-0.5 border-0 bg-white border-b-2 border-gray-300 placeholder-transparent focus:ring-0 focus:border-teal-700 focus:outline-none"
                placeholder="Password" required />
              <label htmlFor="password"
                className="absolute left-0 -top-4 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-1 peer-focus:-top-4 peer-focus:text-teal-700 peer-focus:text-sm">Password</label>
            </div>
            <Link to="/users/forgot-password" className="flex items-center justify-end text-sm font-semibold text-teal-700 hover:underline mt-4">Forgot password?</Link>
            <button type="submit" disabled={signingIn}
              className="w-full mt-8 py-4 text-lg text-white font-semibold text-center rounded-full bg-teal-700 transition-all hover:bg-teal-800 focus:outline-none">
                {signingIn ? 'Signing In...' : 'Sign In'}
              </button>
            <p className="text-center text-sm text-gray-400 mt-4">Don't have an account ? <Link to="/users/signup"
              className="font-semibold text-teal-700 hover:underline">Sign Up</Link></p>
          </form>
        </div>
      </div>
    </div>
  </div>
)
}

export default Signin;