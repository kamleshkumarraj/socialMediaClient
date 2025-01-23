import { getMiscData, setCommentOpen, setSelectedPostForReaction } from '@/redux/slice/misc.slice'
import { useCreateCommentMutation, useLazyGetCommentForPostQuery } from '@/redux/slice/userApi.slice'
import { updateToast } from '@/utils/updateToast.utils'
import { MoreHorizontal } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import Comment from './Comment'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog'

const CommentDialog = () => {
  const {isCommentOpen , selectedPostForReaction} = useSelector(getMiscData)
  const [getCommentData , {data : comment }] = useLazyGetCommentForPostQuery(selectedPostForReaction?._id)

  useEffect(() => {
    if(isCommentOpen && selectedPostForReaction){
      getCommentData(selectedPostForReaction?._id);
    }
  },[isCommentOpen])

  
  // code for creating comment
  const [commentMessage , setCommentMessage] = useState("")
  const [createComment] = useCreateCommentMutation()
  
  const createCommentHandler = async (e) => {
    e.preventDefault();
      if(!commentMessage) {
          toast.error("All fields are required");
          return;
      }
      const data = {
          postId : selectedPostForReaction?._id,
          commentMessage
      }
      const toastId = toast.loading("comment creating...");
      try {
          const response = await createComment(data);
          if(response?.data?.success){
              updateToast({toastId , message : response?.data?.message || "Comment created successfully" , type : "success"});
          }else{
              updateToast({toastId , message : response?.data?.message || "Something went wrong" , type : "error"});
          }
      } catch (error) {
          updateToast({toastId , message : error?.data?.message || "Something went wrong" , type : "error"});
      }
  }
  const dispatch = useDispatch();
  
  return (
    <Dialog open={isCommentOpen}>
      <DialogContent onInteractOutside={() => {
        dispatch(setCommentOpen(false))
        dispatch(setSelectedPostForReaction(null))
      }} className="flex flex-col max-w-5xl p-0">
        <div className='flex flex-1'>
          <div className='w-[40rem]'>
            <img
              src={selectedPostForReaction?.images?.url}
              alt="post_img"
              className='object-cover w-[40rem] h-[40rem] rounded-l-lg'
            />
          </div>
          <div className='flex flex-col justify-between w-1/2'>
            <div className='flex items-center justify-between p-4'>
              <div className='flex items-center gap-3'>
                <Link>
                  <Avatar>
                    <AvatarImage src={selectedPostForReaction?.creatorDetails?.avatar?.url} />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </Link>
                <div>
                  <Link className='text-xs font-semibold'>{selectedPostForReaction?.creatorDetails?.username}</Link>
                  {/* <span className='text-sm text-gray-600'>Bio here...</span> */}
                </div>
              </div>

              <Dialog>
                <DialogTrigger asChild>
                  <MoreHorizontal className='cursor-pointer' />
                </DialogTrigger>
                <DialogContent className="flex flex-col items-center text-sm text-center">
                  <div className='cursor-pointer w-full text-[#ED4956] font-bold'>
                    Unfollow
                  </div>
                  <div className='w-full cursor-pointer'>
                    Add to favorites
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            <hr />
            <div className='flex-1 p-4 overflow-y-auto max-h-96'>
              {
                comment && comment?.map((comment) => <Comment key={comment._id} comment={comment} />)
              }
            </div>
            <div className='p-4'>
              <div className='flex items-center gap-2'>
                <form action="" onSubmit={createCommentHandler} >
                <input type="text" value={commentMessage} onChange={(e) => setCommentMessage(e.target.value)}  placeholder='Add a comment...' className='w-full p-2 text-sm border border-gray-300 rounded outline-none' />
                <Button   variant="outline">Send</Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default CommentDialog