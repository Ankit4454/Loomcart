import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Home, Signin, Signup, Profile, Page404, Checkout, Address, EditProfile, Order, Wishlist, EditAddress, Product, EditProduct, ProductDtls, Deals, WhatsNew, SearchProduct, Category } from '../pages';
import '../styles/App.css';
import Navbar from './Navbar';
import Footer from './Footer';
import 'react-toastify/dist/ReactToastify.css';
import CartSidebar from './CartSidebar';
import { useState } from 'react';

function App() {
  const [open, setOpen] = useState(false);

  const toggleCartBtn = () => {
    setOpen(!open);
  }

  return (<>
    <Navbar toggleCartBtn={toggleCartBtn} />
    <CartSidebar open={open} toggleCartBtn={toggleCartBtn} />
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/users/signin" element={<Signin />} />
      <Route exact path="/users/signup" element={<Signup />} />
      <Route exact path="/deals" element={<Deals />} />
      <Route exact path="/whatsnew" element={<WhatsNew />} />
      <Route exact path="/checkout/:id?" element={<Checkout />} />
      <Route exact path="/users" element={<Profile />} />
      <Route exact path="/users/addresses" element={<Address />} />
      <Route exact path="/users/addresses/edit/:id?" element={<EditAddress />} />
      <Route exact path="/users/edit" element={<EditProfile />} />
      <Route exact path="/users/orders" element={<Order />} />
      <Route exact path="/users/wishlist" element={<Wishlist />} />
      <Route exact path="/users/product" element={<Product />} />
      <Route exact path="/users/product/edit/:id?" element={<EditProduct />} />
      <Route exact path="/products/:id" element={<ProductDtls />} />
      <Route exact path="/search/:string" element={<SearchProduct />} />
      <Route exact path="/category/:string" element={<Category />} />
      <Route path="*" element={<Page404 />} />
    </Routes>
    <ToastContainer position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light" />
    <Footer />
  </>
  );
}

export default App;
