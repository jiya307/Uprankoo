const loginWithGoogle = async () => {
  const result = await signInWithPopup(auth, googleProvider);

  const user = result.user;

  return user;
};