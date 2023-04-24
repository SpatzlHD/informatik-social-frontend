import { createContext } from "react";

const UserContext = createContext({
  user: null,
  setUser: () => {},
  socket: null,
  setSocket: () => {},
});

export default UserContext;
