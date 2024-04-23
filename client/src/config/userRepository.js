const KEY = "authUser";

export const createUserRepository = () => ({
  getUser: () => {
    const user = localStorage.getItem(KEY);

    return user ? JSON.parse(user) : null;
  },
  setUser: (user) => {
    localStorage.setItem(KEY, JSON.stringify(user));
  },
  removeUser: () => {
    localStorage.removeItem(KEY);
  },
});

export const userRepository = createUserRepository();