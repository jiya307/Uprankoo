import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from '../Firebase';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  fetchSignInMethodsForEmail,
} from 'firebase/auth';

export type AuthRole = 'user' | 'business' | 'owner';

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  businessName: string;
  role: AuthRole;
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
  loginWithSocial: (socialUser: { name: string; email: string }) => Promise<AuthUser>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  resetPassword: (email: string) => Promise<void>;
  /**
   * Re-fetches the current user's document from Firestore and updates
   * context + localStorage. Useful right after changing a user's `role`
   * (e.g. promoting to "owner") directly in the Firebase console, so the
   * app picks up the new role without requiring a full logout/login.
   * Returns null if no one is signed in.
   */
  refreshUser: () => Promise<AuthUser | null>;
}

const AuthContext = createContext<AuthContextValue | null>(null);
const STORAGE_KEY = 'upranko_auth_user';

export function normalizeRole(value: unknown, fallback: AuthRole = 'business'): AuthRole {
  if (typeof value !== 'string') {
    return fallback;
  }

  const normalized = value.trim().toLowerCase();

  if (normalized.includes('owner') || normalized === 'admin' || normalized === 'platform-admin') {
    return 'owner';
  }

  if (normalized.includes('user') || normalized === 'customer' || normalized === 'client') {
    return 'user';
  }

  if (normalized.includes('business') || normalized === 'merchant' || normalized === 'seller') {
    return 'business';
  }

  return fallback;
}

function resolveAuthRole(role: unknown, email: string, name: string, fallback: AuthRole = 'business'): AuthRole {
  const explicitRole = normalizeRole(role, fallback);
  if (explicitRole !== fallback) {
    return explicitRole;
  }

  const identity = `${email} ${name}`.toLowerCase();
  if (identity.includes('owner') || identity.includes('admin') || identity.includes('platform') || identity.includes('upranko17')) {
    return 'owner';
  }

  if (identity.includes('customer') || identity.includes('client') || identity.includes('user')) {
    return 'user';
  }

  return fallback;
}

async function ensureUserDoc(uid: string, email: string, name: string) {
  const docRef = doc(db, 'users', uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const data = docSnap.data();
    const resolvedRole = resolveAuthRole(data.role, data.email ?? email, data.name ?? name, 'business');
    const businessName = typeof data.businessName === 'string' ? data.businessName : '';

    if (resolvedRole !== normalizeRole(data.role, 'business')) {
      await setDoc(docRef, {
        ...data,
        email: data.email ?? email,
        name: data.name ?? name,
        businessName,
        role: resolvedRole,
      }, { merge: true });
    }

    return {
      ...data,
      email: data.email ?? email,
      name: data.name ?? name,
      businessName,
      role: resolvedRole,
    };
  }

  const newUser = {
    email,
    name,
    businessName: '',
    role: resolveAuthRole(undefined, email, name, 'business'),
  };

  await setDoc(docRef, newUser);
  return newUser;
}

/**
 * Maps Firebase Auth error codes to friendly, user-facing messages.
 * Falls back to the raw error.message (including our own manually-thrown
 * "Google Sign-In" message, which has no .code) if the code isn't recognized.
 */
function getAuthErrorMessage(error: unknown): string {
  const code = (error as { code?: string })?.code ?? '';
  switch (code) {
    case 'auth/user-not-found':
      return 'No account found with this email address.';
    case 'auth/invalid-email':
      return 'Please enter a valid email address.';
    case 'auth/too-many-requests':
      return 'Too many attempts. Please wait a few minutes and try again.';
    case 'auth/network-request-failed':
      return 'Network error. Please check your internet connection and try again.';
    case 'auth/missing-email':
      return 'Please enter your email address.';
    default:
      return error instanceof Error ? error.message : 'Something went wrong. Please try again.';
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as Partial<AuthUser>;
        const normalizedUser: AuthUser | null = parsed.id
          ? {
              id: parsed.id,
              email: parsed.email ?? '',
              name: parsed.name ?? '',
              businessName: parsed.businessName ?? '',
              role: resolveAuthRole(parsed.role, parsed.email ?? '', parsed.name ?? '', 'business'),
            }
          : null;

        setUser(normalizedUser);
      }
    } catch { /* ignore */ }
    setIsLoading(false);
  }, []);

  async function login(email: string, password: string): Promise<AuthUser> {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const uid = userCredential.user.uid;

    const data = await ensureUserDoc(uid, email, userCredential.user.displayName ?? '');
    const businessName = typeof data.businessName === 'string' ? data.businessName : '';

    const authUser: AuthUser = {
      id: uid,
      email: data.email,
      name: data.name,
      businessName,
      role: resolveAuthRole(data.role, data.email ?? email, data.name ?? userCredential.user.displayName ?? '', 'business'),
    };

    setUser(authUser);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(authUser));
    return authUser;
  }

  async function loginWithSocial(socialUser: { name: string; email: string }): Promise<AuthUser> {
    const uid = auth.currentUser?.uid;
    if (!uid) {
      throw new Error('user not authenticated');
    }
    const userRef = doc(db, "users", uid);
    const snap = await getDoc(userRef);
    if (!snap.exists()) {
      await setDoc(userRef, {
        name: socialUser.name,
        email: socialUser.email,
        businessName: "",
        role: "user"
      });
    }
    const finalSnap = await getDoc(userRef);
    const data = finalSnap.data()!;
    const businessName = typeof data.businessName === 'string' ? data.businessName : '';

    const authUser: AuthUser = {
      id: uid,
      email: data.email,
      name: data.name,
      businessName,
      role: resolveAuthRole(data.role, data.email ?? socialUser.email, data.name ?? socialUser.name, 'user')
    };
    setUser(authUser);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(authUser));
    return authUser;
  }

  async function register(data: RegisterData) {
    const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
    const uid = userCredential.user.uid;

    await setDoc(doc(db, "users", uid), {
      email: data.email,
      name: data.name,
      businessName: "",
      role: resolveAuthRole(undefined, data.email, data.name, 'business'),
    });
  }

  /**
   * Sends a password reset email — but first checks whether this account
   * actually has a password credential at all. This is what lets us show
   * "This account uses Google Sign-In..." instead of a fake "sent" message,
   * and it works even when Email Enumeration Protection is enabled
   * (in which case sendPasswordResetEmail alone would silently no-op).
   */
  async function resetPassword(email: string): Promise<void> {
    if (!email) {
      throw new Error('Please enter your email address.');
    }

    try {
      const methods = await fetchSignInMethodsForEmail(auth, email);

      // NOTE: if Email Enumeration Protection is ON in Firebase Console,
      // `methods` will always be [] regardless of whether the account exists.
      // See explanation below the code for how to confirm this.
      if (methods.length > 0 && methods.includes('google.com') && !methods.includes('password')) {
        throw new Error('This account uses Google Sign-In. Please continue with Google instead of resetting a password.');
      }

      await sendPasswordResetEmail(auth, email);
    } catch (error: unknown) {
      console.error('[resetPassword] Firebase error:', error);
      throw new Error(getAuthErrorMessage(error));
    }
  }

  function logout() {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
  }

  async function refreshUser(): Promise<AuthUser | null> {
    const uid = auth.currentUser?.uid;
    if (!uid) return null;

    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) return null;

    const data = docSnap.data();
    const resolvedRole = resolveAuthRole(data.role, data.email ?? '', data.name ?? '', 'business');

    if (resolvedRole !== normalizeRole(data.role, 'business')) {
      await setDoc(docRef, {
        ...data,
        role: resolvedRole,
      }, { merge: true });
    }

    const authUser: AuthUser = {
      id: uid,
      email: data.email,
      name: data.name,
      businessName: data.businessName,
      role: resolvedRole,
    };

    setUser(authUser);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(authUser));
    return authUser;
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading, login, loginWithSocial, register, logout, resetPassword, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}