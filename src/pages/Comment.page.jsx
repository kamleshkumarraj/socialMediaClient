// React and Tailwind CSS Example for Comment Section
import React, { useState } from 'react';

const CommentSection = () => {
  const [comments, setComments] = useState([
    {
      id: 1,
      text: "When my friend says I am stronger than you 🤔💪",
      likes: 5,
      replies: [
        { id: 1, text: "🔥🔥🔥", likes: 3 },
        { id: 2, text: "💪👊", likes: 1 },
      ],
    },
  ]);

  const [newComment, setNewComment] = useState("");

  const handleAddComment = () => {
    if (newComment.trim()) {
      setComments([
        ...comments,
        { id: Date.now(), text: newComment, likes: 0, replies: [] },
      ]);
      setNewComment("");
    }
  };

  const handleAddReply = (commentId, replyText) => {
    setComments(
      comments.map((comment) =>
        comment.id === commentId
          ? {
              ...comment,
              replies: [
                ...comment.replies,
                { id: Date.now(), text: replyText, likes: 0 },
              ],
            }
          : comment
      )
    );
  };

  const handleLike = (commentId, replyId = null) => {
    setComments(
      comments.map((comment) => {
        if (comment.id === commentId) {
          if (replyId) {
            return {
              ...comment,
              replies: comment.replies.map((reply) =>
                reply.id === replyId
                  ? { ...reply, likes: reply.likes + 1 }
                  : reply
              ),
            };
          } else {
            return { ...comment, likes: comment.likes + 1 };
          }
        }
        return comment;
      })
    );
  };

  return (
    <div className="max-w-xl p-4 mx-auto">
      <h1 className="mb-4 text-2xl font-bold">Comments</h1>

      {/* Add Comment Section */}
      <div className="mb-4">
        <textarea
          className="w-full p-2 border rounded-md"
          placeholder="Write a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        ></textarea>
        <button
          className="px-4 py-2 mt-2 text-white bg-blue-500 rounded-md"
          onClick={handleAddComment}
        >
          Post Comment
        </button>
      </div>

      {/* Display Comments */}
      {comments.map((comment) => (
        <div key={comment.id} className="pb-4 mb-4 border-b">
          <div className="flex items-start justify-between">
            <p>{comment.text}</p>
            <button
              className="text-blue-500"
              onClick={() => handleLike(comment.id)}
            >
              👍 {comment.likes}
            </button>
          </div>

          {/* Replies */}
          <div className="mt-2 ml-4">
            {comment.replies.map((reply) => (
              <div key={reply.id} className="flex items-start justify-between mb-2">
                <p>{reply.text}</p>
                <button
                  className="text-blue-500"
                  onClick={() => handleLike(comment.id, reply.id)}
                >
                  👍 {reply.likes}
                </button>
              </div>
            ))}
            <AddReply
              onAddReply={(replyText) => handleAddReply(comment.id, replyText)}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

const AddReply = ({ onAddReply }) => {
  const [replyText, setReplyText] = useState("");

  const handleReply = () => {
    if (replyText.trim()) {
      onAddReply(replyText);
      setReplyText("");
    }
  };

  return (
    <div className="flex items-center mt-2">
      <input
        type="text"
        className="flex-1 p-2 border rounded-md"
        placeholder="Write a reply..."
        value={replyText}
        onChange={(e) => setReplyText(e.target.value)}
      />
      <button
        className="px-4 py-2 ml-2 text-white bg-green-500 rounded-md"
        onClick={handleReply}
      >
        Reply
      </button>
    </div>
  );
};

export default CommentSection;
