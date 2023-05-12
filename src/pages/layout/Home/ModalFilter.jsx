import React, { useEffect, useState } from 'react'

function ModalFilter({categories, handleClickShowModalFilter, handleClickCategory, handleSubmit, handleSubmitTres}) {

    const [modalFilter, setModalFilter] = useState(true)
    const [modalCategory, setModalCategory] = useState(true )

    const changeShowModalFilter = () =>{
        setModalFilter(!modalFilter)
    }
    const changeShowModalCategory = () =>{
        setModalCategory(!modalCategory)
    }



  return (
    <div className='bg-white  flex flex-col h-screen  w-[300px] p-4  '>
         <i onClick={handleClickShowModalFilter} className='bx bx-x self-end text-[25px] min-[990px]:absolute min-[990px]:invisible min-[990px]:opacity-0'></i>
        <h4 className='mt-[20px] text-[20px] text-black/70 min-[990px]:mt-0'><b>Filters</b> </h4>
       
        <div className=''>

            <div className='flex justify-between border-b-2 border-black/10 mt-[20px]'>
            <h3 className='text-[20px] text-black/70 '><b> Price</b></h3>
            
            <p className='pr-[5px] '><i onClick={changeShowModalFilter} className={`bx bx-chevron-down text-[25px] text-black/700 duration-1000 ${modalFilter? 'rotate-0': 'rotate-180'}`}></i></p>
            </div>
            
            <form onSubmit={handleSubmit} className={` px-3 pt-4 grid duration-1000  ${modalFilter?  'h-[200px]': 'h-[0px]'}`}>
                <div className='flex bg-green justify-between py-3 '>
                    <label htmlFor="">From</label>
                    <input id='min' type="text" className='border-2 h-[34px] w-[80%] rounded-sm' />
                </div>
                <div className='flex bg-green justify-between py-3' >
                    <label htmlFor="">To</label>
                    <input id='max' type="text" className='border-2 h-[34px] w-[80%] rounded-sm' />
                </div>
                <button className='text-center justify-items-end bg-red-500 w-[100px] h-[40px] rounded-md text-white justify-self-end'>Filter price</button>
            </form>



            <div className=' bg-white relative z-40 '>

                <div className='flex justify-between border-b-2 border-black/10 mt-[10px]'>
                <h3 className='text-[20px] text-black/70 '><b>Category</b></h3>
                <p className='pr-[5px] '><i  onClick={changeShowModalCategory}  className={`bx bx-chevron-down text-[25px] text-black/70 cursor-pointer duration-1000 ${modalCategory? 'rotate-0': 'rotate-180'}`}></i></p>
                </div>

                <ul onClick={handleClickCategory} className={`grid px-4 pt-4 gap-2 ${modalCategory? 'h-[200px]': 'h-0'} duration-1000`}>
                <li  data-category='' className='cursor-pointer'>All</li>
                {
                    categories.map(category=> 
                        <li   data-category={category.id} key={category.id} className='cursor-pointer'>{category.name}</li>)
                }
                </ul>
            </div>
            <div className='bg-white w-[100%] h-[300px] z-50 relative'>

            </div>
        </div>
    </div>
  )
}

export default ModalFilter