import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext'


const Navbar = () => {
  const {user, logOut} = UserAuth();
  const navigate = useNavigate();

  const handleLogout = async()=>{
    try {
      await logOut()
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className='flex items-center justify-between p-3 z-[300] w-full absolute'>
      <Link  to='/'>
        <h1 className='text-red-600 text-4xl font-bold cursor-pointer w-full h-auto relative z-0 rounded-lg transition-all duration-300 hover:scale-110'>FilmWorld</h1>
      </Link>
        {user?.email ? (
          <div>
          <Link to='/account'>
            <button className='text-white pr-4 transition-all duration-300 hover:scale-110'>Account</button>
          </Link>
            <button onClick={handleLogout} className='bg-red-600 px-6 py-2 rounded cursor-pointer text-white transition-all duration-300 hover:scale-110'>Log Out</button>
        </div>
        ) :(
          <div className='pr-4'>
          <Link to='/login'>
            <button className='py-2 px-5 ml-4 text-white transition-all duration-300 hover:scale-150'>Sign In</button>
          </Link>
          <Link to='/signup'>
            <button className='bg-red-600 px-6 py-2 rounded cursor-pointer text-white transition-all duration-300 hover:scale-150'>Sign Up</button>
          </Link>
        </div>
        )}
    </div>
  )
}

export default Navbar