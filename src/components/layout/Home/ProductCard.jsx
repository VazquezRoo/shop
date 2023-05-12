import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { addProductCart } from '../../../store/slices/cart.slice'
import Swal from 'sweetalert2'

function ProductCard({product}) {

    const dispatch = useDispatch()

   const {products} =  useSelector(store=>store.cart)
   const {token} =  useSelector(store=>store.userInfo)
   const navigate = useNavigate()



   const productsAlert = {}

     products.map(producto=>{
         productsAlert[producto.productId] = producto.quantity
    })
        
    const handleClickAddProduct = (e)=>{
        e.preventDefault()
        

        if(token){
        if(productsAlert[product.id] >= 1){
            showAlert()
        }
        else{
        dispatch(addProductCart({productId: product.id, quantity: 1}))}  
        }
        else{
            Swal.fire('Login to add products to cart')
            navigate('/login')
        }    
    }

    useEffect(()=>{

    },[])

    const showAlert = () => {
        Swal.fire('This product is already in the cart')
    }


  return (

    <Link to={`/products/${product.id}`} className='hover:bg-gray-100/70 border-[1px] border-gray-200 min-[580px]:w-[240px] min-[770px]:w-[300px]'>


        {/* imagen  */}
        <div className='p-6 h-[200px] overflow-hidden relative group'>
            <img src={product.images[0].url} alt=""  className='h-full w-full object-contain group-hover:opacity-0 transition-opacity duration-300'/>
            <img src={product.images[1].url} alt=""  className='h-full w-full object-contain absolute top-0 left-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300'/>
        </div>

        {/* informacion */}

        <section className='border-t-[1px] border-gray-200 p-4 relative'>

            <h4 className='text-gray-500 font-bold'>{product.brand}</h4>

            <h3 className='font-bold text-sm ml-2'>{product.title}</h3>

            <h4 className='text-gray-500 font-bold mt-4'>Price</h4>

            <span  className='font-bold text-sm ml-4'>{product.price}</span>

            <button onClick={handleClickAddProduct} className='absolute bottom-0 right-4 bg-red-500 pt-2 rounded-full text-white text-xl w-[45px] aspect-square hover:bg-red-600 transition-colors  mb-6 mr-3'><i className='bx bx-cart-alt ' ></i></button>

        </section>

    </Link>
  )
}

export default ProductCard