import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from "../hooks";
import { toast } from 'react-toastify';
import { createAddress, updateAddress, getAddress } from '../api';
import Loader from '../components/Loader';

function EditAddress() {
    const auth = useAuth();
    const [addressId, setAddressId] = useState();
    const [userId, setUserId] = useState(auth.user?._id);
    const [name, setName] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [pincode, setPincode] = useState('');
    const [addressLine1, setAddressLine1] = useState('');
    const [addressLine2, setAddressLine2] = useState('');
    const [landmark, setLandmark] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [addressType, setAddressType] = useState('Home');
    const [saving, setSaving] = useState(false);
    const [loading, setLoading] = useState(true);
    const [isUpdate, setIsUpdate] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);

        if (!name || !mobileNumber || !mobileNumber || !pincode || !addressLine1 || !addressLine2 || !city || !state || !addressType) {
            setSaving(false);
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

        const method = isUpdate ? updateAddress(addressId, name, mobileNumber, pincode, addressLine1, addressLine2, landmark, city, state, addressType) : createAddress(userId, name, mobileNumber, pincode, addressLine1, addressLine2, landmark, city, state, addressType)
        const response = await method;

        if (response.success) {
            setName('');
            setMobileNumber('');
            setPincode('');
            setAddressLine1('');
            setAddressLine2('');
            setLandmark('');
            setCity('');
            setState('');
            setAddressType('Home');
            navigate('/users/addresses');
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
        setSaving(false);
    }

    useEffect(() => {
        async function fetchData() {
            try {
                if (auth.user) {
                    if (id) {
                        setIsUpdate(true);
                        const response = await getAddress(id);
                        if (response.success) {
                            const address = response.data.address;
                            setAddressId(address._id);
                            setName(address.name);
                            setMobileNumber(address.mobileNumber);
                            setPincode(address.pincode);
                            setAddressLine1(address.addressLine1);
                            setAddressLine2(address.addressLine2);
                            setLandmark(address.landmark);
                            setCity(address.city);
                            setState(address.state);
                            setAddressType(address.addressType);
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
                    }
                } else {
                    navigate('/');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [auth.user, navigate, id]);

    if (loading) {
        return <Loader />;
    }

    return (
        <div className="relative min-h-screen bg-white backdrop-blur bg-texture bg-cover px-10">
            <div className="mx-auto max-w-2xl text-center">
                <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">Add a new address</h2>
            </div>
            <form method="POST" className="mx-auto mt-4 max-w-xl" onSubmit={handleSubmit}>
                <input
                    type="hidden"
                    name="user"
                    id="user"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                />
                <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                    <div>
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
                    <div>
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
                                onChange={(e) => setMobileNumber(e.target.value)}
                                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-700 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    <div className="sm:col-span-2">
                        <label htmlFor="addressLine1" className="block text-sm font-semibold leading-6 text-gray-900">
                            Flat, House no., Building, Company, Apartment
                        </label>
                        <div className="mt-2.5">
                            <input
                                type="text"
                                name="addressLine1"
                                id="addressLine1"
                                autoComplete="addressLine1"
                                maxLength={100}
                                value={addressLine1}
                                onChange={(e) => setAddressLine1(e.target.value)}
                                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-700 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    <div className="sm:col-span-2">
                        <label htmlFor="addressLine2" className="block text-sm font-semibold leading-6 text-gray-900">
                            Area, Street, Sector, Village
                        </label>
                        <div className="mt-2.5">
                            <input
                                type="text"
                                name="addressLine2"
                                id="addressLine2"
                                autoComplete="addressLine2"
                                maxLength={100}
                                value={addressLine2}
                                onChange={(e) => setAddressLine2(e.target.value)}
                                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-700 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="landmark" className="block text-sm font-semibold leading-6 text-gray-900">
                            Landmark
                        </label>
                        <div className="mt-2.5">
                            <input
                                type="text"
                                name="landmark"
                                id="landmark"
                                autoComplete="landmark"
                                maxLength={50}
                                value={landmark}
                                onChange={(e) => setLandmark(e.target.value)}
                                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-700 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="pincode" className="block text-sm font-semibold leading-6 text-gray-900">
                            Pincode
                        </label>
                        <div className="mt-2.5">
                            <input
                                type="number"
                                name="pincode"
                                id="pincode"
                                autoComplete="pincode"
                                maxLength={6}
                                value={pincode}
                                onChange={(e) => setPincode(e.target.value)}
                                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-700 sm:text-sm sm:leading-6 hide-arrow"
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="city" className="block text-sm font-semibold leading-6 text-gray-900">
                            Town/City
                        </label>
                        <div className="mt-2.5">
                            <input
                                type="text"
                                name="city"
                                id="city"
                                autoComplete="city"
                                maxLength={50}
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-700 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="state" className="block text-sm font-semibold leading-6 text-gray-900">
                            State
                        </label>
                        <div className="mt-2.5">
                            <input
                                type="text"
                                name="state"
                                id="state"
                                autoComplete="state"
                                maxLength={50}
                                value={state}
                                onChange={(e) => setState(e.target.value)}
                                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-700 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    <div className="sm:col-span-2">
                        <label className="block text-sm font-semibold leading-6 text-gray-900">
                            Address Type
                        </label>
                        <div className="grid w-full mt-2.5 grid-cols-3 gap-2 rounded-xl bg-gray-300 p-2">
                            <div>
                                <input type="radio" name="addressType" id="Home" value="Home" onClick={(e) => setAddressType(e.target.value)} className="peer hidden" defaultChecked={addressType === 'Home'} />
                                <label htmlFor="Home" className="block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-teal-700 peer-checked:font-bold peer-checked:text-white">Home</label>
                            </div>

                            <div>
                                <input type="radio" name="addressType" id="Work" value="Work" onClick={(e) => setAddressType(e.target.value)} className="peer hidden" defaultChecked={addressType === 'Work'} />
                                <label htmlFor="Work" className="block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-teal-700 peer-checked:font-bold peer-checked:text-white">Work</label>
                            </div>

                            <div>
                                <input type="radio" name="addressType" id="Friend" value="Friend" onClick={(e) => setAddressType(e.target.value)} className="peer hidden" defaultChecked={addressType === 'Friend'} />
                                <label htmlFor="Friend" className="block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-teal-700 peer-checked:font-bold peer-checked:text-white">Friend</label>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-10">
                    <button
                        type="submit"
                        disabled={saving}
                        className="block w-full rounded-md bg-teal-700 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-teal-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-800"
                    >
                        {saving ? isUpdate ? 'Updating address...' : 'Adding address...' : isUpdate ? 'Update Address' : 'Add address'}
                    </button>
                </div>
            </form>
        </div>
    )
}

export default EditAddress;