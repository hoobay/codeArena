import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then((res) => {
      setUser(res.data?.session?.user || null);
      setReady(true);
    });

    const listener = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => {
      listener.data.subscription.unsubscribe();
    };
  }, []);

  const login = (email, password) => {
    return supabase.auth.signInWithPassword({ email, password });
  };

  const register = (email, password, username) => {
    return supabase.auth.signUp({
      email,
      password,
      options: { data: { username } }
    });
  };

  const logout = () => {
    return supabase.auth.signOut();
  };

  if (!ready) return null;

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
