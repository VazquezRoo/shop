import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {addProductQuantity, deleteProductCart, lessProductQuantity, updateCart } from '../../../store/slices/cart.slice'

function CartProduct({product}) {

   

    const dispatch = useDispatch()

    const handleClickDelete = () =>{
        dispatch(deleteProductCart(product.id))

    }
    const {isShowCart, products} = useSelector(store=> store.cart)
 

    const handleClickPlus = (e) => {
        e.preventDefault()
        // dispatch(addProductQuantity())

        const newQuantity = product.quantity + 1
    
        dispatch(updateCart({"quantity": JSON.stringify(newQuantity)},product.id))
    }
    const handleClickLess = (e) => {
        e.preventDefault()
        // dispatch(lessProductQuantity())

        const newQuantity = product.quantity - 1
        
        dispatch(updateCart({"quantity": JSON.stringify(newQuantity)},product.id))
    }

  return (
    <article className=''>
        <section className='grid grid-cols-[auto_1fr_auto] gap-1'>
            <div className='h-[90px] aspect-square row-span-2 p-2'>
                <img src={product.product.images[2].url} alt="" className='w-full h-full object-contain' />
            </div>
            <h4>{product.product.title}</h4>
            <i onClick={handleClickDelete} className='bx bxs-trash text-red-500 cursor-pointer'></i>
            <div className='flex items-center'>

                <button onClick={handleClickLess} className='border-[1px] p-2 px-2 hover:bg-red-500 hover:text-white transition-colors'>-</button>

                <span className='border-[1px] p-2 px-4 border-x-0'>{product.quantity}</span>

                <button onClick={handleClickPlus} className='border-[1px] p-2 px-2  hover:bg-red-500 hover:text-white transition-colors'>+</button>

                </div>
        </section>
        <h4 className='mt-2 text-end'>Total:  <span className='font-bold'>${(product.product.price * product.quantity).toFixed()}</span></h4>
    </article>
  )
}

export default CartProduct