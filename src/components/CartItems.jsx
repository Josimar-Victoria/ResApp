import React, { useEffect, useState } from 'react'
import { BiMinus, BiPlus } from 'react-icons/bi'
import { motion } from 'framer-motion'
import { useStateValue } from '../context/StateProvider'
import { actionType } from '../context/reducer'

const CartItems = ({ item }) => {
  const [qty, setQty] = useState(item.qty)
  const [items, setItems] = useState([])
  const [{ cartItems }, dispatch] = useStateValue()

  const cartDispatcher = () => {
    dispatch({
      type: actionType.SET_CART_ITEMS,
      cartItems: items
    })
  }

  const updateQty = (action, id) => {
    if (action === 'add') {
      setQty(qty + 1)
      //   cartItems.map(item => (item.id === id ? (item.qty += 1) : item))
      cartItems.map(item => {
        if (item.id === id) {
          item.qty += 1
        }
        return item
      })
      cartDispatcher()
    } else {
      if (qty === 1) {
        setItems(cartItems.filter(item => item.id !== id))
        cartDispatcher()
      } else {
        setQty(qty - 1)
      }
    }
  }

  useEffect(() => {
    setItems(cartItems)
  }, [qty, cartItems])
  return (
    <div className='w-full p-1 px-2 rounded-lg bg-cartItem flex items-center gap-2'>
      <img
        src={item?.imageURL}
        alt='img'
        className='w-20 h-20 max-w-[60px] rounded-full object-contain'
      />
      {/* name section */}
      <div className='flex flex-col gap-2'>
        <p className='text-base text-gray-50 '>{item?.title}</p>
        <p className='text-sm block text-gray-300 font-semibold'>
          $ {parseFloat(item?.price) * qty}
        </p>
      </div>
      {/* buttom section */}
      <div className='group flex items-center gap-2 ml-auto cursor-pointer'>
        <motion.div
          whileTap={{ scale: 0.75 }}
          onClick={() => updateQty('remove', item?.id)}
        >
          <BiMinus className='text-2xl text-gray-50 cursor-pointer' />
        </motion.div>
        <p className='w-5 h-5 rounded-sm bg-cartBg text-gray-50 flex items-center justify-center'>
          {qty}
        </p>
        <motion.div
          whileTap={{ scale: 0.75 }}
          onClick={() => updateQty('add', item?.id)}
        >
          <BiPlus className='text-2xl text-gray-50 cursor-pointer' />
        </motion.div>
      </div>
    </div>
  )
}

export default CartItems
