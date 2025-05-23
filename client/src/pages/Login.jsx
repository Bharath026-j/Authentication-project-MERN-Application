import React, { useContext, useState } from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { data } from 'react-router-dom';
import { toast } from 'react-toastify';


  

const Login = () => {
  const navigate = useNavigate();
  const { backendurl, setIsLoggedIn, getUserData } = useContext(AppContext);

  const [visible, setVisible] = useState(false);
  const [state, setState] = useState('signup');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmitHandler = async (e) => {
    try {
        e.preventDefault();
        axios.defaults.withCredentials = true;
      // let response;
      // const { data } = response;
      // console.log(response.message);
      
      if (state === 'signup') {
          const {data} = await axios.post(`${backendurl}/api/auth/register`, 
          {name, email, password});

          if (data.success) {
            setIsLoggedIn(true);
            getUserData();
            navigate('/');
          } else {
            toast.error(data.message);
          }
      } else {
        const {data} = await axios.post(`${backendurl}/api/auth/login`, {
        email, password});
        
      if (data.success) {
        setIsLoggedIn(true);
        getUserData();
        navigate('/');
      } else {
        toast.error(data.message);
      }
        }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-yellow-500 to-purple-400">
      <img
        onClick={() => navigate('/')}
        src={assets.logo}
        alt="Logo"
        className="absolute left-5 sm:left-20 top-5 w-24 sm:w-24 cursor-pointer"
      />

      <div className="bg-purple-500 p-10 rounded-lg shadow-lg w-full sm:w-96 text-black-700 text-sm hover:shadow-2xl hover:shadow-red-600 transition-all">
        <h2 className="text-3xl font-semibold text-white text-center mb-3">
          {state === 'signup' ? 'Create Account' : 'Login'}
        </h2>

        <p className="text-center text-sm mb-6">
          {state === 'signup' ? 'Create an account' : 'Login to your account'}
        </p>

        <form onSubmit={onSubmitHandler}>
          {state === 'signup' && (
            <div className="flex mb-4 items-center gap-3 w-full px-5 py-2.5 rounded-full text-white bg-[#333A5C]">
              <img src={assets.person_icon} alt="Person Icon" />
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                type="text"
                placeholder="Full Name"
                required
                className="bg-transparent outline-none"
              />
            </div>
          )}

          <div className="flex mb-4 items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
            <img src={assets.mail_icon} alt="Mail Icon" />
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              placeholder="E-mail id"
              required
              className="bg-transparent outline-none text-white"
            />
          </div>

          <div className="flex mb-4 items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C] relative">
            <img src={assets.lock_icon} alt="Lock Icon" />
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type={visible ? 'text' : 'password'}
              placeholder="Password"
              required
              className="bg-transparent outline-none text-white "
            />
            <span
        onClick={() => setVisible(!visible)}
        className='absolute right-3  cursor-pointer'
      >
        {visible ? '🙈' : '👁️'}
      </span>
          </div>

          <p
            onClick={() => navigate('/resetpassword')}
            className="mb-6 text-indigo-900 cursor-pointer"
          >
            Forgot Password
          </p>

          <button
            type="submit"
            className="w-full rounded-full py-2.5 bg-gradient-to-r from-indigo-500 to-indigo-900 text-white font-medium"
          >
            {state === 'signup' ? 'Sign Up' : 'Login'}
          </button>
        </form>

        {state === 'signup' ? (
          <p className="text-gray-900 text-center text-xs mt-4">
            Already have an account?{' '}
            <span
              onClick={() => setState('login')}
              className="text-blue-300 cursor-pointer underline"
            >
              Login here
            </span>
          </p>
        ) : (
          <p className="text-gray-900 text-center text-xs mt-4">
            Don’t have an account?{' '}
            <span
              onClick={() => setState('signup')}
              className="text-blue-400 cursor-pointer underline"
            >
              Sign Up
            </span>
          </p>
        )}
      </div>
    </div>
  );
};

export default Login;
