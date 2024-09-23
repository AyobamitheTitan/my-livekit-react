import { useState } from 'react'
import './App.css'
import Livekit from './components/livekit'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Livekit />
    </>
  )
}

export default App
