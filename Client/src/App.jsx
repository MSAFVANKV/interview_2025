
import './App.css'
import './app.scss'
import { cn } from './lib/utils'
import Navbar from './components/appBars/Navbar'
import './assets/css/components.scss'
import { Outlet, } from 'react-router'
import CategoyBar from './components/appBars/Categoy-Bar'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Footer from './components/appBars/Footer/footer'

function App() {
  const client = new QueryClient();
 

  const restrictedUrls = [
    "/cart",
    "/login",
    "/register"
  ]

  return (
    <div   className={cn(`section-container`, {
          "debug-screens": import.meta.env.MODE === "development",
        })}>
          <Navbar />
          {
             !restrictedUrls.some((path) => window.location.pathname.startsWith(path))
           && (
              <CategoyBar />
            )
          }
           <QueryClientProvider client={client}>
           <Outlet/>
           </QueryClientProvider>
           <Footer/>
   
       
    </div>
  )
}

export default App
