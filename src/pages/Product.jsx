import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import ProductDetail from '../components/layout/Product/ProductDetail'

function Product() {

 

  //Use params para traer la url fija

  const {id} = useParams()


  

  return (
    <main>

      {/* Barra Home */}

      <section className='flex gap-2 items-center'>

        <Link to={'/'}>Home</Link>
        <div className='h-[5px] aspect-square rounded-full bg-red-500'></div>
        <span className=' font-bold'>samsung</span>

      </section>

      <section>
          <ProductDetail productId= {id}/>
      </section>

     

    </main>
  )
}

export default Product