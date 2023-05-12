import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { axiosEcomeerce } from '../../../utils/configAxios'
import ProductCard from '../Home/ProductCard'

function SimilarProduct({categoryId, productId}) {

    const [similarProduct, setSimilarProduct] = useState([])

    useEffect(()=>{

        if(categoryId){

        axiosEcomeerce
        .get(`products?categoryId=${categoryId}`)
        .then(res=>{
            // console.log(res.data)
            const otherProducts =  res.data.filter(product=> product.id !== productId)
           setSimilarProduct(otherProducts)
        })
        .catch(err=> console.log(err))
        }
    },[categoryId, productId])

  return (
    <section className='grid justify-items-center gap-6'>

        <h2 className='text-red-500 font-bold justify-self-start'>Discover similar items</h2>

        <section className=' grid gap-6 min-[520px]:grid-cols-2 min-[990px]:grid-cols-3'>
            {
                similarProduct.map(product=> <ProductCard key={product.id} product={product}/>)
            }

        </section>
        
    </section>
    )
}

export default SimilarProduct