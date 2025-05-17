import React, { useContext, useEffect } from 'react'
import { assets } from '../assets/assets'
import axios from 'axios';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


const EmailVerify = () => {

  axios.defaults.withCredentials = true;
  const {backendurl, isloggedin, userData, getUserData } = useContext(AppContext);
  const navigate = useNavigate();

  const inputRefs = React.useRef([]);
  const handleInput = (e, index) => {
    if (e.target.value.length > 0 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  }

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && e.target.value === '' && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  }

  const handlePaste = (e) => {
    const paste = e.clipboardData.getData('text');
    const pasteArray = paste.split('');
    pasteArray.forEach((char, index) => {
      if(index < inputRefs.current.length) {
        inputRefs.current[index].value = char;
        inputRefs.current[index].focus();
      }
    })
  }

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      const otpArray = inputRefs.current.map(e => e.value);
      const otp = otpArray.join('');
      
      

      const {data} = await axios.post(backendurl + '/api/auth/verify-account', {otp});
      
      

      if (data.success) {
        toast.success(data.message);
        getUserData();
        navigate('/');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }
  
  useEffect(()=> {
    isloggedin && userData && userData.isAccountVerified && navigate('/')
  },[isloggedin, userData])
  

  return (
    <div  className="flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-yellow-500 to-purple-400">
         <img
                onClick={() => navigate('/')}
                src={assets.logo}
                alt="Logo"
                className="absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer"
              />
              <form onSubmit={onSubmitHandler} className='bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm'>
                <h1 className=' text-white text-2xl font-semibold text-center mb-4'>Email Verify OTP</h1>
                <p className=' text-center mb-6 text-indigo-400'>Enter the six digit code sent to your email.</p>
                <div className='flex justify-between mb-8'>
                  {Array(6).fill(0).map((_, index)=> (
                    <input className='w-10 h-12 bg-white text-black text-center text-lg rounded-md ' 
                    ref={e => inputRefs.current[index] = e}
                    onInput={(e) => handleInput(e, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    onPaste={handlePaste}
                    
                    type="text" maxLength='1' key={index} required />
                  ))}
                </div>
                <button className='w-full py-3 bg-yellow-800 text-white rounded-full'>Verify Email</button>
              </form>
    </div>
  )
}

export default EmailVerify