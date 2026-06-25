import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  businessName: string;
  role: 'business' | 'admin';
}

export interface RegisterData {
  name: string;
  businessName: string;
  email: string;
  password: string;
}

interface AuthContextValue {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);
const STORAGE_KEY = 'upranko_auth_user';

const MOCK_USERS = [
  { id: '1', email: 'demo@upranko.com', password: 'demo123', name: 'Birinder Singh', businessName: 'Upranko Cafe', role: 'business' as const },
  { id: '2', email: 'test@business.com', password: 'test123', name: 'Ravi Kumar', businessName: 'Ravi Restaurant', role: 'business' as const },
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setUser(JSON.parse(stored));
    } catch { /* ignore */ }
    setIsLoading(false);
  }, []);

  async function login(email: string, password: string) {
    await new Promise(r => setTimeout(r, 800));
    const found = MOCK_USERS.find(u => u.email === email && u.password === password);
    if (!found) throw new Error('Invalid email or password');
    const authUser: AuthUser = { id: found.id, email: found.email, name: found.name, businessName: found.businessName, role: found.role };
    setUser(authUser);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(authUser));
  }

  async function register(data: RegisterData) {
    await new Promise(r => setTimeout(r, 800));
    if (MOCK_USERS.find(u => u.email === data.email)) throw new Error('Email already registered');
    const authUser: AuthUser = { id: Date.now().toString(), email: data.email, name: data.name, businessName: data.businessName, role: 'business' };
    setUser(authUser);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(authUser));
  }

  function logout() {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
