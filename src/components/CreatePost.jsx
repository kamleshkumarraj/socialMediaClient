import { readFileAsDataURL } from '@/lib/utils';
import { getSelf } from '@/redux/slice/auth.slice';
import { Loader2 } from 'lucide-react';
import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader } from './ui/dialog';
import { Textarea } from './ui/textarea';

const CreatePost = ({ open, setOpen }) => {
  const imageRef = useRef();
  const [file, setFile] = useState("");
  const [caption, setCaption] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState(false);
  const user = useSelector(getSelf);
  const posts = [];
  const dispatch = useDispatch();

  const fileChangeHandler = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setFile(file);
      const dataUrl = await readFileAsDataURL(file);
      setImagePreview(dataUrl);
    }
  }



  return (
    <Dialog open={open}>
      <DialogContent onInteractOutside={() => setOpen(false)}>
        <DialogHeader className='font-semibold text-center'>Create New Post</DialogHeader>
        <div className='flex items-center gap-3'>
          <Avatar>
            <AvatarImage src={user?.profilePicture} alt="img" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div>
            <h1 className='text-xs font-semibold'>{user?.username}</h1>
            <span className='text-xs text-gray-600'>Bio here...</span>
          </div>
        </div>
        <Textarea value={caption} onChange={(e) => setCaption(e.target.value)} className="border-none focus-visible:ring-transparent" placeholder="Write a caption..." />
        {
          imagePreview && (
            <div className='flex items-center justify-center w-full h-64'>
              <img src={imagePreview} alt="preview_img" className='object-cover w-full h-full rounded-md' />
            </div>
          )
        }
        <input ref={imageRef} type='file' className='hidden' onChange={fileChangeHandler} />
        <Button onClick={() => imageRef.current.click()} className='w-fit mx-auto bg-[#0095F6] hover:bg-[#258bcf] '>Select from computer</Button>
        {
          imagePreview && (
            loading ? (
              <Button>
                <Loader2 className='w-4 h-4 mr-2 animate-spin' />
                Please wait
              </Button>
            ) : (
              <Button  type="submit" className="w-full">Post</Button>
            )
          )
        }
      </DialogContent>
    </Dialog>
  )
}

export default CreatePost