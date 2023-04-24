import React from "react";
import {
  Root,
  Home,
  PostLoader,
  Register,
  ProfilePage,
  Login,
} from "./components";
import UserContext from "./context/user-context";
import refreshAccessToken from "./functions/refreshToken";
import { io } from "socket.io-client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route index element={<Home />} loader={PostLoader} />
      <Route path="register" element={<Register />} />
      <Route path="profile" element={<ProfilePage />} />
      <Route path="login" element={<Login />} />
    </Route>
  )
);

function App() {
  const [user, setUser] = React.useState();
  const [socket, setSocket] = React.useState();
  React.useEffect(() => {
    async function getLocalStorage() {
      if (localStorage.getItem("user")) {
        const user = JSON.parse(localStorage.getItem("user"));

        const token = await refreshAccessToken(user.refreshToken);

        if (token) {
          return setUser({ ...user, accessToken: token });
        } else {
          setUser();
        }
      }
    }
    getLocalStorage();

    setInterval(async () => {
      if (user) {
        const token = await refreshAccessToken(user.refreshToken);
        if (token) {
          setUser({ ...user, accessToken: token });
        }
      }
    }, 600000);
  }, []);
  return (
    <UserContext.Provider value={{ user, setUser, socket, setSocket }}>
      <RouterProvider router={router} />
    </UserContext.Provider>
  );
}

export { App };
