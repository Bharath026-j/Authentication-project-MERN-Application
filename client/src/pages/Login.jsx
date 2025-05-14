import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext';
// import axios from 'axios';

const Login = () => {

    const navigate = useNavigate();

    // const {backendurl , setIsLoggedIn} = useContext(AppContext);

    const [state , setState] = useState('sign up')
    const [name , setName ] = useState('')
    const [email , setEmail ] = useState('')
    const [password , setPassword ] = useState('')

    const onSubmitHandler = async (e) => {
        try {
            e.preventDefault()
            axios.defaults.withCredentials = true;


            if(state === 'sign up'){
                const {data} = await axios.post(backendurl + '/api/user/register', {
                    
                    name,
                    email,
                    password
                })
                if(data.status === 'success'){
                    setIsLoggedIn(true);
                    navigate('/')
            }else{
                console.log(data.message);
            }
        } 
        }catch (error) {
            console.log(error);
            
        }
    }

    return (
    <div className='flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-blue-200 to-purple-400'>
        <img onClick={()=>navigate('/')} src={assets.logo} alt="" className='absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer'/>
        <div className='bg-slate-900 p-10 rounded-lg shadow-lg w-full sm:w-96 text-indigo-300 text-sm'>
            <h2 className='text-3xl font-semibold text-white text-center mb-3'>
                {state === 'sign up' ? 'Create Account' : 'Login'}
            </h2>
            <p className='text-center text-sm mb-6'>{state === 'sign up' ? 'Create an account' : 'Login to your account'}</p>
            <form onSubmit={onSubmitHandler} >

                {state === 'sign up' && (
                    <div className='flex mb-4 items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]'>
                    <img src={assets.person_icon} alt="" />
                    <input onChange={e=> setName(e.target.value)}
                    value={name} 
                    type="text" 
                    placeholder='Full Name' 
                    required className='bg-transparent outline-none ' />
                </div>
                )}
                
                <div className='flex mb-4 items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]'>
                    <img src={assets.mail_icon} alt="" />
                    <input 
                    onChange={e=> setEmail(e.target.value)}
                    value={email}
                    type="email" placeholder='E-mail id' required className='bg-transparent outline-none ' />
                </div>
                <div className='flex mb-4 items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]'>
                    <img src={assets.lock_icon} alt="" />
                    <input 
                    onChange={e=> setPassword(e.target.value)}
                    value={password}
                    type="password" placeholder='Password' required className='bg-transparent outline-none ' />
                </div>

                <p 
                onClick={()=>navigate('/ResetPassword')}
                className='mb-6 text-indigo-500 cursor-pointer '>Forgot Password</p>
                <button className='w-full rounded-full py-2.5 bg-gradient-to-r from-indigo-500 to-indigo-900 text-white font-medium'>
                {state}
                </button>
            </form>

            {state === 'sign up' ? (<p className='text-gray-400 text-center text-xs mt-4'>Already have an Account? {' '}
                <span onClick={()=>setState('Login')} className='text-blue-400 cursor-pointer underline'> Login here</span>
            </p>) : (<p className='text-gray-400 text-center text-xs mt-4'>Don't have an Account? {' '}
                <span onClick={()=>setState('sign up')} className='text-blue-400 cursor-pointer underline'> Sign Up</span>
            </p>
        )}
            
            
        </div>
    </div>
  )
}

export default Login