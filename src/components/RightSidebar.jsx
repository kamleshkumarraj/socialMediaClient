import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import SuggestedUsers from './SuggestedUsers';
import { getSelf } from '@/redux/slice/auth.slice';

const RightSidebar = () => {
  const  user  = useSelector(getSelf);
  return (
    <div className='pr-40 my-10 w-fit'>
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
      <SuggestedUsers/>
    </div>
  )
}

export default RightSidebar