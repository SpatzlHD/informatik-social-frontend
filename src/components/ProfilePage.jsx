import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import UserContext from "../context/user-context";
import PostCard from "./PostCard";

function ProfilePage() {
  const { socket } = useContext(UserContext);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    axios
      .get(
        process.env.NODE_ENV === "development"
          ? `http://localhost:3001/user/${searchParams.get("p")}`
          : `https://alexanderkoegel.xyz/user/${searchParams.get("p")}`
      )
      .then((res) => {
        console.log(res.data);
        setUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get(
        process.env.NODE_ENV === "development"
          ? `http://localhost:3001/user/${searchParams.get("p")}/posts`
          : `https://alexanderkoegel.xyz/user/${searchParams.get("p")}/posts`
      )
      .then((res) => {
        console.log(res.data);
        setPosts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    if (socket) {
      if (!socket.connected) {
        socket.connect();
      }

      socket.on("newPostData", (data) => {
        console.log(data);
        if (data.user.id === searchParams.get("p")) {
          setPosts((prev) => [data, ...prev]);
        }
      });
    }
  }, []);
  return (
    <>
      <header aria-label="Page Header" className="bg-slate-800">
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
          <div className="sm:flex sm:items-center sm:justify-between">
            <div className="flex items-center">
              <img
                src={user.profileImage}
                alt="Profile Image"
                className="h-44 w-44 rounded-full object-cover sm:h-56 sm:w-56 mr-3"
              />

              <div className="flex items-center">
                <h1 className="text-2xl font-bold text-white sm:text-3xl">
                  {user.username}
                </h1>
                {user.verified && (
                  <img
                    src="https://cdn.discordapp.com/attachments/970742901845917706/1100093504388071565/icons8-verified-badge-48.png"
                    alt=""
                    className="w-5 h-5 ml-1 mt-[0.30rem]"
                  />
                )}
              </div>
            </div>

            <div className="mt-4 flex flex-col gap-4 sm:mt-0 sm:flex-row sm:items-center">
              <button
                className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-gray-200 bg-white px-5 py-3 text-gray-500 transition hover:text-gray-700 focus:outline-none focus:ring"
                type="button"
                onClick={() => {
                  navigate("/");
                }}
              >
                <span className="text-sm font-medium"> Go Back </span>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>
      <main className="bg-slate-800 h-full">
        <div className=" bg-slate-900  py-3 mb-0">
          <ul>
            {posts.map((post) => (
              <li class="flex bg-slate-500 bg-opacity-30 shadow-lg rounded-lg mx-4 md:mx-auto mt-3 max-w-md md:max-w-2xl ">
                <PostCard post={post} key={post._id} />
              </li>
            ))}
          </ul>
        </div>
      </main>
    </>
  );
}

export default ProfilePage;
