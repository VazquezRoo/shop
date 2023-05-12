import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { logOut, loginUser } from '../store/slices/userInfo.slice'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Navigate } from 'react-router-dom'
import { deleteUser, editUser, noEditUser } from '../store/slices/createUser'
import { axiosEcomeerce, getConfig } from '../utils/configAxios'
import Swal from 'sweetalert2'

function Login() {

  const [userLogin, setUserLogin] = useState([])
  const [modal, setModal] = useState(true)
  // const [modalEdit, setModalEdit] = useState(true)
  const [showError, setShowError] = useState(true)

  const {register, handleSubmit,  formState:{errors}} = useForm()
  const dispatch = useDispatch()



  const {token, user} = useSelector(store => store.userInfo) //Traer estados globales
  const {edit} = useSelector(store => store.createUser)
  console.log(user)
  console.log(edit)

  const submit = (data) =>{
    console.log(data)
    dispatch(loginUser(data))  
  }

  const handleCLickLogOut = ()=>{
    dispatch(noEditUser())
    dispatch(logOut())
  }


  const handleCLickDeleteUser = () =>{
    
    dispatch(deleteUser(userLogin.id))
    dispatch(logOut())
    Swal.fire('The user was successfully deleted!')
  
  }

  const handleChangeToEditUser = ()=>{
    dispatch(editUser())
  }

 

  useEffect(()=>{
    axiosEcomeerce.get('users/me', getConfig())
    .then(res=> setUserLogin(res.data))
    .catch(err=>{
     
      console.log(err)})
  },[user])

 
  const changeModal = () => {
    setModal(!modal)
}




  return (

    <main className='bg-gray-100 w-screen min-h-screen grid place-content-center justify-items-center '>

      {
        token ? 
          <section  className='bg-white p-4 rounded-md py-2 flex flex-col w-[300px] min-[600px]:w-[400px] justify-center   items-center h-[300px]'>
           <div className='bg-white p-4 rounded-md py-2 flex flex-col w-[300px] justify-center pt-[00px]  items-center z-30'>
           <i className='bx bxs-user-circle text-6xl text-gray-400 justify-self-center' ></i>
            <h3 className='capitalize'>{user?.firstName + ' ' +  user?.lastName}</h3>
            <button onClick={handleCLickLogOut} className='bg-red-500 text-white py-2 rounded-md w-full block'>Log out</button>

            <div className='mt-[10px] grid justify-end w-full'>
            <p onClick={changeModal} className='pr-[5px] flex '>
              {
                !modal?<p className='text-[15px] text-black/40'>Show less</p>:<p className='text-[15px] text-black/40 '>Show more</p>
              }
              <i className={`bx bx-chevron-down text-[25px] text-black/70 cursor-pointer duration-1000 ${modal?'rotate-0': 'rotate-180'}`}></i></p>
            </div>
           </div>
            

            <section className={` overflow-hidden absolute top-[440px] gap-6 grid p-2 ${!modal? 'h-[200px] mt-[20px]':'h-[0] top-[400px]'} bg-white w-[300px] min-[600px]:w-[400px] min-[600px]:px-16 duration-1000 `}>
              <p>Name: <span className='pl-10'>{userLogin.firstName + ' ' + userLogin.lastName}</span></p>
              <p>Email: <span className='pl-10'>{userLogin.email}</span></p>
              {
                userLogin.phone?<p>Phone: {userLogin.phone}</p>: <p>Phone: <span className='text-center pl-10'>----</span></p>
              }

              <div className='flex gap-2 justify-end'>

              {/* <Link to={'/singUp'} onClick={handleChangeToEditUser} className='bg-red-500 rounded-full h-[30px] w-[30px] text-center justify-self-end text-white hover:bg-red-400 grid items-center'><i class='bx bx-pencil pb-[1px]'></i></Link> */}

              <Link to={'/'} onClick={handleCLickDeleteUser} className='bg-red-500 rounded-full h-[30px] w-[30px] text-center justify-self-end text-white hover:bg-red-400 grid items-center'><i class='bx bx-trash pb-[1px]'></i></Link>

              
              </div>
            </section>

          </section>
        
        
        :
        
        
          <form onSubmit={handleSubmit(submit)} action="" className='bg-white p4 rounded-md  max-w-[400px] grid gap-6 p-2'>

          <h2 className='text-2xl font-[500] text-gray-700'>Welcome! Enter your email and password to continue</h2>
    
          <section className=' bg-cyan-300/30   p-4 rounded-md py-3x '>
    
            <h3 className='text-center font-bold'>Test data</h3>
    
            <div className='flex gap-2 items-center'>
    
            <i className='bx bx-envelope text-xl'></i>
            <span>john@gmail.com</span>
    
            </div>
    
            <div className='flex gap-2 items-center'>
    
            <i className='bx bx-lock-alt text-xl'></i>
            <span>john1234</span>
    
            </div>
    
          </section>
    
          <div className='grid gap-1'>
            <label htmlFor="email">Email</label>
            <input className='border-[1px] border-gray-300 p-1 outline-none' id='email' type="email" {...register('email',{required:true})}/> 
          </div>
    
          <div className='grid gap-1'>
            <label htmlFor="password"> Password </label>
            <input className='border-[1px] border-gray-300 p-1 outline-none' id='password' type="password"  {...register('password',{required:true})} />
          </div>
    
          <button className='block w-full py-2 bg-red-500 text-white hover:bg-red-600 transition-colors'>Login</button>
          <span className={`text-red-500 ${showError? 'opacity-0':'opacity-100'}`}>Invalid credentials</span>
    
          <span className='text-sm'>Don't have an account?
           <Link  to='/singup' className='text-blue-400'>Sign up</Link></span>
    
        </form>

        
      }

 
   
    </main>
  )
}

export default Login