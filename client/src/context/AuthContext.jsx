import { userRepository } from "../config/userRepository";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(undefined);

export const AuthContextProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(userRepository.getUser() || null);
  const [role, setRole] = useState("");
  const [firstName, setFirstName] = useState("");

  useEffect(() => {
    const userFromStorage = userRepository.getUser();
    if (userFromStorage) {
      setAuthUser(userFromStorage);
      setRole(userFromStorage.role);
      setFirstName(userFromStorage.firstName);
    }
  }, []); //вот то добавил

  const authUserChangeHandler = (user) => {
    setAuthUser(user);
    setRole(user ? user.role : null);
    setFirstName(user ? user.firstName : null);
    user ? userRepository.setUser(user) : userRepository.removeUser();
  };

  return (
    <AuthContext.Provider
      value={{ user: authUser, role, firstName, authUserChangeHandler }}
    >
      {children}
    </AuthContext.Provider>
  );
};
// Consumers
//возвращаем контекст
export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (context == null) {
    throw new Error(
      "useAuthContext should be used within a AuthContextProvider"
    );
  }

  return context;
};
