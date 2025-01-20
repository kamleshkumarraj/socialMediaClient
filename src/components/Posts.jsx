import Post from './Post';

const Posts = () => {
  const posts = [ 
    {
    _id : 1,
    author : {
        username : "Kamlesh Kumar",
        profilePicture : "https://via.placeholder.com/150",
        _id : 2
    },
    image : "https://img.freepik.com/free-photo/abstract-autumn-beauty-multi-colored-leaf-vein-pattern-generated-by-ai_188544-9871.jpg"
}, 
{
  _id : 1,
  author : {
      username : "Kamlesh Kumar",
      profilePicture : "https://via.placeholder.com/150",
      _id : 2
  },
  image : "https://pixlr.com/images/generator/how-to-generate.webp"
}, 
];
  return (
    <div>
        {
            posts.map((post) => <Post key={post._id} post={post}/>)
        }
    </div>
  )
}

export default Posts