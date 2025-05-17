import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';
import axios from 'axios';

const ResetPassword = () => {

  const {backendurl} = useContext(AppContext)
  axios.defaults.withCredentials = true;

  const navigate = useNavigate();
  const [email , setEmail] = useState('')
  const [newPassword , setNewPassword] = useState('')
  const [isEmailSent, setIsEmailSent] = useState('')
  const [otp, setOtp] = useState(0)
  const [isOtpSubmitted, setIsOtpSubmitted] = useState(false)

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

    const onSubmitEmail = async (e)=>{
      e.preventDefault();
      try {
        const {data} = await axios.post(backendurl + '/api/auth/send-reset-otp' , {email})
        data.success ? toast.success(data.message) : toast.error(data.message);
        data.success && setIsEmailSent(true);
      } catch (error) {
        toast.error(error.message);
      }
    }

    const onSubmitOtp = async (e)=>{
      e.preventDefault();
      const otpArray = inputRefs.current.map(e => e.value);
      setOtp(otpArray.join(''));
      setIsOtpSubmitted(true);
      
    }

    const onSubmitNewPassword = async (e)=>{
      e.preventDefault();
      try {
        const {data} = await axios.post(backendurl + '/api/auth/reset-password', {email , otp , newPassword})
        data.success ? toast.success(data.message) : toast.error(data.message);
        data.success && navigate('/login');
      } catch (error) {
        toast.error(error.message);
      }
    }


  return (
    <div className="flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-yellow-500 to-purple-400">
        <img
          onClick={() => navigate('/')}
          src={assets.logo}
          alt="Logo"
          className="absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer"
        /> 
        {/* Enter Emial ID */}

      {!isEmailSent && 

        <form onSubmit={onSubmitEmail} className='bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm'>
        <h1 className=' text-white text-2xl font-semibold text-center mb-4'>Reset Password</h1>
        <p className=' text-center mb-6 text-indigo-400'>Enter your registered email address</p>
          <div className='flex mb-4 items-center gap-3 w-full px-5 py-2.5 rounded-full text-white bg-[#333A5C]'>
            <img src={assets.mail_icon} alt="mail" className='w-3 h-3'/>
            <input type="email" placeholder='email address' value={email} 
            onChange={e => setEmail(e.target.value)} 
            className='outline-none bg-transparent'/>
          </div>
          <button className='w-full py-3 bg-gradient-to-r from-pink-600 to-pink-400 text-white rounded-full'> Submit</button>
        </form>
}
        {/* Enter OTP */}

    {!isOtpSubmitted && isEmailSent && 
        <form onSubmit={onSubmitOtp}  className='bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm'>
                <h1 className=' text-white text-2xl font-semibold text-center mb-4'>Reset password OTP</h1>
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
                <button className='w-full py-2.5 bg-gradient-to-r from-pink-600 to-pink-400 text-white rounded-full'>Submit</button>
              </form>
          }
              {/* //Enter New password */}

{isOtpSubmitted && isEmailSent && 
        <form onSubmit={onSubmitNewPassword} className='bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm'>
        <h1 className=' text-white text-2xl font-semibold text-center mb-4'>New Password</h1>
        <p className=' text-center mb-6 text-indigo-400'>Enter the new password</p>
          <div className='flex mb-4 items-center gap-3 w-full px-5 py-2.5 rounded-full text-white bg-[#333A5C]'>
            <img src={assets.lock_icon} alt="mail" className='w-3 h-3'/>
            <input type="password" placeholder='New password' value={newPassword} 
            onChange={e => setNewPassword(e.target.value)} 
            className='outline-none bg-transparent'/>
          </div>
          <button className='w-full py-3 bg-gradient-to-r from-pink-600 to-pink-400 text-white rounded-full'> Submit</button>
        </form>
}
    </div>
  )
}

export default ResetPassword