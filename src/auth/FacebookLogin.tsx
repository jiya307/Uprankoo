import { signInWithPopup } from 'firebase/auth';
import { auth, facebookProvider } from '../Firebase';

export async function loginWithFacebook() {
  const result = await signInWithPopup(auth, facebookProvider);
  return result.user;
}
