import React, { useEffect, useMemo, useState } from 'react'
import ProductCard from '../components/layout/Home/ProductCard'
import { axiosEcomeerce } from '../utils/configAxios'
import ModalFilter from './layout/Home/ModalFilter'

function Home() {

    const [categories, setCategories] = useState([]) //estado de las categorias
    const [products, setProducts] = useState([]) //estado de los productos
    const [productName, setProductName] = useState('') //estado para el input
    const [currentCategory, setCurrentCategory] = useState(0)
    const [modalFilter, setModalFilter] = useState(false)
    const [currentPrice, setCurrentPrice] = useState()
    const [priceMin, setPriceMin] = useState()
    const [priceMax, setPriceMax] = useState()


    const handleSubmitDos =(e)=>{
        e.preventDefault()

        const newProductName = e.target.productName.value
        setProductName(newProductName)
    }

    const handleSubmit =(e)=>{
        e.preventDefault()


        setPriceMin(Number(e.target.min.value))
        setPriceMax(Number(e.target.max.value))

        
        console.log(priceMin)
        console.log(priceMax)

        
    }

   
    //Memoriza funcion de filtrar al renderizar

    const productsByName = useMemo(()=>{
        const productView = products.filter((product)=> product.title.toLowerCase().includes(productName.toLowerCase()))

        if(priceMin ){
            if(priceMax){
                const filterPrice = productView.filter((product)=>  Number(product.price) <= priceMax && Number(product.price) >= priceMin )
                return filterPrice
            }
            const filterPrice = productView.filter((product)=>  Number(product.price) >= priceMin  )
            return filterPrice
        }
        else if(priceMax){
            const filterPrice = productView.filter((product)=>  Number(product.price) <= priceMax  )
            return filterPrice
        }
        else{
            return productView
        }
        

       
    },[productName,products,priceMin,priceMax])


    // const inputUno = 0
    // const inputDos = 0

    // console.log(products)
    // const productsByPrice = ()=>{
    //     const newProducts = []
    //     products.map(product=>{
    //         if(product.price <= inputUno && product.price >= inputDos){
    //             newProducts.push(product)
    //         }
    //     })
    //     console.log(newProducts)
    // }
    // productsByPrice()

    

    


    //Efecto 1 -- Traer las categorias

    useEffect(()=>{

        axiosEcomeerce
        .get('categories')
        .then(res=> setCategories(res.data))
        .catch(err=> console.log(err))

    },[])

    //Efecto 2 -- Traer los productos

    useEffect(()=>{

        if(!currentCategory){
            
        axiosEcomeerce
        .get(`products`)
        .then(res=> setProducts(res.data))
        .catch(err=> console.log(err))
        }
        

    },[currentCategory])


    //Effecto para pticion por categoria

    useEffect(()=>{

        if(currentCategory){
        axiosEcomeerce
        .get(`products?categoryId=${currentCategory}`)
        .then(res=> setProducts(res.data))
        .catch(err=> console.log(err))
        }
    },[currentCategory])




    useEffect(()=>{

        if(currentPrice){
            axiosEcomeerce
            .get(`products`)
            .then(res=> setProducts(res.data))
            .catch(err=> console.log(err))
            }

    },[currentPrice])



    const handleClickCategory = (e)=> {       
        setCurrentCategory(Number(e.target.dataset.category))
    }

    const handleClickShowModalFilter = () =>{
        setModalFilter(!modalFilter)
    }

    const handleClickShowModalFilterOff = () =>{
        setModalFilter(false)
    }

  return (
    <main  className='p-2 mt-[120px] flex flex-col justify-center items-center min-[990px]:flex-row relative'>

        {/* Input y buttom para la busqueda */}

         {/* Lista de categorias de productos */}
         
         <div className= {`fixed z-[200] top-0  duration-1000 ${modalFilter? 'right-0': '-right-full'} min-[990px]:relative min-[990px]:left-0 self-start min-[990px]:right-auto min-[990px]:z-0`}>
            <ModalFilter categories={categories} handleClickShowModalFilter={handleClickShowModalFilter} handleClickCategory={handleClickCategory} products={products} handleSubmit={handleSubmit} />
        </div>
        <div>
        
        <form action="" onSubmit={handleSubmitDos} className='flex w-[100%] bg-green-300 ' >
            <div className='border-[1px] border-black/40 w-full h-[45px] flex  ' >
                <input id='productName' type="text" placeholder='What are you looking for?' className=' border-[1px] border-black/40 w-[80%] outline-none pl-4 text-[15px]' />
                <button className='bx bx-search w-[20%] bg-red-500 hover:bg-red-400 text-white text-[20px]'></button>
            </div>
        </form>
        
        
        <div className='w-[100%] flex justify-end mx-auto pt-3 gap-3 cursor-pointer min-[990px]:absolute min-[990px]:invisible min-[990px]:opacity-100 min-[990px]:left-0 '>
        <i  onClick={handleClickShowModalFilter} class='bx bx-filter-alt text-[25px] text-black/30'></i>
        <p onClick={handleClickShowModalFilter} className='text-[15px] text-black/30'>Filters</p>
        </div>

        


       
        {/* <ul>
            <li onClick={handleClickCategory} data-category={0} className='cursor-pointer'>All</li>
            {
                categories.map(category=> 
                    <li  onClick={handleClickCategory} data-category={category.id} key={category.id} className='cursor-pointer'>{category.name}</li>)
            }
        </ul> */}


        {/* Lista de productos */}

        <section className='grid gap-8 py-6   bg-white min-[580px]:grid-cols-2 min-[1300px]:grid-cols-3 '>

        {
            !productsByName.length && <div className='h-[700px] '>
                <p className='text-center'>No existen products con esas caracteristicas</p>
            </div>
        }
        {
            productsByName.map(product=> <ProductCard key={product.id} product={product}/>)
        }
        </section>
        </div>
       

    </main>
  )
}

export default Home