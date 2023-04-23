import { Outlet, Link, useLocation } from "react-router-dom";
import UserContext from "../context/user-context";
import { useContext, useState } from "react";
import axios from "axios";

function Root() {
  const location = useLocation();
  const { user } = useContext(UserContext);
  const { pathname } = location;
  const [modal, setModal] = useState(false);
  const [post, setPost] = useState({
    content: "",
    createdAt: "",
  });

  const handlePostChange = (e) => {
    if (e.target.value.length <= 280) {
      setPost({ ...post, content: e.target.value });
    } else {
      setPost({ ...post, content: e.target.value.substring(0, 280) });
    }
  };

  console.log(user);

  const handlePostSubmit = (e) => {
    e.preventDefault();
    const postData = {
      content: post.content,
      createdAt: new Date().toISOString(),
    };
    setPost({
      content: "",
      createdAt: "",
    });
    setModal(false);
    axios({
      method: "post",
      url: "http://localhost:3001/posts",
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
      data: postData,
    });
  };

  if (pathname === "/login" || pathname === "/register") {
    return <Outlet />;
  } else if (!user) {
    return (
      <>
        <header aria-label="Page Header" class="bg-slate-800">
          <div class="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
            <div class="flex items-center justify-end gap-4">
              <div class="flex items-center gap-4">
                <div class="relative">
                  <label class="sr-only" for="search">
                    {" "}
                    Search{" "}
                  </label>

                  <input
                    class="h-10 w-full rounded-full border-none bg-white pe-10 ps-4 text-sm shadow-sm sm:w-56"
                    id="search"
                    type="search"
                    placeholder="Search website..."
                  />

                  <button
                    type="button"
                    class="absolute end-1 top-1/2 -translate-y-1/2 rounded-full bg-gray-50 p-2 text-gray-600 transition hover:text-gray-700"
                  >
                    <span class="sr-only">Search</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              <span
                aria-hidden="true"
                class="block h-6 w-px rounded-full bg-gray-200"
              ></span>

              <Link to={"/login"} class="block shrink-0">
                <span class="sr-only">Profile</span>
                <img
                  alt="Not logged in"
                  src="https://cdn.discordapp.com/attachments/1034126648422969385/1042174934291595334/icons_Person.png"
                  class="h-10 w-10 rounded-full object-cover"
                />
              </Link>
            </div>

            <div class="mt-8">
              <h1 class="text-2xl font-bold text-white sm:text-3xl">
                Login to gain full access to the website
              </h1>
              <Link
                class="mt-3 inline-block rounded bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-[2px] hover:text-white focus:outline-none focus:ring active:text-opacity-75"
                to="/register"
              >
                <span class="block rounded-sm bg-slate-800 text-white px-8 py-3 text-sm font-medium hover:bg-transparent">
                  Register
                </span>
              </Link>
              <Link
                class="ml-3 inline-block rounded-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-[2px] hover:text-white focus:outline-none focus:ring active:text-opacity-75"
                to="/login"
              >
                <span class="block rounded-full bg-slate-800 text-white px-8 py-3 text-sm font-medium hover:bg-transparent">
                  Login
                </span>
              </Link>
            </div>
          </div>
        </header>
        <main>
          <Outlet />
        </main>
      </>
    );
  } else {
    return (
      <>
        <header aria-label="Page Header" class="bg-slate-800">
          <div class="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
            <div class="flex items-center justify-end gap-4">
              <div class="flex items-center gap-4">
                <div class="relative">
                  <label class="sr-only" for="search">
                    {" "}
                    Search{" "}
                  </label>

                  <input
                    class="h-10 w-full rounded-full border-none bg-white pe-10 ps-4 text-sm shadow-sm sm:w-56"
                    id="search"
                    type="search"
                    placeholder="Search website..."
                  />

                  <button
                    type="button"
                    class="absolute end-1 top-1/2 -translate-y-1/2 rounded-full bg-gray-50 p-2 text-gray-600 transition hover:text-gray-700"
                  >
                    <span class="sr-only">Search</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              <span
                aria-hidden="true"
                class="block h-6 w-px rounded-full bg-gray-200"
              ></span>

              <a href="#" class="block shrink-0">
                <span class="sr-only">Profile</span>
                <img
                  alt="Man"
                  src={user.profileImage}
                  class="h-10 w-10 rounded-full object-cover"
                />
              </a>
            </div>

            <div class="mt-8">
              <h1 class="text-2xl font-bold text-white sm:text-3xl">
                Welcome back, {user.username}!
              </h1>

              <p class="mt-1.5 text-sm text-white">
                You are currently logged in as {user.username}
              </p>
            </div>
          </div>
        </header>
        <main className="bg-slate-900">
          <Outlet />
          {modal && (
            <div class="bg-slate-800 bg-opacity-50 flex justify-center items-center absolute top-0 right-0 bottom-0 left-0 ">
              <form>
                <div class="w-96 mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 shadow-lg shadow-slate-600">
                  <div class="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
                    <label for="post" class="sr-only">
                      Write a post
                    </label>
                    <textarea
                      id="post"
                      rows="4"
                      class="w-full px-0 h-40 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400 resize-none"
                      placeholder="Tell us what you think..."
                      value={post.content}
                      onChange={(e) => {
                        handlePostChange(e);
                      }}
                      required
                    ></textarea>
                    <p class="text-xs text-gray-500 dark:text-gray-400  bottom-10 right-10">
                      {post.content.length}/280
                    </p>
                  </div>
                  <div class="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600">
                    <button
                      type="button"
                      onClick={(e) => {
                        handlePostSubmit(e);
                      }}
                      class="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
                    >
                      Post
                    </button>
                  </div>
                </div>
              </form>
            </div>
          )}

          <div className=" fixed bottom-10 right-10">
            <button
              class="inline-flex items-center justify-center w-10 h-10 mr-2 text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded-lg focus:shadow-outline hover:bg-indigo-800"
              onClick={() => setModal(true)}
            >
              <svg class="w-4 h-4 fill-current" viewBox="0 0 20 20">
                <path
                  d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                  clip-rule="evenodd"
                  fill-rule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
        </main>
      </>
    );
  }
}

export default Root;
