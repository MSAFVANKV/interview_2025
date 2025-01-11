import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import './app.scss'
import { cn } from './lib/utils'
import Navbar from './components/appBars/Navbar'
import './assets/css/components.scss'
import { Outlet } from 'react-router'
import CategoyBar from './components/appBars/Categoy-Bar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div   className={cn(`section-container`, {
          "debug-screens": import.meta.env.MODE === "development",
        })}>
          <Navbar />
          <CategoyBar />
          <Outlet/>
    </div>
  )
}

export default App
