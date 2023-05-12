import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import createUser, { setNewUser, updateUser } from '../store/slices/createUser'
import Swal from 'sweetalert2'
import { loginUser } from '../store/slices/userInfo.slice'

function SingUp() {

    const {register, handleSubmit, formState:{errors}} = useForm()


    const {edit} = useSelector(store=>store.createUser)
    const {user} = useSelector(store=>store.userInfo)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const submit =(data) =>{


        // const login = {
        //     firstName: user.firstName
        //  }

        //  console.log(login)

         if(edit){

            dispatch(setNewUser(data, navigate))
    
         }
         else{
            dispatch(updateUser(user.id))

            Swal.fire('The user was edited correctly!')
         }

    }

  
    // const handleChangeToEditUser = ()=>{
    //     dispatch(editUser())
    //   }

  return (
    <div className=' bg-gray-100 text-black w-screen min-h-screen flex items-center justify-center pl-5'>

        
        
        <form to='/' onSubmit={handleSubmit(submit)} action="" className='text-black/80 w-[90%] max-w-[400px] p-6 bg-white grid gap-2'>
            <h4 className='text-[25px]'>{edit? 'Sing Up': 'Update'}</h4>
            <div className='grid h-[80px]'>

                <label htmlFor="">Email</label>
                <input type="email" className='pl-2 h-[31px] outline-none border-[1px] border-black/20 rounded-sm text-[20px]' {...register('email', 
                {
                    required:'Este campo es requerido', 
                   
                    }
                )} />
                 <span className="text-[10px]  text-red-500">{errors.email && errors.email.message}</span>
            </div>

            <div className='grid h-[80px]'>
                <label htmlFor="">First Name</label>
                <input type="text"  className='pl-2 h-[31px] outline-none border-[1px] border-black/20 rounded-sm text-[20px]' {...register('firstName',
                {
                    required:'Este campo es requerido', 
                  
                    }
                )}/>
                 <span className="text-[10px]  text-red-500">{errors.firstName && errors.firstName.message}</span>
            </div>

            <div className='grid h-[80px]'>
                <label htmlFor="">Last Name</label>
                <input type="text" className='pl-2 h-[31px] outline-none border-[1px] border-black/20 rounded-sm text-[20px]' {...register('lastName',
                {
                    required:'Este campo es requerido', 
                   
                    }
                )}/>
                 <span className="text-[10px]  text-red-500">{errors.lastName && errors.lastName.message}</span>
            </div>

            <div className='grid h-[80px]'>
                <label htmlFor="">Password</label>
                <input type="password" className='h-[31px] pl-2 outline-none border-[1px] border-black/20 rounded-sm text-[20px]'{...register('password',
                {
                    required:'Este campo es requerido', 
                    minLength:{
                      value:3,
                      message:'Minimo 3 caracteres'},
                    maxLength:{
                      value:12,
                      message:'Maximo 12 caracteres'}
                    }
                )} />
                <span className="text-[10px] text-red-500">{errors.password && errors.password.message}</span>
            </div>
            
            <div className='grid h-[80px]'>
                <label htmlFor="">Phone (10 characters)</label>
                <input type="text" className='h-[31px] pl-2 outline-none border-[1px] border-black/20 rounded-sm text-[20px] ' {...register('phone',
                // {
                //     required:'Este campo es requerido', 
                //     minLength:{
                //       value:10,
                //       message:'Formato invalido, introduzca 10 caracteres'},
                //     maxLength:{
                //       value:10,
                //       message:'Formato invalido, introduzca 10 caracteres'},
                      
                //     }
                    )}/>
                    <span className="text-[10px]  text-red-500">{errors.phone && errors.phone.message}</span>
            </div>
            
            {
                edit? <button  className='block w-full py-2 bg-red-500 text-white hover:bg-red-600 transition-colors mt-[20px] text-center'>Sing Up</button>:<button  className='block w-full py-2 bg-red-500 text-white hover:bg-red-600 transition-colors mt-[20px] text-center'>Update</button>
            }
            
    
                  <span className='text-sm'>Already have an account?
                  <Link  to='/login' className='text-blue-400'>Log in</Link></span>
        </form>
    </div>
  )
}

export default SingUp