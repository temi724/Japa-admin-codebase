import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='h-10 w-96 bg-gray-800'>
        <h1 className='text-white'>Welcome to japa Admin Base</h1>
      </div>

    </>
  )
}

export default App
