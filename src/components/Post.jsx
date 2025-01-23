
import { Bookmark, MessageCircle, MoreHorizontal, Send } from 'lucide-react'
import { useState } from 'react'
import { FaHeart, FaRegHeart } from "react-icons/fa"
import { useDispatch, useSelector } from 'react-redux'
// import CommentDialog from './CommentDialog'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog'
import PropTypes from 'prop-types'
import { getSelf } from '@/redux/slice/auth.slice'
import CommentDialog from './CommentDialog'
import { setCommentOpen, setSelectedPostForReaction } from '@/redux/slice/misc.slice'

const Post = ({post}) => {
    const [text, setText] = useState("");
    const [open, setOpen] = useState(false);
    // const { user } = useSelector(store => store.auth);
    const user= useSelector(getSelf)
    // const isLiked = isLiked(user.id , post.reactions)
    const [liked, setLiked] = useState(post?.reactions?.includes(user?._id) || false);
    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        const inputText = e.target.value;
        if (inputText.trim()) {
            setText(inputText);
        } else {
            setText("");
        }
    }
   
    return (
        <div className='w-[34rem]  mx-auto my-8'>
            <div className='flex items-center justify-between'>
                <div className='flex items-center gap-2'>
                    <Avatar>
                        <AvatarImage src={post?.creatorDetails?.avatar?.url} alt="post_image" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div className='flex items-center gap-3'>
                        <h1>{post?.creatorDetails?.creatorName}</h1>
                       {user?._id === post?.creatorDetails?._id &&  <Badge variant="secondary">Author</Badge>}
                    </div>
                </div>
                <Dialog>
                    <DialogTrigger asChild>
                        <MoreHorizontal className='cursor-pointer' />
                    </DialogTrigger>
                    <DialogContent className="flex flex-col items-center text-sm text-center">
                        {
                        post?.creatorDetails?._id !== user?._id && <Button variant='ghost' className="cursor-pointer w-fit text-[#ED4956] font-bold">Unfollow</Button>
                        }
                        
                        <Button variant='ghost' className="cursor-pointer w-fit">Add to favorites</Button>
                        {
                            user && user?._id === post?.creatorDetails?._id && <Button variant='ghost' className="cursor-pointer w-fit">Delete</Button>
                        }
                    </DialogContent>
                </Dialog>
            </div>
            <img
                className='object-cover min-w-[34rem] my-2 rounded-sm aspect-square'
                src={post.images.url}
                alt="post_img"
            />

            <div className='flex items-center justify-between my-2'>
                <div className='flex items-center gap-3'>
                    {
                        liked ? <FaHeart  size={'24'} className='text-red-600 cursor-pointer' /> : <FaRegHeart  size={'22px'} className='cursor-pointer hover:text-gray-600' />
                    }

                    <MessageCircle onClick={() => {
                        dispatch(setCommentOpen(true));
                        dispatch(setSelectedPostForReaction(post))
                    }} className='cursor-pointer hover:text-gray-600' />
                    <Send className='cursor-pointer hover:text-gray-600' />
                </div>
                <Bookmark className='cursor-pointer hover:text-gray-600' />
            </div>
            <span className='block mb-2 font-medium'>{post?.likesCount} likes</span>
            <p>
                <span className='mr-2 font-medium'>{post?.creatorDetails?.username}</span>
                {post?.content}
            </p>
            {
                post?.commentsCount > 0 && (
                    <span onClick={() => {
                        setOpen(true);
                    }} className='text-sm text-gray-400 cursor-pointer'>View all {post?.commentsCount} comments</span>
                )
            }
            
            <div className='flex items-center justify-between'>
                <input
                    type="text"
                    placeholder='Add a comment...'
                    value={text}
                    onChange={changeEventHandler}
                    className='w-full text-sm outline-none'
                />
                {
                    text && <span  className='text-[#3BADF8] cursor-pointer'>Post</span>
                }

            </div>
        </div>
    )
}

Post.propTypes = {
    post: PropTypes.object.isRequired
}

export default Post