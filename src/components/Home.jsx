import { useLoaderData } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import UserContext from "../context/user-context";
import { PostCard } from "./";

function Home() {
  const data = useLoaderData();
  const { socket, user } = useContext(UserContext);

  const [posts, setPosts] = useState(data);

  useEffect(() => {
    if (socket) {
      socket.on("newPostData", (newPost) => {
        setPosts((prev) => [newPost, ...prev]);
      });
      socket.on("likeAdd", (data) => {
        console.log(data);
        const id = data._id;
        setPosts((prev) => {
          const post = prev.find((post) => post._id === id);
          post.likes = data.likes;
          //keep the posts in order by date
          prev.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          console.log(post);
          return [...prev];
        });
      });

      socket.on("likeRemove", (data) => {
        const id = data._id;
        setPosts((prev) => {
          const post = prev.find((post) => post._id === id);
          post.likes = data.likes;
          return [...prev];
        });
      });
    }
  }, [socket]);

  return (
    <div className=" bg-slate-900  py-3 mb-0">
      <ul>
        {posts.map((post) => (
          <li class="flex bg-slate-500 bg-opacity-30 shadow-lg rounded-lg mx-4 md:mx-auto mt-3 max-w-md md:max-w-2xl ">
            <PostCard
              post={post}
              likedTrue={
                user && post.likes.includes(user.userID) ? true : false
              }
              key={post._id}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

//post loader
async function PostLoader() {
  console.log("Fetching posts from backend API...");
  const data = await fetch(
    process.env.NODE_ENV === "development"
      ? "http://localhost:3001/posts/all"
      : "https://api.axexanderkoegel.xyz/posts/all"
  ).then((res) => res.json());

  console.log(data);
  return data;
}

export { Home, PostLoader };
