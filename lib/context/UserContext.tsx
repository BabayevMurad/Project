import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface User {
  name: string;
  bio: string;
  avatar: string;
}

interface UserContextType {
  user: User;
  setUser: (user: User) => void;
}

const defaultUser: User = { name: '', bio: '', avatar: '🙂' };

const UserContext = createContext<UserContextType>({
  user: defaultUser,
  setUser: () => {},
});

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUserState] = useState<User>(defaultUser);

  useEffect(() => {
    AsyncStorage.getItem('user_profile').then(data => {
      if (data) setUserState(JSON.parse(data));
    });
  }, []);

  const setUser = (newUser: User) => {
    setUserState(newUser);
    AsyncStorage.setItem('user_profile', JSON.stringify(newUser));
  };

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
