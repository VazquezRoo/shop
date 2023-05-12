import React, { useEffect, useState } from 'react'
import { axiosEcomeerce } from '../../../utils/configAxios'
import SimilarProduct from './SimilarProduct'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addProductCart, updateCart } from '../../../store/slices/cart.slice'

const stylePositionImage = {
    '0' : '-ml-[0%]',
    '1' : '-ml-[100%]',
    '2' : '-ml-[200%]',

}

function ProductDetail({productId}) {

    const {products} =useSelector(store=>store.cart)

    
   
     const dispatch = useDispatch()

    const [productData, setProductData] = useState()
    const [counter, setCounter] = useState(1)
    const [imgToShow, setImgToShow] = useState(0)

    const handleClickPlus = () => {
        const newCounter = counter + 1
        setCounter(newCounter)
    }
    const handleClickLess = () => {
        const newCounter = counter -1
        if(newCounter > 0){
            setCounter(newCounter)
        }
    }
    
    const newarray = products.findIndex(mascota => mascota.productId.toString() === productId)

   
  
  //Efecto para traer informacion del producto 

  useEffect(()=>{

    axiosEcomeerce
    .get(`products/${productId}`)
    .then(res=> setProductData(res.data))
    .catch(err=> console.log(err))

  },[productId])

  const handleClickAtToCart = (e) => {
    e.preventDefault()

    dispatch(addProductCart({ productId: productData.id, quantity: counter }))
    setCounter(1)

    const newQuantity = products[newarray].quantity + counter
      
        dispatch(updateCart({"quantity": JSON.stringify(newQuantity)},products[newarray].id))


}

    const nextImage = () =>{
       
        const nextImage = imgToShow + 1
        if(nextImage <= 2) {
            setImgToShow(nextImage)
        }
        else{
            setImgToShow(0)
        }
    }

    const previousImage = () =>{
        const nextImage = imgToShow - 1
        if(nextImage >= 2) {
            setImgToShow(nextImage)
        }
        else{
            setImgToShow(2)
        }

    }

       

    // const handleClickPlusDos = (e) => {
    //     e.preventDefault()
    //     // dispatch(addProductQuantity())

    //     const newQuantity = productId.quantity + 1
    //     console.log( newQuantity)
    //     dispatch(updateCart({"quantity": JSON.stringify(newQuantity)},productId.id))
    // }
    // const handleClickLessDos = (e) => {
    //     e.preventDefault()
    //     // dispatch(lessProductQuantity())

    //     const newQuantity = product.quantity - 1
    //     console.log( newQuantity)
    //     dispatch(updateCart({"quantity": JSON.stringify(newQuantity)},productId.id))
    // }



  return (

    <>
    <section className='flex gap-2 items-center p-4'>

        <Link to={'/'}>Home</Link>
        <div className='h-[5px] aspect-square rounded-full bg-red-500'></div>
        <span className=' font-bold'>{productData?.title}</span>

    </section>
    <section className='grid gap-6 min-[770px]:grid-cols-2 sm:items-center max-w-[1200px] marker: px-4 min-[770px]:grid-rows-[auto]'>

        {/* slider */}

        <div className='min-[770px]:row-span-5 overflow-hidden relative'>
        <section className={`min-[770px]:row-span-5  justify-center items-center flex w-[300%] ${stylePositionImage[imgToShow]} duration-200`}>
            <div className='h-[300px] w-[calc(100%_/_3)] p-4 '>
                <img className='h-full w-full object-contain  ' src={productData?.images[0].url} alt="" />
            </div>
            <div className='h-[300px] w-[calc(100%_/_3)] p-4 '>
                <img className='h-full w-full object-contain  ' src={productData?.images[1].url} alt="" />
            </div>
            <div className='h-[300px] w-[calc(100%_/_3)] p-4 '>
                <img className='h-full w-full object-contain  ' src={productData?.images[2].url} alt="" />
            </div>
        </section>
        <i onClick={nextImage} className='bx bxs-right-arrow text-red-700 absolute top-1/2 -translate-y-1/2 right-2 text-red- hover:text-red-400 cursor-pointer'></i>
        <i onClick={previousImage} className='bx bxs-left-arrow text-red-700 absolute top-1/2 -translate-y-1/2 left-2 text-red- hover:text-red-400 cursor-pointer'></i>
        </div>



        <h4 className='text-gray-400 font-bold  mt-6 min-[770px]:col-start-2 min-[770px]:row-start-1'>{productData?.brand}</h4>

        <h3 className='font-bold text-lg  row ml-2 min-[770px]:row-start-2 min-[770px]:col-start-2'>{productData?.title}</h3>


        <section className='grid grid-cols-2 mt-6 min-[770px]:row-start-4 min-[770px]:col-start-2'>

            <article>
                <h4 className='text-gray-400 font-bold'>Price</h4>
                <span className='font-bold text-lg ml-2'>$ {productData?.price}</span>
            </article>

            <article>
                <h4 className='text-gray-400 font-bold'>Quantity</h4>
                <div className='flex items-center'>

                <button onClick={handleClickLess} className='border-[1px] p-2 px-4 hover:bg-red-500 hover:text-white transition-colors'>-</button>

                <span className='border-[1px] p-2 px-4 border-x-0'>{counter}</span>

                <button onClick={handleClickPlus} className='border-[1px] p-2 px-4  hover:bg-red-500 hover:text-white transition-colors'>+</button>

                </div>
            </article>

        </section>

        <button onClick={handleClickAtToCart} className='w-full bg-red-500 py-2 text-white hover:bg-red-600 transition-colors rounded-sm mt-6 min-[770px]:row-start-5 min-[770px]:col-start-2'>
            Add to cart<i className='bx bx-cart'></i>
        </button>

        <p className='text-sm my-6 text-gray-700 min-[770px]:col-start-2 min-[770px]:row-start-3'>
            {productData?.description}
        </p>

    </section>
    <section className='w-full grid justify-center mt-[100px]'>
        <SimilarProduct categoryId={productData?.categoryId} productId={productData?.id}/>
    </section>
</>
  )
}

export default ProductDetail