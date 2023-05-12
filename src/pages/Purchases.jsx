import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { axiosEcomeerce, getConfig } from '../utils/configAxios'
import PurchaseCard from '../components/layout/purchases/PurchaseCard'

function Purchases() {

  const [purchases, setPurchases] = useState([])


  useEffect(()=>{
    // const config = {
    //   headers:{
    //     Authorization: 'Bearer '  + JSON.parse(localStorage.getItem('userInfo'))?.token
    //       }
    // }

    axiosEcomeerce.get('purchases',getConfig())
    .then(res => {
      const orderPurchases = res.data.sort((a,b)=> new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      setPurchases(orderPurchases)
    })
    .catch( err=> console.log(err))

  },[])

  return (
    <main className='px-2 max-w-[1200px] mx-auto mt-[120px]'>

      <section className='flex gap-2 items-center my-2'>

      <Link to={'/'}>Home</Link>
      <div className='h-[5px] aspect-square rounded-full bg-red-500'></div>
      <span className=' font-bold'>Purchases</span>

      </section>
      <section className='grid gap-10 py-6'>
      {
          purchases.map(purchase=> <PurchaseCard key={purchase.id} purchase={purchase}/>)
        }

      </section>
    </main>
  )
}

export default Purchases