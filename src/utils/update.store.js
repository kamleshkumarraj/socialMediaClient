import { userApi } from "@/redux/slice/userApi.slice";

export const updateCreateLike = ({ dispatch, data, type }) => {
  dispatch(
    userApi.util.updateQueryData("getAllPosts", undefined, (draft) => {
      Object.entries(draft).forEach(([key]) => {
        draft[key].map((post) => {
          if (post._id.toString() === data.postId.toString()) {
            if (type === "like") {
              post.reactions.push(data.creator);
              post.likesCount = post?.likesCount + 1;
            } else {
              post.reactions = post?.reactions?.filter(
                (reaction) => reaction?.toString() !== data?.creator?.toString()
              );
              if (post.likesCount > 0) post.likesCount = post.likesCount - 1;
            }
          }
        });
      });
    })
  );
};
