import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changeIsShowCart, getCartProducts, purchaseCart } from '../../../store/slices/cart.slice'
import CartProduct from './CartProduct'
import Swal from 'sweetalert2'

function Cart() {


  const handleClickCheckOut =() =>{
    if(products.length > 0){
    dispatch(purchaseCart())
    dispatch(changeIsShowCart())
    
      Swal.fire('Your purchase was successful!')
    }
    else{
      Swal.fire('Add products to cart')
      dispatch(changeIsShowCart())
    }

  }

   const {isShowCart, products} = useSelector(store=> store.cart)
   const {token} = useSelector(store=> store.userInfo)


   const dispatch = useDispatch()

  const  handleCLickChangeShowCart = () =>{
    dispatch(changeIsShowCart())
  }

  useEffect(()=>{
        if(isShowCart){
            dispatch(getCartProducts())
        }
  },[isShowCart])

  const totalPrice = products.reduce((acc,cur)=> acc + (cur.quantity * cur.product.price) , 0)


  return (
    <section className={`fixed z-[200] top-0 bg-white h-screen w-[300px] shadow-xl ${isShowCart && token ? 'right-0' : '-right-full'} duration-200 p-3 grid grid-rows-[auto_1fr_auto]`}>
        <h2 className='text-xl font-bold'>Shopping cart</h2>
        <i   onClick={handleCLickChangeShowCart} className='bx bx-x absolute top-2 right-3 text-xl hover:text-red-500 cursor-pointer'></i>
    
    <section className=' overflow-y-auto grid gap-10 py-4 content-start'>
       {
            products.map(product => <CartProduct key={product.id} product={product}/>)
       }
    </section>
   
   
   <section className='grid grid-cols-2 border-t-[1px] py-10 border-gray-400'>
        <span>Total</span>
        <h4 className='text-end'>${totalPrice}</h4>
        <button onClick={handleClickCheckOut} className='w-full bg-red-500 py-2 text-white hover:bg-red-600 transition-colors rounded-sm mt-6 col-span-2'>Checkout</button>
   </section>
   
    </section>






  )
}

export default Cart