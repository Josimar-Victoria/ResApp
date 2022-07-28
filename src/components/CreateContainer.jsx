import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  MdFastfood,
  MdCloudUpload,
  MdDelete,
  MdFoodBank,
  MdAttachMoney
} from 'react-icons/md'
import { categories } from '../util/data'
import Loader from './Loader'
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable
} from 'firebase/storage'
import { storage } from '../firebase.config'
import { getAllFoodItems, saveItem } from '../util/firebaseFunctions'
import { useStateValue } from '../context/StateProvider'

const CreateContainer = () => {
  const [title, setTitle] = useState('')
  const [calories, setCalories] = useState('')
  const [price, setPrice] = useState('')
  const [category, setCategory] = useState(null)
  const [imageAsset, setImageAsset] = useState(null)
  const [msg, setMsg] = useState(null)
  const [fields, setFields] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [alertStatus, setAlertStatus] = useState('danger')
  const [{ foodItems }, dispatch] = useStateValue()

  const uploadImage = e => {
    setIsLoading(true)
    try {
      const imageFile = e.target.files[0]
      const storageRef = ref(storage, `Images/${Date.now()}-${imageFile.name}`)
      const uploadTask = uploadBytesResumable(storageRef, imageFile)

      uploadTask.on(
        'state_changed',
        snapshot => {
          const uploadProgress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        },
        error => {
          console.log(error)
          setFields(true)
          setMsg('Error al subir la imagen')
          setAlertStatus('danger')
          setTimeout(() => {
            setFields(false)
            setIsLoading(false)
          }, 4000)
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
            setImageAsset(downloadURL)
            setIsLoading(false)
            setFields(true)
            setMsg('Imagen subida correctamente')
            setAlertStatus('success')
            setTimeout(() => {
              setFields(false)
            }, 4000)
          })
        }
      )
    } catch (error) {}
  }
  const deleteImage = e => {
    setIsLoading(true)
    try {
      const deleteRef = ref(storage, imageAsset)
      deleteObject(deleteRef).then(() => {
        setImageAsset(null)
        setIsLoading(false)
        setFields(true)
        setMsg('Imagen eliminada correctamente')
        setAlertStatus('success')
        setTimeout(() => {
          setFields(false)
        }, 4000)
      })
    } catch (error) {}
  }
  const saveDetails = e => {
    setIsLoading(true)
    try {
      if (!title || !calories || !price || !category || !imageAsset) {
        setFields(true)
        setMsg('Todos los campos son obligatorios')
        setAlertStatus('danger')
        setTimeout(() => {
          setFields(false)
          setIsLoading(false)
        }, 4000)
      } else {
        const data = {
          id: `${Date.now()}`,
          title: title,
          imageURL: imageAsset,
          category: category,
          calories: calories,
          qty: 1,
          price: price
        }
        saveItem(data)
        setIsLoading(false)
        setFields(true)
        setMsg('Imagen publicada correctamente')
        setTimeout(() => {
          setFields(false)
          setAlertStatus('success')
          clearData()
        }, 4000)
      }
    } catch (error) {
      console.log(error)
      setFields(true)
      setMsg('Error al subir la imagen')
      setAlertStatus('danger')
      setTimeout(() => {
        setFields(false)
        setIsLoading(false)
      }, 4000)
    }
    fecthData()
  }

  const clearData = () => {
    setTitle('')
    setCalories('')
    setPrice('')
    setCategory('Selecciona una categoria')
    setImageAsset(null)
  }



  const fecthData = async () => {
    await getAllFoodItems().then(data => {
      dispatch({
        type: 'SET_FOOD_ITEMS',
        foodItems: data
      })
    })
  }

  return (
    <div className='w-full min-h-screen  flex items-center justify-center'>
      <div className='w-[90%] md:w-[75%] border border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center gap-2'>
        {fields && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`w-full p-2 rounded-lg text-center text-lg ${
              alertStatus === 'danger'
                ? 'bg-red-400 text-red-800 cursor-pointer'
                : 'bg-emerald-400 text-emerald-800'
            }`}
          >
            {msg}
          </motion.p>
        )}
        <div className='w-full py-2 border-b border-gray-300 flex items-center gap-2'>
          <MdFastfood className='text-3xl text-gray-700' />
          <input
            type='text'
            required
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder='Dame un titulo....'
            className='w-full p-2 rounded-lg text-lg text-gray-700 outline-none border-none'
          />
        </div>
        <div className='w-full'>
          <select
            onChange={e => setCategory(e.target.value)}
            className='cursor-pointer outline-none w-full text-gray-700 border-b-3  border-gray-200 p-2 rounded-md'
          >
            <option value='other' className='bg-white'>
              Selecciona una categoria
            </option>
            {categories &&
              categories.map(item => (
                <option
                  key={item.id}
                  value={item.urlParamName}
                  className='text-base border-0 outline-none capitalize bg-white text-headingColor'
                >
                  {item.title}
                </option>
              ))}
          </select>
        </div>
        <div className='group flex justify-center items-center flex-col border-2 border-dotted border-gray-300 w-full h-225 md:h-420 cursor-pointer rounded-lg'>
          {isLoading ? (
            <Loader />
          ) : (
            <>
              {!imageAsset ? (
                <>
                  <label className='w-full h-full flex flex-col justify-center items-center cursor-pointer'>
                    <div className='w-full h-full flex flex-col justify-center items-center gap-2'>
                      <MdCloudUpload className='text-3xl text-gray-700 hover:text-gray-500' />
                      <p className='text-gray-700 hover:text-gray-500'>
                        Haga clic aquí para cargar
                      </p>
                    </div>
                    <input
                      type='file'
                      name='uploadimage'
                      accept='image/*'
                      className='w-0 h-0'
                      onChange={uploadImage}
                    />
                  </label>
                </>
              ) : (
                <>
                  <div className='relative h-full'>
                    <img
                      src={imageAsset}
                      alt='upload_image'
                      className='w-full h-full object-cover'
                    />
                    <button
                      type='button'
                      className='absolute bottom-3 right-3 p-3 rounded-full bg-red-500 text-xl cursor-pointer outline-none hover.shadow-md duration-500 transition-all ease-in-out'
                      onClick={deleteImage}
                    >
                      <MdDelete className='text-white' />
                    </button>
                  </div>
                </>
              )}
            </>
          )}
        </div>
        <div className='w-full flex flex-col md:flex-row items-center gap-3'>
          <div className='w-full py-2 border-b border-t-gray-300 flex item-center gap-2'>
            <MdFoodBank className='text-3xl text-gray-700' />
            <input
              type='text'
              required
              value={calories}
              onChange={e => setCalories(e.target.value)}
              placeholder='Calorias...'
              className='w-full p-2 rounded-lg text-lg text-gray-700 outline-none border-none'
            />
          </div>
          <div className='w-full py-2 border-b border-t-gray-300 flex item-center gap-2'>
            <MdAttachMoney className='text-3xl text-gray-700' />
            <input
              type='text'
              required
              value={price}
              onChange={e => setPrice(e.target.value)}
              placeholder='price...'
              className='w-full p-2 rounded-lg text-lg text-gray-700 outline-none border-none'
            />
          </div>
        </div>
        <div className='flex items-center w-full'>
          <button
            className='ml-0 md:ml-auto w-full md:w-auto border-none outline-none bg-orange-500 px-12 py-2 rounded-lg text-lg text-white'
            onClick={saveDetails}
          >
            Subir
          </button>
        </div>
      </div>
    </div>
  )
}

export default CreateContainer
