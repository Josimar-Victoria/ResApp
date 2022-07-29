import React, { useEffect, useRef } from 'react'
import { MdShoppingBasket } from 'react-icons/md'
import { motion } from 'framer-motion'

const RowContainer = ({ flag, data, scrollValue }) => {
  console.log({ data })
  const rowConatiner = useRef()

  // useEffect(() => {
  //   rowConatiner.current.scrollLe += scrollValue
  // }, [scrollValue])

  return (
    <div
      className={`w-full flex items-center gap-3 ${
        flag ? 'overflow-scroll scrollbar-none' : 'overflow-hidden flex-wrap'
      }`}
    >
      {data &&
        data.map(item => (
          <div
            key={item.id}
            className='w-300 min-w-[300px] md:w-330 md:min-w-[340px] h-auto bg-cardOverlay rounded-lg p-2 my-12 shadow-md backdrop-blur-lg hover:drop-shadow-md cursor-pointer'
          >
            <div className='w-full flex items-center justify-between'>
              <motion.img
                whileHover={{ scale: 1.1 }}
                className='w-40 -mt-8 drop-shadow-2xl'
                src={item.imageURL}
                alt=''
              />
              <motion.div
                whileTap={{ scale: 0.75 }}
                className='w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center cursor-pointer hover:shadow-md'
              >
                <MdShoppingBasket className='text-white text-2xl' />
              </motion.div>
            </div>
            <div className='w-full flex flex-col items-end justify-end'>
              <p className='text-textColor font-semibold text-base md:text-lg'>
                {item.title}
              </p>
              <p className='text-gray-500 mt-1 text-sm'>
                {item.calories} calories
              </p>
              <div className='flex items-center gap-8'>
                <p className='text-lg text-textColor font-semibold'>
                  <span className='text-sm text-orange-500'>$</span>
                  {item.price}
                </p>
              </div>
            </div>
          </div>
        ))}
    </div>
  )
}

export default RowContainer
