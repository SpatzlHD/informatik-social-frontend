import { useState, useContext, useEffect } from "react";
import UserContext from "../context/user-context";
import { Link } from "react-router-dom";

function PostCard({ post, likedTrue }) {
  const { socket } = useContext(UserContext);
  //check if user has liked the post

  const [liked, setLiked] = useState(likedTrue);

  const [likes, setLikes] = useState(post.likes.length);

  const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

  const handleLike = () => {
    if (!socket.connected) {
      socket.connect();
    }

    if (liked) {
      setLiked(false);
      setLikes((prev) => prev - 1);
      socket.emit("unlike", { postID: post._id });
    } else {
      setLiked(true);
      setLikes((prev) => prev + 1);
      socket.emit("like", { postID: post._id });
    }
  };
  return (
    <div class="flex items-start px-4 py-6" key={post._id}>
      <Link to={`/profile?p=${post.user.id}`}>
        <img
          class="w-12 h-12 rounded-full object-cover mr-4 shadow"
          src={post.user.profileImage}
          alt="avatar"
        />
      </Link>

      <div class="">
        <div class="flex items-center">
          <h2 class="text-lg font-semibold text-white -mt-1">
            {post.user.username}
          </h2>
          {post.user.verified && (
            <img
              src="https://cdn.discordapp.com/attachments/970742901845917706/1100093504388071565/icons8-verified-badge-48.png"
              alt=""
              className="w-5 h-5 ml-1"
            />
          )}

          <small class="text-sm text-gray-400 ml-2">
            {rtf.format(
              Math.round(
                (new Date().getTime() - new Date(post.createdAt)) /
                  1000 /
                  60 /
                  60 /
                  24
              ),
              "second"
            )}
          </small>
        </div>

        <p class=" text-white">{post.content}</p>

        <div class="mt-4 flex items-center">
          {!liked ? (
            <button class="flex  text-white text-sm mr-3" onClick={handleLike}>
              <svg
                fill="none"
                viewBox="0 0 24 24"
                class="w-4 h-4 mr-1"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
              <span>{likes}</span>
            </button>
          ) : (
            <button class="flex  text-white text-sm mr-3" onClick={handleLike}>
              <svg
                fill="currentColor"
                viewBox="0 0 24 24"
                class="w-4 h-4 mr-1"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
              <span>{likes}</span>
            </button>
          )}

          <div class="flex mr-2 text-white text-sm ">
            <svg
              fill="none"
              viewBox="0 0 24 24"
              class="w-4 h-4 mr-1"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
              />
            </svg>
            <span>{post.comments.length}</span>
          </div>
          <button
            class="flex mr-2 text-white text-sm "
            onClick={() => {
              navigator.clipboard.writeText(
                window.location.href + "post/" + post._id
              );
            }}
          >
            <svg
              fill="none"
              viewBox="0 0 24 24"
              class="w-4 h-4 mr-1"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
              />
            </svg>
            <span>share</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default PostCard;
