import React, { useState, useEffect } from 'react';
import Cart from '../components/Cart';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { LiaRupeeSignSolid } from "react-icons/lia";
import styles from "../styles/checkout.module.css";
import { useAuth } from '../hooks';
import { createOrder, getAddressList, getProduct } from '../api';
import Loader from '../components/Loader';
import { toast } from 'react-toastify';
import { PiPlusThin } from 'react-icons/pi';
import { useDispatch, useSelector } from 'react-redux';
import { cartSelector, emptyCart } from '../reducers/cartReducers';
import CheckoutCart from '../components/CheckoutCart';

function Checkout() {
  const auth = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector(cartSelector);
  const [loading, setLoading] = useState(true);
  const [addressList, setAddressList] = useState([]);
  const [productList, setProductList] = useState([]);
  const [cartList, setCartList] = useState([]);
  const [address, setAddress] = useState();
  const [paymentOption, setPaymentOption] = useState();
  const [cardNumber, setCardNumber] = useState('');
  const [nameOnCard, setNameOnCard] = useState('');
  const [expDate, setExpDate] = useState('');
  const [cvc, setCvc] = useState('');
  const [netBanking, setNetBanking] = useState('default');
  const [upiId, setUpiId] = useState('');
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState('Order Confirmed');
  const [user, setUser] = useState(auth.user?._id);
  const [total, setTotal] = useState(0);

  const paymentMethods = [
    {
      id: 1,
      option: 'Credit or debit card'
    },
    {
      id: 2,
      option: 'Net Banking'
    },
    {
      id: 3,
      option: 'Other UPI Apps'
    }
  ];

  const handleIncreaseQty = () => {
    const updatedList = cartList.map(item => {
      if (item._id === id) {
        return { ...item, qty: item.qty + 1 };
      }
      return item;
    });
    setCartList(updatedList);
    const transformedList = updatedList.map(cart => ({ product: cart._id, quantity: cart.qty }));
    setProductList(transformedList);
    const newTotal = updatedList.reduce((acc, cart) => {
      return acc + cart.price * cart.qty;
    }, 0);
    setTotal(newTotal);
  }

  const handleDecreaseQty = () => {
    const updatedList = cartList.map(item => {
      if (item._id === id && item.qty > 1) {
        return { ...item, qty: item.qty - 1 };
      }
      return item;
    });
    setCartList(updatedList);
    const transformedList = updatedList.map(cart => ({ product: cart._id, quantity: cart.qty }));
    setProductList(transformedList);
    const newTotal = updatedList.reduce((acc, cart) => {
      return acc + cart.price * cart.qty;
    }, 0);
    setTotal(newTotal);
  }

  const handleDeleteItem = () => {
    const updatedList = cartList.filter(item => item._id !== id);
    setCartList(updatedList);
    const transformedList = updatedList.map(cart => ({ product: cart._id, quantity: cart.qty }));
    setProductList(transformedList);
    const newTotal = updatedList.reduce((acc, cart) => {
      return acc + cart.price * cart.qty;
    }, 0);
    setTotal(newTotal);
    navigate(-1);
  }

  const handleCofirmOrder = async () => {
    setSaving(true);
    if (addressList.length === 0) {
      setSaving(false);
      return toast.error("Please add a new address", {
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

    if (productList.length === 0) {
      setSaving(false);
      return toast.error("Please add product", {
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

    if (!address || !paymentOption) {
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

    if (paymentOption === '1') {
      if (!cardNumber || !nameOnCard || !expDate || !cvc) {
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
    } else if (paymentOption === '2') {
      if (netBanking === 'default') {
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
    } else if (paymentOption === '3') {
      if (!upiId) {
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
    }

    const response = await createOrder(user, productList, address, status);

    if (response.success) {
      navigate('/users/orders');
      if (!id) {
        dispatch(emptyCart());
      }
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
          const response = await getAddressList(auth.user._id);
          if (response.success) {
            setAddressList(response.data.addressList);
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
        } else {
          navigate('/users/signin');
        }

        if (id) {
          const response = await getProduct(id);
          if (response.success) {
            const updatedList = [{ ...response.data.product, qty: 1 }];
            setCartList([{ ...response.data.product, qty: 1 }]);
            setProductList([{ product: response.data.product._id, quantity: 1 }]);

            const newTotal = updatedList.reduce((acc, cart) => {
              return acc + cart.price * cart.qty;
            }, 0);
            if (newTotal !== 0) {
              setTotal(newTotal);
            } else {
              navigate(-1);
            }
          } else {
            navigate(-1);
            return toast.error(response.message, {
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
        } else {
          const transformedList = cartItems.map(cart => ({ product: cart._id, quantity: cart.qty }));
          setProductList(transformedList);
          const newTotal = cartItems.reduce((acc, cart) => {
            return acc + cart.price * cart.qty;
          }, 0);
          if (newTotal !== 0) {
            setTotal(newTotal);
          } else {
            navigate(-1);
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [auth.user, id, navigate, cartItems]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="grid md:grid-cols-2 gap-6 lg:gap-12 items-start max-w-6xl px-10 mx-auto py-6">
      <div className="relative flex flex-col items-start">
        <div className="relative">
          <h1 className="text-2xl">Delivery address</h1>
          <form className="w-full p-4 max-w-screen-md mx-auto">
            <fieldset className="space-y-6">
              <div className="flex flex-col">
                {addressList.map((add) => {
                  const { addressLine1, addressLine2, landmark, city, state, pincode } = add;
                  const addressParts = [addressLine1, addressLine2, landmark, city, state];
                  const filteredAddressParts = addressParts.filter(part => part !== null && part !== undefined && part !== "");
                  const formattedAddress = filteredAddressParts.join(", ") + " - " + pincode;
                  return (
                    <label key={add._id} htmlFor={`address-${add._id}`} className={`relative flex flex-col bg-white p-4 rounded-lg border-2 ${address === add._id ? 'border-teal-900' : 'border-gray-400'} my-2 cursor-pointer`}>
                      <span className="text-white w-fit rounded p-1 bg-teal-900 mb-1">{add.addressType}</span>
                      <span className="text-gray-900">
                        <span className="font-bold text-md">{add.name} - {add.mobileNumber}</span>
                      </span>
                      <span>
                        <span className="text-sm text-gray-500">{formattedAddress}</span>
                      </span>
                      <input type="radio" name="address" id={`address-${add._id}`} value={add._id} onClick={(e) => setAddress(e.target.value)} className="absolute h-0 w-0 appearance-none" />
                      <span aria-hidden="true" className="hidden absolute inset-0 bg-teal-100 bg-opacity-10 rounded-lg">
                        <span className="absolute top-4 right-4 h-6 w-6 inline-flex items-center justify-center rounded-full bg-teal-900">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5 text-white">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </span>
                      </span>
                    </label>
                  )
                })}
              </div>
            </fieldset>
            <div>
              <Link to="/users/addresses" className="flex items-center font-bold text-teal-800" ><PiPlusThin className="mr-2" size={20} /> Add a new address</Link>
            </div>
          </form>
        </div>

        <div className="relative w-full">
          <h1 className="text-2xl">Payment options</h1>
          <form className="p-4 mx-auto">
            <fieldset className="space-y-6">
              <div className="flex flex-col">
                {paymentMethods.map((opt) => (
                  <label key={opt.id} htmlFor={`payment-${opt.id}`} className={`relative w-full flex flex-col bg-white p-4 rounded-lg border-2 ${paymentOption == opt.id ? 'border-teal-900' : 'border-gray-400'} my-2 cursor-pointer`}>
                    <span className="text-gray-900">
                      <span className="font-bold text-md">{opt.option}</span>
                    </span>
                    <input type="radio" name="payment" id={`payment-${opt.id}`} value={opt.id} onClick={(e) => setPaymentOption(e.target.value)} className="absolute h-0 w-0 appearance-none" />
                    <span className="hidden z-50">
                      {paymentOption === '1' && <div className="mx-auto mt-4 max-w-xl">
                        <div className="grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-2">
                          <div className="sm:col-span-2">
                            <label htmlFor="cardNumber" className="block text-sm font-semibold leading-6 text-gray-900">
                              Card number
                            </label>
                            <div>
                              <input
                                type="number"
                                name="cardNumber"
                                id="cardNumber"
                                maxLength={20}
                                value={cardNumber}
                                onChange={(e) => setCardNumber(e.target.value)}
                                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-700 sm:text-sm sm:leading-6 hide-arrow"
                              />
                            </div>
                          </div>
                          <div className="sm:col-span-2">
                            <label htmlFor="nameOnCard" className="block text-sm font-semibold leading-6 text-gray-900">
                              Name on card
                            </label>
                            <div>
                              <input
                                type="text"
                                name="nameOnCard"
                                id="nameOnCard"
                                maxLength={50}
                                value={nameOnCard}
                                onChange={(e) => setNameOnCard(e.target.value)}
                                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-700 sm:text-sm sm:leading-6"
                              />
                            </div>
                          </div>
                          <div>
                            <label htmlFor="expDate" className="block text-sm font-semibold leading-6 text-gray-900">
                              Expiry date (MM/YY)
                            </label>
                            <div>
                              <input
                                type="text"
                                name="expDate"
                                id="expDate"
                                maxLength={5}
                                value={expDate}
                                onChange={(e) => setExpDate(e.target.value)}
                                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-700 sm:text-sm sm:leading-6"
                              />
                            </div>
                          </div>
                          <div>
                            <label htmlFor="cvc" className="block text-sm font-semibold leading-6 text-gray-900">
                              CVC
                            </label>
                            <div>
                              <input
                                type="number"
                                name="cvc"
                                id="cvc"
                                maxLength={3}
                                value={cvc}
                                onChange={(e) => setCvc(e.target.value)}
                                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-700 sm:text-sm sm:leading-6 hide-arrow"
                              />
                            </div>
                          </div>
                        </div>
                      </div>}
                      {paymentOption === '2' && <div className="mx-auto mt-4 max-w-xl">
                        <div className="grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-2">
                          <div className="mt-2.5">
                            <select
                              id="netBanking"
                              name="netBanking"
                              value={netBanking}
                              onChange={(e) => setNetBanking(e.target.value)}
                              className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-teal-700 sm:max-w-xs sm:text-sm sm:leading-6"
                            >
                              <option value="default">Please select</option>
                              <option>Axis Bank</option>
                              <option>HDFC Bank</option>
                              <option>ICICI Bank</option>
                              <option>Kotak Bank</option>
                              <option>State Bank of India</option>
                            </select>
                          </div>
                        </div>
                      </div>}
                      {paymentOption === '3' && <div className="mx-auto mt-4 max-w-xl">
                        <div className="grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-2">
                          <div>
                            <label htmlFor="upiId" className="block text-sm font-semibold leading-6 text-gray-900">
                              Enter your UPI ID
                            </label>
                            <div>
                              <input
                                type="text"
                                name="upiId"
                                id="upiId"
                                maxLength={20}
                                value={upiId}
                                onChange={(e) => setUpiId(e.target.value)}
                                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-700 sm:text-sm sm:leading-6"
                              />
                            </div>
                          </div>
                          <div className="mt-6">
                            <button type="button" className="block w-fit rounded-md bg-teal-700 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-teal-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-800">Verify</button>
                          </div>
                        </div>
                      </div>}
                    </span>

                    <span aria-hidden="true" className="hidden absolute inset-0 bg-teal-100 bg-opacity-10 rounded-lg">
                      <span className="absolute top-4 right-4 h-6 w-6 inline-flex items-center justify-center rounded-full bg-teal-900">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5 text-white">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </span>
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>
          </form>
        </div>

      </div>
      <div className="relative flex flex-col items-start">
        <h1 className="text-2xl">Order summary</h1>
        <ul className="divide-y w-full p-4 divide-gray-200 max-h-[450px] overflow-y-scroll no-scrollbar">
          {id && cartList.map((cart) => (
            <CheckoutCart key={cart._id} cart={cart} handleIncreaseQty={handleIncreaseQty} handleDecreaseQty={handleDecreaseQty} handleDeleteItem={handleDeleteItem} />
          ))}
          {!id && cartItems.map((cart) => (
            <Cart key={cart._id} cart={cart} />
          ))}
        </ul>
        <div className="w-full border-t border-gray-200 p-4 sm:px-6">
          <div className="flex justify-between text-base font-medium text-gray-900">
            <p>Total</p>
            <p className="flex items-center"><LiaRupeeSignSolid /> {total}</p>
          </div>
          <div className="mt-6 w-full">
            <button
              disabled={saving}
              onClick={handleCofirmOrder}
              className="flex w-full items-center justify-center rounded-md border border-transparent bg-teal-700 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-teal-800"
            >
              {saving ? 'Confirming order...' : 'Confirm order'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout;