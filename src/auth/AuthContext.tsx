import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import {doc, setDoc ,getDoc} from "firebase/firestore";
import { auth,  db } from '../Firebase';
import { signInWithEmailAndPassword ,createUserWithEmailAndPassword } from 'firebase/auth';
import { sendPasswordResetEmail } from 'firebase/auth';

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  businessName: string;
  role: 'user' | 'business' | 'owner';
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
  login: (email: string, password: string) => Promise<AuthUser>;
  loginWithSocial: (socialUser: {
    name: string;
    email: string;
  }) => Promise<AuthUser>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  resetPassword: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);
const STORAGE_KEY = 'upranko_auth_user';



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
    async function login(email: string, password: string): Promise<AuthUser> {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );

  const uid = userCredential.user.uid;

  const docRef = doc(db, "users", uid);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    throw new Error("User data not found");
  }

  const data = docSnap.data();

  const authUser: AuthUser = {
    id: uid,
    email: data.email,
    name: data.name,
    businessName: data.businessName,
    role: data.role,
  };

  setUser(authUser);

  localStorage.setItem(STORAGE_KEY, JSON.stringify(authUser));

  return authUser;
}
    async function loginWithSocial(socialUser: { 
      name: string; 
      email: string
     }): Promise<AuthUser> {
      const uid = auth.currentUser?.uid;
      if(!uid){
        throw new Error ('user not authenticated')
      }
        const userRef = doc(db, "users" , uid );
        const snap = await getDoc(userRef);
        if(!snap.exists()){
          await setDoc(userRef , {
            name : socialUser.name,
            email : socialUser.email,
            businessName : "",
            role : "user"
          })
        }
        const finalSnap = await getDoc(userRef);
        const data = finalSnap.data()!;

        const authUser: AuthUser = {
          id: uid,
          email: data.email,
          name:data.name,
          businessName: data.busniessName,
          role: data.role
        }
        setUser(authUser);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(authUser));
        return authUser;
      }




       const resetPassword = async (email: string) => {
        return sendPasswordResetEmail(auth, email);
       };
  async function register(data: RegisterData) {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    data.email,
    data.password
  );

  const uid = userCredential.user.uid;

  await setDoc(doc(db, "users", uid), {
    email: data.email,
    name: data.name,
    businessName: "",
    role: "business",
  });
}

  function logout() {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading, login,  loginWithSocial,register, logout, resetPassword }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
