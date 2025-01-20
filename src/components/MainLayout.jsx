import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import LeftSidebar from './LeftSidebar'
import { loginUser } from '@/api/api'
import { useDispatch } from 'react-redux'
import { setUsers } from '@/redux/slice/auth.slice'

const MainLayout = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const {message , success , data} = await loginUser({method : "POST" , url : "http://localhost:4000/api/v1/auth/direct-login", contentType : "application/json"});

      if(success){
        dispatch(setUsers(data));

      }else{
        console.log("We get error during direct login the user !",message)
      }
    })
  },[])
  return (
    <div >
         <LeftSidebar/>
        <div className=''>
            <Outlet/>
        </div>
    </div>
  )
}

export default MainLayout