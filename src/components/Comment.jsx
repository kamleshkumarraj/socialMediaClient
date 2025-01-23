import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'

const Comment = ({ comment , postId }) => {
   
    
    return (
        <div className='my-2'>
            <div className='flex items-center gap-3'>
                <Avatar>
                    <AvatarImage src={comment?.commentCreator?.avatar} />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <h1 className='text-sm font-bold'>{comment?.commentCreator?.username} <span className='pl-1 font-normal'>{comment?.comment?.content}</span></h1>
            </div>
        </div>
    )
}

export default Comment