import React, { useEffect, useState } from 'react'
import { MdOutlineKeyboardBackspace } from 'react-icons/md'
import { RiRefreshFill } from 'react-icons/ri'
import { motion } from 'framer-motion'
import { useStateValue } from '../context/StateProvider'
import { actionType } from '../context/reducer'
import EmptyCart from '../img/emptyCart.svg'
import { Link } from 'react-router-dom'
import CartItems from './CartItems'

const CartContainer = () => {
  const [{ cartShow, cartItems, user }, dispatch] = useStateValue()
  const [tot, setTot] = useState()

  const handleShowCart = () => {
    dispatch({
      type: actionType.SET_CART_SHOW,
      cartShow: !cartShow
    })
  }

  useEffect(() => {
    let tatalPrice = cartItems.reduce(function (acc, item) {
      return acc + item.qty * item.price
    }, 0)
    setTot(tatalPrice)
  }, [cartItems])

  const handleRefresh = () => {
    dispatch({
      type: actionType.SET_CART_ITEMS,
      cartItems: []
    })

    localStorage.setItem('cartItems', JSON.stringify([]))
  }
  return (
    <motion.div
      initial={{ opacity: 0, x: 200 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 200 }}
      className='fixed w-ful top-0 right-0 md:w-375 h-screen bg-white drop-shadow-md flex flex-col z-[101]'
    >
      <div className='w-full flex items-center justify-between p-4 '>
        <motion.div whileTap={{ scale: 0.75 }} onClick={handleShowCart}>
          <MdOutlineKeyboardBackspace className='text-2xl text-headingColor cursor-pointer' />
        </motion.div>
        <p className='text-textColor text-3xl font-semibold'>Cart</p>
        <motion.p whileTap={{ scale: 0.75 }} onClick={handleRefresh}>
          <p className='flex items-center gap-2 p-1 my-2 bg-gray-100 rounded-md hover:shadow-md duration-100 ease-in-out transition-all cursor-pointer text-textColor'>
            Clear <RiRefreshFill />{' '}
          </p>
        </motion.p>
      </div>
      {/* Bottom section */}
      {cartItems && cartItems.length > 0 ? (
        <div className='w-full h-full bg-cartBg rounded-t-[2rem] flex flex-col'>
          <div className='w-full h-340 md:h-42 px-6 py-10 flex flex-col gap-3 overflow-y-scroll scrollbar-none'>
            {/* Cart Item */}
            {cartItems &&
              cartItems.length > 0 &&
              cartItems.map(item => <CartItems key={item.id} item={item} />)}
          </div>

          {/* car total section */}
          <div className='w-full flex-1 bg-cartTotal rounded-[2rem] flex flex-col items-center justify-evenly px-8 py-2'>
            <div className='w-full flex items-center justify-between'>
              <p className='text-gray-400 text-lg'>Sub Total</p>
              <p className='text-gray-400 text-lg'>$ {tot}</p>
            </div>
            <div className='w-full flex items-center justify-between'>
              <p className='text-gray-400 text-lg'>Delivery</p>
              <p className='text-gray-400 text-lg'>2.5</p>
            </div>
            <div className='w-full border-b border-gray-600 my-2'></div>

            <div className='w-full flex items-center justify-between'>
              <p className='text-gray-200 text-xl font-semibold'>Total</p>
              <p className='text-gray-200 text-xl font-semibold'>$ {tot}</p>
            </div>
            {user ? (
              <motion.button
                whileTap={{ scale: 0.75 }}
                className='w-full p-2 rounded-full bg-gradient-to-tr from-orange-500 to-orange-400 hover:shadow-lg'
              >
                <p className='text-white text-lg font-semibold'>Pagar</p>
              </motion.button>
            ) : (
              <motion.button
                whileTap={{ scale: 0.75 }}
                className='w-full p-2 rounded-full bg-gradient-to-tr from-orange-500 to-orange-400 hover:shadow-lg'
              >
                <Link to='/login' className='text-white text-lg font-semibold'>
                  Por favor inicia sesion para poder hacer una compra
                </Link>
              </motion.button>
            )}
          </div>
        </div>
      ) : (
        <div className='w-full h-full flex flex-col items-center justify-center gap-6'>
          <img src={EmptyCart} className='w-300' alt='' />
          <p className='text-xl text-textColor font-semibold'>
            Agrega algunos artículos a tu carrito
          </p>
        </div>
      )}
    </motion.div>
  )
}

export default CartContainer
