import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';
import { showAlert, hideAlert } from '../redux/slices/alertSlice';

export const useAlert = () => {
  const dispatch = useDispatch();
  const alert = useSelector((state) => state.alert);

  const handleShowAlert = useCallback(
    (message) => dispatch(showAlert(message)),
    [dispatch]
  );

  const handleHideAlert = useCallback(() => dispatch(hideAlert()), [dispatch]);

  return {
    message: alert.message,
    isVisible: alert.isVisible,
    showAlert: handleShowAlert,
    hideAlert: handleHideAlert,
  };
};
