import { AnimatePresence } from 'framer-motion'
import { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { CreateContainer, Header, MainContainer } from './components'
import { useStateValue } from './context/StateProvider'
import { getAllFoodItems } from './util/firebaseFunctions'

function App () {
  const [{ foodItems }, dispatch] = useStateValue()

  const fecthData = async () => {
    await getAllFoodItems().then(data => {
      dispatch({
        type: 'SET_FOOD_ITEMS',
        foodItems: data
      })
    })
  }

  useEffect(() => {
    fecthData()
  }, [])

  return (
    <AnimatePresence exitBeforeEnter>
      <div className='w-screen h-auto flex flex-col bg-primary '>
        <Header />
        <main className='mt-14 md:mt-20 px-4 md:px-16 py-4 w-full'>
          <Routes>
            <Route path='/*' element={<MainContainer />} />
            <Route path='/create' element={<CreateContainer />} />
          </Routes>
        </main>
      </div>
    </AnimatePresence>
  )
}

export default App
