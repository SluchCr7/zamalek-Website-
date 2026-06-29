import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';
import {
  login,
  register,
  logout,
  updateProfile,
  updatePhoto,
  resetPassword,
  forgetEmail,
  verifyAccount,
  fetchUsers,
  initializeAuth,
} from '../redux/slices/authSlice';

export const useAuth = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const handleLogin = useCallback(
    (email, password) => dispatch(login({ email, password })),
    [dispatch]
  );

  const handleRegister = useCallback(
    (username, name, email, password) =>
      dispatch(register({ username, name, email, password })),
    [dispatch]
  );

  const handleLogout = useCallback(() => dispatch(logout()), [dispatch]);

  const handleUpdateProfile = useCallback(
    (profileData) => dispatch(updateProfile(profileData)),
    [dispatch]
  );

  const handleUpdatePhoto = useCallback(
    (photo) => dispatch(updatePhoto(photo)),
    [dispatch]
  );

  const handleResetPassword = useCallback(
    (id, token, password) => dispatch(resetPassword({ id, token, password })),
    [dispatch]
  );

  const handleForgetEmail = useCallback(
    (email) => dispatch(forgetEmail(email)),
    [dispatch]
  );

  const handleVerifyAccount = useCallback(
    (id, token) => dispatch(verifyAccount({ id, token })),
    [dispatch]
  );

  const handleFetchUsers = useCallback(() => dispatch(fetchUsers()), [dispatch]);

  const handleInitializeAuth = useCallback(
    () => dispatch(initializeAuth()),
    [dispatch]
  );

  return {
    user: auth.user,
    users: auth.users,
    isLogin: auth.isLogin,
    isAuthChecked: auth.isAuthChecked,
    verifyStatus: auth.verifyStatus,
    loading: auth.loading,
    error: auth.error,
    login: handleLogin,
    registerNewUser: handleRegister,
    Logout: handleLogout,
    updateProfile: handleUpdateProfile,
    updatePhoto: handleUpdatePhoto,
    ResetPassword: handleResetPassword,
    ForgetEmail: handleForgetEmail,
    verifyAccount: handleVerifyAccount,
    fetchUsers: handleFetchUsers,
    initializeAuth: handleInitializeAuth,
  };
};
