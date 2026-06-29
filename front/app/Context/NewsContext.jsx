'use client';

import axios from 'axios';
import { createContext, useContext, useEffect, useState } from 'react';
import { useAlert } from './AlertContext';
import { useAuth } from './AuthContext';

export const NewsContext = createContext();
export const useNews = () => useContext(NewsContext);

export const NewsContextProvider = ({ children }) => {
    const { user } = useAuth()
    const [news, setNews] = useState([])
    const [loading, setLoading] = useState(false)
    const { showAlert } = useAlert();
    const [openModal, setOpenModal] = useState(false)

    // Fetch all news
    const fetchNews = async () => {
        setLoading(true)
        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_BACK_URL}/api/news/all`)
            setNews(res.data)
        } catch (err) {
            console.error('Error fetching news:', err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchNews()
    }, [])

    const addNews = async (title, content, image) => {
        const formData = new FormData();
        formData.append('image', image);
        formData.append('title', title);
        formData.append('content', content);

        setLoading(true)
        try {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_BACK_URL}/api/news/add`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            showAlert("تم إضافة الخبر بنجاح")
            setNews(prev => [res.data, ...prev])
            setOpenModal(false)
        } catch (err) {
            const message = err.response?.data?.message || "فشل إضافة الخبر"
            showAlert(message)
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    const deleteNews = async (id) => {
        try {
            await axios.delete(`${process.env.NEXT_PUBLIC_BACK_URL}/api/news/delete/${id}`)
            showAlert("تم حذف الخبر بنجاح")
            setNews(prev => prev.filter(item => item._id !== id))
        } catch (err) {
            const message = err.response?.data?.message || "فشل حذف الخبر"
            showAlert(message)
            console.error(err);
        }
    }

    return (
        <NewsContext.Provider value={{ news, addNews, deleteNews, openModal, setOpenModal, loading, fetchNews }}>
            {children}
        </NewsContext.Provider>
    )
}