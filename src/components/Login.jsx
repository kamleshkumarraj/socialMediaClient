import { Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { loginUser } from '@/api/api';
import { getSelf, setUsers } from '@/redux/slice/auth.slice';
import { updateToast } from '@/utils/updateToast.utils';
import { toast } from 'react-toastify';

const Login = () => {
    const [input, setInput] = useState({
        email: "",
        password: ""
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(getSelf);
    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    useEffect(() => {
        (async () => {
          const {message , success , data} = await loginUser({method : "POST" , url : "http://localhost:4000/api/v1/auth/direct-login", contentType : "application/json"});
    
          if(success){
            dispatch(setUsers(data));
            navigate("/");
          }else{
            console.log("We get error during direct login the user !",message)
          }
        })()
      },[])

    const loginHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        const toastId = toast.loading("Please wait...");
        const {data , message , success} = await loginUser({data : input , method : "POST" , url : "http://localhost:4000/api/v1/auth/login", contentType : "application/json"});
        console.log(success)
        if(success){
            dispatch(setUsers(data));
            updateToast({toastId , message : message || "User logged in successfully" , type : "success"});
            navigate("/");
        }else{
            updateToast({toastId , message : message || "Something went wrong" , type : "error"});
        }
        setLoading(false);
    }
    

    useEffect(()=>{
        if(user){
            navigate("/");
        }
    },[])
    return (
        <div className='flex items-center justify-center w-screen h-screen'>
            <form onSubmit={loginHandler} className='flex flex-col gap-5 p-8 shadow-lg'>
                <div className='my-4'>
                    <h1 className='text-xl font-bold text-center'>LOGO</h1>
                    <p className='text-sm text-center'>Login to see photos & videos from your friends</p>
                </div>
                <div>
                    <span className='font-medium'>Email</span>
                    <Input
                        type="email"
                        name="email"
                        value={input.email}
                        onChange={changeEventHandler}
                        className="my-2 focus-visible:ring-transparent"
                    />
                </div>
                <div>
                    <span className='font-medium'>Password</span>
                    <Input
                        type="password"
                        name="password"
                        value={input.password}
                        onChange={changeEventHandler}
                        className="my-2 focus-visible:ring-transparent"
                    />
                </div>
                {
                    loading ? (
                        <Button>
                            <Loader2 className='w-4 h-4 mr-2 animate-spin' />
                            Please wait
                        </Button>
                    ) : (
                        <Button type='submit'>Login</Button>
                    )
                }

                <span className='text-center'>Dosent have an account? <Link to="/signup" className='text-blue-600'>Signup</Link></span>
            </form>
        </div>
    )
}

export default Login