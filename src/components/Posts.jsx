import { useGetAllPostsQuery } from '@/redux/slice/userApi.slice';
import Post from './Post';
import { useSelector } from 'react-redux';
import { getSelf } from '@/redux/slice/auth.slice';
import { useEffect } from 'react';

const Posts = () => {
  const {data : posts = [] , isLoading : isPostLoading , isError : isPostError , refetch : postRefetch} = useGetAllPostsQuery();
  const user = useSelector(getSelf);

  useEffect(() => {postRefetch()}, [user])
  return (
    <div>
        {
          !isPostLoading && !isPostError && posts?.allPosts?.length > 0 && posts?.allPosts?.map((post) => <Post key={post._id} post={post}/>)
        }
    </div>
  )
}

export default Posts