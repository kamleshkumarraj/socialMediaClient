import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import LeftSidebar from './LeftSidebar'
import { loginUser } from '@/api/api'
import { useDispatch } from 'react-redux'
import { setUsers } from '@/redux/slice/auth.slice'

const MainLayout = () => {
  const dispatch = useDispatch();

 
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