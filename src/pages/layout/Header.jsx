import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { changeIsShowCart } from '../../store/slices/cart.slice'

function Header() {


  const{token} = useSelector(store=> store.userInfo)
  const{products} = useSelector(store=> store.cart)
  const{edit} = useSelector(store=> store.createUser)

  let counter  = 0 

  products.map(product=>  counter = counter + product.quantity)

 
  console.log(counter)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const  handleCLickChangeShowCart = () =>{
    if(!token) return navigate('/login')
    dispatch(changeIsShowCart())
  }

  const handleChangeToEditUser = ()=>{
    dispatch(editUser())
  }

  return (
    <section className='flex  fixed h-[60px] justify-between items-center w-full top-0 px-6 bg-white z-[100] min-[990px]:border-b-[1px] border-black/20 max-w-[1300px] min-[1300px]:border-r-[1px] min-[1300px]:border-l-[1px]'>

            <Link to="/">
                <h3 className='text-[25px] text-red-500 min-[990px]:text-[30px]'><b>Vazquez-shop</b> </h3>
            </Link>

        <nav className='text-[24px] grid grid-cols-3 gap-4 text-black/40 w-[40%] pr-2  h-[100%] items-center '>
            
        <Link to="/login" className='grid w-full h-full min-[990px]:border-l-[1px] border-black/20 justify-center pt-[18px]'><i className='bx bx-user h-full w-[36%] '></i></Link>

        <Link  to="/purchases" className='grid w-full h-full min-[990px]:border-l-[1px] border-black/20 justify-center pt-[18px]'><i className='bx bx-box w-[36%]'></i></Link>
        
        <button onClick={handleCLickChangeShowCart} className='grid relative w-full h-full min-[990px]:border-l-[1px] border-black/20 justify-center pt-[18px]'>
          <i className='bx bx-cart  w-[36%] relative'>
          <div className={`w-[13px] h-[13px] bg-red-600 absolute top-0 -right-4 rounded-full text-[10px] text-white ${counter <= 0 && 'invisible'}`}>{counter}</div>
          </i>
          
          </button>

        </nav>
    </section>
      )
}

export default Header