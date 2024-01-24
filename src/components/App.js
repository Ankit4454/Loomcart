import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Home, Signin, Signup, Profile, Page404, Checkout } from '../pages';
import '../styles/App.css';
import Navbar from './Navbar';
import Footer from './Footer';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (<>
    <Navbar />
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/users/signin" element={<Signin />} />
      <Route exact path="/users/signup" element={<Signup />} />
      <Route exact path="/checkout" element={<Checkout />} />
      <Route exact path="/users" element={<Profile />} />
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
