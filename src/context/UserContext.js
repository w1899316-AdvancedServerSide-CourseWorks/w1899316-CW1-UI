import React, { createContext, useContext, useState, useEffect } from 'react';
import { getSessionUser } from '../services/authService';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userInfo = await getSessionUser();
        console.log('👤 [UserContext] Logged-in user:', userInfo);
        setUser(userInfo);
      } catch (err) {
        setUser(null);
        console.warn('⚠️ [UserContext] Failed to load user');
      } finally {
        setLoadingUser(false);
      }
    };

    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, loadingUser }}>
      {children}
    </UserContext.Provider>
  );
};
