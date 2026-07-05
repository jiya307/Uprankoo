import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../Firebase';

export async function loginWithGoogle() {
  const result = await signInWithPopup(auth, googleProvider);
  return result.user;
}
