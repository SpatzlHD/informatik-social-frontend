import React from "react";
import { Root, Home, PostLoader, Register } from "./components";
import UserContext from "./context/user-context";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import axios from "axios";
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route index element={<Home />} loader={PostLoader} />
      <Route path="register" element={<Register />} />
    </Route>
  )
);
function App() {
  const [user, setUser] = React.useState(null);
  React.useEffect(() => {
    if (localStorage.getItem("user")) {
      setUser(JSON.parse(localStorage.getItem("user")));
    }
    setInterval(() => {
      if (user) {
        axios
          .post(
            process.env.NODE_ENV === "development"
              ? "http://localhost:30001/token"
              : "https://api.alexanderkoegel.xyz/token",
            { token: user.refresh_tokem }
          )
          .then((res) => {
            const newUser = {
              ...user,
              accessToken: res.data.accessToken,
            };
            setUser(newUser);
          });
      }
    }, 600000);
  }, []);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <RouterProvider router={router} />
    </UserContext.Provider>
  );
}

export default App;
