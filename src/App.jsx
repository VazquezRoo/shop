import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Login from './pages/Login'
import Purchases from './pages/Purchases'
import Product from './pages/Product'
import Header from './pages/layout/Header'
import NotFound from './NotFound'
import ProtectedAuth from './components/layout/auth/ProtectedAuth'
import Cart from './components/layout/card/Cart'
import SingUp from './pages/SingUp'
import Footer from './components/layout/Footer'

function App() {

  return (
    <section className='relative bg-gray-100 grid justify-items-center min-h-screen font-["yantramanav"] '>

      <Header/>

      <Routes>

      <Route path='/' element={<Home/>}/>

      <Route path='/login' element={<Login/>}/>

      <Route path='/singup' element={<SingUp/>}/>


      <Route element={<ProtectedAuth/>}>
      <Route path='/purchases' element={<Purchases/>}/>
      </Route>

      <Route path='/products/:id' element={<Product/>}/>

      <Route path='/*' element={<NotFound/>}/>




      </Routes>
      <Cart/>
      <Footer/>
    </section>
  )
}

export default App
