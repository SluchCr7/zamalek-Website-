import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useEffect } from 'react';
import { fetchNews, addNews, deleteNews, setOpenModal } from '../redux/slices/newsSlice';
import { useAuth } from './useAuth';

export const useNews = () => {
  const dispatch = useDispatch();
  const news = useSelector((state) => state.news);
  const { user } = useAuth();

  const handleFetchNews = useCallback(() => {
    dispatch(fetchNews());
  }, [dispatch]);

  const handleAddNews = useCallback(
    (title, content, image) => {
      if (user?.token) {
        dispatch(addNews({ title, content, image, token: user.token }));
      }
    },
    [dispatch, user]
  );

  const handleDeleteNews = useCallback(
    (id) => {
      if (user?.token) {
        dispatch(deleteNews({ id, token: user.token }));
      }
    },
    [dispatch, user]
  );

  const handleSetOpenModal = useCallback(
    (isOpen) => dispatch(setOpenModal(isOpen)),
    [dispatch]
  );

  useEffect(() => {
    handleFetchNews();
  }, [handleFetchNews]);

  return {
    news: news.news,
    loading: news.loading,
    error: news.error,
    openModal: news.openModal,
    addNews: handleAddNews,
    deleteNews: handleDeleteNews,
    setOpenModal: handleSetOpenModal,
    fetchNews: handleFetchNews,
  };
};
