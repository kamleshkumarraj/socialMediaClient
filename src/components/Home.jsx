import React from 'react'
import Feed from './Feed'
import { Outlet } from 'react-router-dom'
import RightSidebar from './RightSidebar'
import useGetAllPost from '@/hooks/useGetAllPost'
import useGetSuggestedUsers from '@/hooks/useGetSuggestedUsers'
import CommentDialog from './CommentDialog'
import { useSelector } from 'react-redux'
import { getMiscData } from '@/redux/slice/misc.slice'

const Home = () => {
    useGetAllPost();
    useGetSuggestedUsers();
    const  { isCommentOpen , selectedPostForReaction }  = useSelector(getMiscData);
    console.log(isCommentOpen , selectedPostForReaction)
    return (
        <div className='flex justify-start'>
        <div id="comment-dialog" className={`${isCommentOpen ? 'block' : 'hidden'} absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]`} >
        {isCommentOpen && <CommentDialog selectedPost={selectedPostForReaction} />}
        </div>
            <div className='flex-grow'>
                <Feed />
            </div>
            <RightSidebar />
        </div>
    )
}

export default Home