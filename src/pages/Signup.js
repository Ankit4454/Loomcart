import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../hooks';

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [password, setPassword] = useState('');
  const [signingUp, setSigningUp] = useState(false);
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.user) {
      navigate('/');
    }
  }, [auth.user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSigningUp(true);
    let error = false;

    if (!name || !email || !mobileNumber || !password) {
      toast.error("Please fill mandatory fields", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      error = true;
    }

    if (error) {
      return setSigningUp(false);
    }

    const response = await auth.signup(name, email, mobileNumber, password);
    if (response.success) {
      navigate('/users/signin');
      setSigningUp(false);
      setName('');
      setEmail('');
      setMobileNumber('');
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

    setSigningUp(false);
  }

  return (
    <div
      className="relative min-h-screen bg-teal-900 backdrop-blur flex justify-center items-center bg-texture bg-cover py-28 sm:py-0">
      <div className="p-4 sm:p-8 flex-1 ">
        <div className="max-w-[420px] min-w-[320px] bg-lime-50 rounded-b-3xl mx-auto">
          <div className="relative h-auto">
            <svg className="absolute -top-20 " xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
              <path fill="#f7fee7" fillOpacity="1"
                d="M0,64L48,80C96,96,192,128,288,128C384,128,480,96,576,85.3C672,75,768,85,864,122.7C960,160,1056,224,1152,245.3C1248,267,1344,245,1392,234.7L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z">
              </path>
            </svg>
          </div>
          <div className="px-10 pt-4 pb-8 rounded-3xl shadow-xl">
            <div className="mx-auto text-center">
              <h1 className="text-4xl text-gray-800">Sign Up</h1>
            </div>
            <form method="POST" autoComplete="off" onSubmit={handleSubmit}>
              <div className="mt-10 relative">
                <input id="name" name="name" type="text" value={name} onChange={(e) => setName(e.target.value)}
                  className="peer w-full px-0.5 border-0 bg-lime-50 border-b-2 border-gray-300 placeholder-transparent focus:ring-0 focus:border-teal-700 focus:outline-none"
                  placeholder="willPig@tailwind.com" required />
                <label htmlFor="name"
                  className="absolute left-0 -top-4 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-1 peer-focus:-top-4 peer-focus:text-teal-700 peer-focus:text-sm">Username</label>
              </div>
              <div className="mt-10 relative">
                <input id="email" name="email" type="text" value={email} onChange={(e) => setEmail(e.target.value)}
                  className="peer w-full px-0.5 border-0 bg-lime-50 border-b-2 border-gray-300 placeholder-transparent focus:ring-0 focus:border-teal-700 focus:outline-none"
                  placeholder="willPig@tailwind.com" required />
                <label htmlFor="email"
                  className="absolute left-0 -top-4 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-1 peer-focus:-top-4 peer-focus:text-teal-700 peer-focus:text-sm">Email</label>
              </div>
              <div className="mt-10 relative">
                <input id="mobileNumber" name="mobileNumber" type="text" value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)}
                  className="peer w-full px-0.5 border-0 bg-lime-50 border-b-2 border-gray-300 placeholder-transparent focus:ring-0 focus:border-teal-700 focus:outline-none"
                  placeholder="willPig@tailwind.com" required />
                <label htmlFor="mobileNumber"
                  className="absolute left-0 -top-4 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-1 peer-focus:-top-4 peer-focus:text-teal-700 peer-focus:text-sm">Phone number</label>
              </div>
              <div className="mt-10 relative">
                <input id="password" type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)}
                  className="peer w-full px-0.5 border-0 bg-lime-50 border-b-2 border-gray-300 placeholder-transparent focus:ring-0 focus:border-teal-700 focus:outline-none"
                  placeholder="Password" required />
                <label htmlFor="password"
                  className="absolute left-0 -top-4 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-1 peer-focus:-top-4 peer-focus:text-teal-700 peer-focus:text-sm">Password</label>
              </div>
              <button type="submit" disabled={signingUp}
                className="w-full mt-14 py-4 text-lg text-white font-semibold text-center rounded-full bg-teal-700 transition-all hover:bg-teal-800 focus:outline-none">
                {signingUp ? 'Signing Up...' : 'Sign Up'}
              </button>
              <p className="text-center text-sm text-gray-400 mt-4">Have an account ? <Link to="/users/signin"
                className="font-semibold text-teal-700 hover:underline">Sign In</Link></p>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup;