import { loginUser } from '@/api/api';
import { getSelf, setUsers } from '@/redux/slice/auth.slice';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const ProtectedRoutes = ({children}) => {
    const user = useSelector(getSelf)
    const navigate = useNavigate();

    useEffect(()=>{
        if(!user){
            navigate("/login");
        }
    },[user])
  return <>{children}</>
}

export default ProtectedRoutes;