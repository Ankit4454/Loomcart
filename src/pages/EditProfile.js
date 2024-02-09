import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../hooks";
import { toast } from 'react-toastify';

function EditProfile() {
  const auth = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [updating, setUpdating] = useState(false);
  const [edit, setEdit] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);

    if (!name || !email || !mobileNumber) {
      setUpdating(false);
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

    const response = await auth.updateUser(auth.user._id, name, email, mobileNumber);

    if (response.success) {
      setName('');
      setEmail('');
      setMobileNumber('');
      navigate('/users/edit');
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
    setUpdating(false);
  }

  useEffect(() => {
    if (auth.user) {
      setName(auth.user.name || '');
      setEmail(auth.user.email || '');
      setMobileNumber(auth.user.mobileNumber || '');
    } else {
      navigate('/');
    }
  }, [auth.user, navigate]);

  return (
    <div className="relative min-h-screen bg-white backdrop-blur bg-texture bg-cover px-10">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">Your Profile</h2>
      </div>
      {!edit && <div className="mx-auto mt-4 max-w-xl">
        <div className="mt-6 border-gray-100">
          <dl className="divide-y divide-gray-100">
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">Name</dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{auth.user?.name}</dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">Email address</dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{auth.user?.email}</dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">Mobile number</dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{auth.user?.mobileNumber}</dd>
            </div>
          </dl>
        </div>
        <div className="flex items-center justify-between w-full">
          <button type="button" className="hidden w-1/2 mr-2 text-center lg:inline-block py-2 px-6 bg-teal-700 hover:bg-teal-800 text-sm text-white font-bold rounded-xl transition duration-200"
            onClick={() => setEdit(true)}>Edit</button>
          <button type="button" className="hidden w-1/2 text-center lg:inline-block py-2 px-6 bg-teal-700 hover:bg-teal-800 text-sm text-white font-bold rounded-xl transition duration-200"
            onClick={auth.logout}>Logout</button>
        </div>
      </div>}
      {edit && <form action="#" method="POST" className="mx-auto mt-4 max-w-xl">
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label htmlFor="name" className="block text-sm font-semibold leading-6 text-gray-900">
              Name
            </label>
            <div className="mt-2.5">
              <input
                type="text"
                name="name"
                id="name"
                autoComplete="name"
                maxLength={50}
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-700 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="email" className="block text-sm font-semibold leading-6 text-gray-900">
              Email
            </label>
            <div className="mt-2.5">
              <input
                type="email"
                name="email"
                id="email"
                autoComplete="email"
                maxLength={20}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-700 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="mobileNumber" className="block text-sm font-semibold leading-6 text-gray-900">
              Mobile number
            </label>
            <div className="mt-2.5">
              <input
                type="text"
                name="mobileNumber"
                id="mobileNumber"
                autoComplete="mobileNumber"
                maxLength={20}
                value={mobileNumber}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-700 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
        </div>

        <div className="mt-10">
          <div className="flex items-center justify-between w-full">
            <button type="submit" disabled={updating}
              className="w-1/2 mr-2 text-center lg:inline-block py-2 px-6 bg-teal-700 hover:bg-teal-800 text-sm text-white font-bold rounded-xl transition duration-200"
              onClick={handleSubmit}>{updating ? 'Updating...' : 'Update'}</button>
            <button type="button" className="hidden w-1/2 text-center lg:inline-block py-2 px-6 bg-teal-700 hover:bg-teal-800 text-sm text-white font-bold rounded-xl transition duration-200"
              onClick={() => setEdit(false)}> Back</button>
          </div>
        </div>
      </form>}
    </div>
  )
}

export default EditProfile;