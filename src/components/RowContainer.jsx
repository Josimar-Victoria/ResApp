import React, { useEffect, useRef, useState } from 'react'
import { MdShoppingBasket } from 'react-icons/md'
import { motion } from 'framer-motion'
import NotFound from '../img/NotFound.svg'
import { useStateValue } from '../context/StateProvider'
import { actionType } from '../context/reducer'

const RowContainer = ({ flag, data, scrollValue }) => {
  const rowConatiner = useRef()
  const [items, setItems] = useState([])

  const [{ cartItems }, dispatch] = useStateValue()

  const handleAddToCart = () => {
    dispatch({
      type: actionType.SET_CART_ITEMS,
      cartItems: items
    })
    localStorage.setItem('cartItems', JSON.stringify(items))
  }

  useEffect(() => {
    rowConatiner.current.scrollLeft += scrollValue
  }, [scrollValue])

  useEffect(() => {
    handleAddToCart()
  }, [items])

  return (
    <div
      ref={rowConatiner}
      className={`w-full flex items-center gap-3 scroll-smooth ${
        flag
          ? 'overflow-scroll scrollbar-none'
          : 'overflow-hidden flex-wrap justify-center'
      }`}
    >
      {data && data.length > 0 ? (
        data.map(item => (
          <div
            key={item.id}
            className='w-300 h-auto min-w-[300px] md:w-330 md:min-w-[340px] bg-cardOverlay rounded-lg p-2 my-12 shadow-md backdrop-blur-lg hover:drop-shadow-md flex flex-col items-center justify-between'
          >
            <div className='w-full flex items-center justify-between'>
              <motion.div
                whileHover={{ scale: 1.1 }}
                className='w-40 -mt-8 drop-shadow-2xl h-40 rounded-lg'
              >
                <img
                  className='w-full h-full object-contain'
                  src={item?.imageURL}
                  alt=''
                />
              </motion.div>
              <motion.div
                whileTap={{ scale: 0.75 }}
                className='w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center cursor-pointer hover:shadow-md'
                onClick={() => setItems([...cartItems, item])}
              >
                <MdShoppingBasket className='text-white text-2xl' />
              </motion.div>
            </div>
            <div className='w-full flex flex-col items-end justify-end'>
              <p className='text-textColor font-semibold text-base md:text-lg'>
                {item?.title}
              </p>
              <p className='text-gray-500 mt-1 text-sm'>
                {item?.calories} calories
              </p>
              <div className='flex items-center gap-8'>
                <p className='text-lg text-textColor font-semibold'>
                  <span className='text-sm text-orange-500'>$</span>
                  {item?.price}
                </p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className='w-full flex flex-col items-center justify-center'>
          <img className='h-340' src={NotFound} alt='' />
          <p className='text-xl text-headingColor font-semibold my-2'>
            No hay productos disponibles
          </p>
        </div>
      )}
    </div>
  )
}

export default RowContainer
