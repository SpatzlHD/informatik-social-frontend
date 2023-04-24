import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import UserContext from "../context/user-context";

function Login() {
  const navigate = useNavigate();

  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [username, setUsername] = useState("");

  const { setUser } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = { username, password };
    const res = await axios.post("http://localhost:3001/login", user);
    console.log(res.data);
    if (res.data.code === 200) {
      setUser({
        accessToken: res.data.accessToken,
        username: res.data.username,
        userID: res.data.userID,
        profileImage: res.data.profileImage,
      });
      localStorage.setItem(
        "user",
        JSON.stringify({
          refreshToken: res.data.refreshToken,
          username: res.data.username,
          profileImage: res.data.profileImage,
          userID: res.data.userID,
        })
      );
      navigate("/");
    } else {
      setError(res.data.message);
    }
  };
  return (
    <section class="bg-white dark:bg-gray-900 h-screen">
      <div class="lg:grid lg:min-h-screen lg:grid-cols-12">
        <aside class="relative block h-16 lg:order-last lg:col-span-5 lg:h-full xl:col-span-6">
          <img
            alt="Pattern"
            src="https://images.unsplash.com/photo-1605106702734-205df224ecce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
            class="absolute inset-0 h-full w-full object-cover"
          />
        </aside>

        <main
          aria-label="Main"
          class="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6"
        >
          <div class="max-w-xl lg:max-w-3xl">
            <h1 class="mt-6 text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl md:text-4xl">
              Login to your account
            </h1>

            <form action="#" class="mt-8 grid grid-cols-6 gap-6">
              <div class="col-span-6 ">
                <label
                  for="FirstName"
                  class="block text-sm font-medium text-gray-700 dark:text-gray-200"
                >
                  Username
                </label>

                <input
                  type="text"
                  id="FirstName"
                  name="first_name"
                  class="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                />
              </div>

              <div class="col-span-6">
                <label
                  for="Password"
                  class="block text-sm font-medium text-gray-700 dark:text-gray-200"
                >
                  Password
                </label>

                <input
                  type="password"
                  id="Password"
                  name="password"
                  class="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </div>

              <div class="col-span-6 sm:flex sm:items-center sm:gap-4">
                <button
                  class="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500 dark:hover:bg-blue-700 dark:hover:text-white"
                  onClick={(e) => handleSubmit(e)}
                >
                  Login
                </button>

                <p class="mt-4 text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
                  Don't have an account?
                  <Link
                    to="/register"
                    class="text-gray-700 ml-1 underline dark:text-gray-200"
                  >
                    Register
                  </Link>
                  .
                </p>
              </div>
            </form>
          </div>
        </main>
      </div>
    </section>
  );
}

export default Login;
