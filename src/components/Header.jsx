import Logo from '../img/logo.png'
import Avatar from '../img/avatar.png'
import { MdShoppingBasket, MdAdd, MdLogout } from 'react-icons/md'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { app } from '../firebase.config'
import { useStateValue } from '../context/StateProvider'
import { actionType } from '../context/reducer'
import { useState } from 'react'

const Header = () => {
  const [{ user, cartShow, cartItems }, dispatch] = useStateValue()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const firebaseAuth = getAuth(app)
  const provider = new GoogleAuthProvider()

  const handleSignIn = async () => {
    if (!user) {
      const {
        user: { providerData }
      } = await signInWithPopup(firebaseAuth, provider)
      dispatch({
        type: actionType.SET_USER,
        user: providerData[0]
      })
      localStorage.setItem('user', JSON.stringify(providerData[0]))
    } else {
      setIsMenuOpen(!isMenuOpen)
    }
  }

  const handleSignOut = () => {
    dispatch({
      type: actionType.SET_USER,
      user: null
    })
    localStorage.clear()
    setIsMenuOpen(false)
  }

  const handleShowCart = () => {
    dispatch({
      type: actionType.SET_CART_SHOW,
      cartShow: !cartShow
    })
  }

  return (
    <header className='fixed z-50 w-screen  p-3 px-4 md:p-3 md:px-16 bg-primary'>
      {/* //Desrtop & table */}
      <motion.div
        initial={{ opacity: 0, x: 200 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 200 }}
        className='hidden md:flex w-full h-full items-center justify-between'
      >
        <Link to='/' className='flex items-center gap-2'>
          <img className='w-10 object-cover' src={Logo} alt='Logo' />
          <p className='text-headingColor text-x font-bold'>City</p>
        </Link>
        <div className='flex items-center gap-3'>
          <ul className='flex items-center gap-8 '>
            <li
              className='text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer'
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </li>
            <li
              className='text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer'
              onClick={() => setIsMenuOpen(false)}
            >
              Menu
            </li>
            <li
              className='text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer'
              onClick={() => setIsMenuOpen(false)}
            >
              About Us
            </li>
            <li
              className='text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer'
              onClick={() => setIsMenuOpen(false)}
            >
              Service
            </li>
          </ul>
          <motion.div
            whileTap={{ scale: 0.9 }}
            className='relative flex items-center justify-center'
            onClick={handleShowCart}
          >
            <MdShoppingBasket className='text-textColor text-2xl ml-8 cursor-pointer hover:text-headingColor' />
            {cartItems && cartItems.length > 0 && (
              <div className=' absolute -top-2 -right-2 w-6 h-6 rounded-full bg-cartNumbg flex items-center justify-center'>
                <p className='text-xs text-white font-semibold'>
                  {cartItems.length}
                </p>
              </div>
            )}
          </motion.div>
          <div className='relative'>
            <motion.img
              whileTap={{ scale: 0.6 }}
              className='w-10 min-w-[40px] h-10 min-h-[40px] cursor-pointer drop-shadow-xl rounded-full'
              src={user ? user.photoURL : Avatar}
              alt='UserProfile'
              onClick={handleSignIn}
            />
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                className='w-40 bg-gray-50 shadow-xl rounded-lg flex flex-col absolute top-12 right-0'
              >
                {user && user.email === 'josimarvictoria968@gmail.com' && (
                  <Link to='/create'>
                    <p
                      className='px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-200 transition-all duration-100 ease-in-out text-textColor text-base'
                      onClick={() => setIsMenuOpen(false)}
                    >
                      New item <MdAdd />
                    </p>
                  </Link>
                )}

                <p
                  onClick={handleSignOut}
                  className='px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-200 transition-all duration-100 ease-in-out text-textColor text-base'
                >
                  Logout <MdLogout />
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Movil */}
      <div className='flex items-center justify-between md:hidden w-full h-full '>
        <Link to='/shoppin'>
          <motion.div
            className='relative flex items-center justify-center'
            onClick={handleShowCart}
          >
            <MdShoppingBasket className='text-textColor text-2xl ml-8 cursor-pointer hover:text-headingColor' />
            {cartItems && cartItems.length > 0 && (
              <div className=' absolute -top-2 -right-2 w-6 h-6 rounded-full bg-cartNumbg flex items-center justify-center'>
                <p className='text-xs text-white font-semibold'>
                  {cartItems.length}
                </p>
              </div>
            )}
          </motion.div>
        </Link>

        <Link to='/' className='flex items-center gap-2'>
          <img className='w-10 object-cover' src={Logo} alt='Logo' />
          <p className='text-headingColor text-x font-bold'>City</p>
        </Link>

        <div className='relative'>
          <motion.img
            whileTap={{ scale: 0.6 }}
            className='w-10 min-w-[40px] h-10 min-h-[40px] cursor-pointer drop-shadow-xl rounded-full'
            src={user ? user.photoURL : Avatar}
            alt='UserProfile'
            onClick={handleSignIn}
          />
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              className='w-40 bg-gray-50 shadow-xl rounded-lg flex flex-col absolute top-12 right-0'
            >
              {user && user.email === 'josimarvictoria968@gmail.com' && (
                <Link to='/create'>
                  <p
                    className='px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base'
                    onClick={() => setIsMenuOpen(false)}
                  >
                    New item <MdAdd />
                  </p>
                </Link>
              )}
              <ul className='flex flex-col'>
                <li
                  className='text-base  px-4 py-2 text-textColor hover:bg-slate-100 duration-100 transition-all ease-in-out cursor-pointer'
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </li>
                <li
                  className='text-base  px-4 py-2 text-textColor hover:bg-slate-100 duration-100 transition-all ease-in-out cursor-pointer'
                  onClick={() => setIsMenuOpen(false)}
                >
                  Menu
                </li>
                <li
                  className='text-base  px-4 py-2 text-textColor hover:bg-slate-100 duration-100 transition-all ease-in-out cursor-pointer'
                  onClick={() => setIsMenuOpen(false)}
                >
                  About Us
                </li>
                <li
                  className='text-base  px-4 py-2 text-textColor hover:bg-slate-100 duration-100 transition-all ease-in-out cursor-pointer'
                  onClick={() => setIsMenuOpen(false)}
                >
                  Service
                </li>
              </ul>

              <p
                onClick={handleSignOut}
                className='m-2 p-2 rounded-md shadow-md flex items-center justify-center bg-gray-200 gap-3 cursor-pointer hover:bg-gray-300 transition-all duration-100 ease-in-out text-textColor text-base'
              >
                Logout <MdLogout />
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header
