import { Link } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { useGetSuggestedUsersQuery } from '@/redux/slice/userApi.slice';

const SuggestedUsers = () => {
   const {data : suggestedUsers , isLoading : suggestedUsersLoading , error : suggestedUsersError , isError : suggestedUsersIsError} = useGetSuggestedUsersQuery()

   if(suggestedUsersLoading){
    return <h1>Suggested User Loading .....</h1>
   }
    
    return (
        <div className='my-10'>
            <div className='flex items-center justify-between text-sm'>
                <h1 className='font-semibold text-gray-600'>Suggested for you</h1>
                <span className='font-medium cursor-pointer'>See All</span>
            </div>
            {
               !suggestedUsersLoading && !suggestedUsersIsError && suggestedUsers.map((user) => {
                    return (
                        <div key={user._id} className='flex items-center justify-between my-5'>
                            <div className='flex items-center gap-2'>
                                <Link to={`/profile/${user?._id}`}>
                                    <Avatar>
                                        <AvatarImage src={user?.avatar?.url} alt="post_image" />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                </Link>
                                <div>
                                    <h1 className='text-sm font-semibold'><Link to={`/profile/${user?._id}`}>{user?.username}</Link></h1>
                                    <span className='text-sm text-gray-600'>{user?.bio || 'Bio here...'}</span>
                                </div>
                            </div>
                            <span className='text-[#3BADF8] text-xs font-bold cursor-pointer hover:text-[#3495d6]'>Follow</span>
                        </div>
                    )
                })
            }

        </div>
    )
}

export default SuggestedUsers