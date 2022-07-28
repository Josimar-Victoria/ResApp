import React from 'react'
import Delivery from '../img/delivery.png'
import HeroBg from '../img/heroBg.png'
import { heropData } from '../util/data'

const HomeContainer = () => {
  return (
    <section className='grid grid-cols-1 md:grid-cols-2 gap-2 w-full' id='home'>
      <div className='p-2 flex-1 flex flex-col gap-6 items-start justify-center'>
        <div className='flex items-center gap-2 justify-center bg-orange-100 px-4 py-1 rounded-full '>
          <p className='text-base text-orange-500 font-semibold'>
            Entrega en motocicleta
          </p>
          <div className='w-8 h-8 bg-white rounded-full overflow-hidden drop-shadow-xl'>
            <img
              src={Delivery}
              alt='delivery'
              className='w-full h-full object-contain'
            />
          </div>
        </div>
        <p className='text-[2.7rem] md:text-[3.8rem] font-bold tracking-wide text-headingColor'>
          La entrega más rápida en{' '}
          <span className='text-orange-500 md:text-[3.6rem] text-[3rem]'>
            Tu City
          </span>
        </p>

        <p className='text-base text-textColor text-center md:text-left md:w-[80%]'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias modi
          iusto expedita numquam hic labore nemo suscipit a impedit, rem,
          dolorum repellat est saepe, tempora consequatur nisi molestiae
          obcaecati corporis?
        </p>
        <button
          type='button'
          className='bg-gradient-to-br from-orange-400 to-orange-500 w-full px-4 py-2 rounded-lg hover:shadow-lg hover:bg-orange-600 transition-all duration-100 ease-in-out text-white text-base'
        >
          Ordenar ahora
        </button>
      </div>
      <div className='p-2 flex-1 flex items-center relative'>
        <img
          src={HeroBg}
          className='ml-auto h-420 w-full lg:w-autos'
          alt='hero-bg'
        />
        <div className='w-full h-full absolute top-0 left-0 flex items-center justify-center lg:px-30 py-3 gap-2 flex-wrap'>
          {heropData &&
            heropData.map(item => (
              <div
                key={item.id}
                className='w-170 lg:w-190 p-3 bg-cardOverlay  backdrop-blur-md rounded-3xl flex flex-col items-center justify-center cursor-pointer drop-shadow-lg'
              >
                <img src={item.image} className='w-20 lg:w-25 -mt-30 ' alt='' />
                <p className='text-lg font-semibold text-textColor'>
                  {item.title}
                </p>
                <p className='text-[10px] lg:text-sd text-lighttextGray my-1 lg:my-3'>
                  {item.description}
                </p>
                <p className='text-sm text-textColor'>
                  <span className='text-xs text-orange-500'>$</span>
                  {item.price}
                </p>
              </div>
            ))}
        </div>
      </div>
    </section>
  )
}

export default HomeContainer
