const loginWithFacebook = async () => {
  const result = await signInWithPopup(auth, facebookProvider);

  const user = result.user;

  return user;
};