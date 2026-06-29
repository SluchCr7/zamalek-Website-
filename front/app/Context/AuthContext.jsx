'use client';

import axios from 'axios';
import swal from 'sweetalert';
import getData from '@/app/data/getAllDate';
import { createContext, useContext, useEffect, useState } from 'react';
import { useAlert } from './AlertContext';

axios.defaults.withCredentials = true;

export const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState(null);
  const [isLogin, setIsLogin] = useState(false);
  const [isAuthChecked, setIsAuthChecked] = useState(false);
  const [verifyStatus, setVerifyStatus] = useState(false);
  const { showAlert } = useAlert();

  // ------------------- AUTH ACTIONS -------------------

  const login = async (email, password) => {
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_BACK_URL}/api/auth/login`, {
        email,
        password,
      });

      setUser(res.data.user);
      localStorage.setItem('zscUser', JSON.stringify(res.data.user));
      localStorage.setItem('State', 'true');

      showAlert(res.data.message || 'Login successful');

      setTimeout(() => {
        window.location.href = '/';
      }, 2000);
    } catch (err) {
      const message = err.response?.data?.message || 'Login failed';
      showAlert(message);
    }
  };

  const Logout = () => {
    swal({
      title: "هل أنت متأكد من تسجيل الخروج؟",
      text: "سيتم تسجيل خروجك من الحساب وستحتاج لتسجيل الدخول مرة أخرى.",
      icon: "warning",
      buttons: ["إلغاء", "تسجيل الخروج"],
      dangerMode: true,
    }).then(async (willLogout) => {
      if (willLogout) {
        try {
          await axios.post(`${process.env.NEXT_PUBLIC_BACK_URL}/api/auth/logout`);
        } catch (err) {
          console.error('Logout error:', err);
        }
        setUser(null);
        setIsLogin(false);
        localStorage.removeItem("zscUser");
        localStorage.removeItem("State");
        window.location.href = "/Pages/Login";
      }
    });
  };

  const registerNewUser = async (username, name, email, password) => {
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_BACK_URL}/api/auth/register`, {
        username,
        name,
        email,
        password
      });
      showAlert(res.data.message);
      setTimeout(() => window.location.href = '/Pages/Login', 2000);
    } catch (err) {
      swal('عذراً!', err.response?.data?.message || 'فشل إنشاء الحساب', 'error');
    }
  };

  const updateProfile = async (profileData) => {
    try {
      const res = await axios.put(`${process.env.NEXT_PUBLIC_BACK_URL}/api/auth/profile-update`, profileData);

      const updatedUser = {
        ...user,
        ...res.data
      };

      setUser(updatedUser);
      localStorage.setItem('zscUser', JSON.stringify(updatedUser));
      showAlert('تم تحديث الملف الشخصي بنجاح');
      return true;
    } catch (err) {
      showAlert(err.response?.data?.message || 'فشل تحديث البيانات');
      return false;
    }
  };

  const updatePhoto = async (photo) => {
    const formData = new FormData();
    formData.append('image', photo);

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACK_URL}/api/auth/upload`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      showAlert('تم تحديث الصورة بنجاح');

      const updatedUser = {
        ...user,
        profilePhoto: res.data,
      };

      localStorage.setItem('zscUser', JSON.stringify(updatedUser));
      setUser(updatedUser);
    } catch (err) {
      showAlert(err?.response?.data?.message || 'فشل تحديث الصورة');
    }
  };

  // ... rest of methods remain same but updated with camelCase if needed

  const ResetPassword = async (id, token, password) => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACK_URL}/api/password/reset-password/${id}/${token}`,
        { password }
      );
      showAlert(res.data.message);
    } catch (err) {
      showAlert('فشل إعادة تعيين كلمة المرور');
    }
  };

  const ForgetEmail = async (email) => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACK_URL}/api/password/reset`,
        { email }
      );
      showAlert(res.data.message || res.data);
    } catch (err) {
      showAlert('فشل إرسال بريد الاستعادة');
    }
  };

  const verifyAccount = async (id, token) => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACK_URL}/api/auth/${id}/verify/${token}`
      );
      setVerifyStatus(true);
      showAlert(res.data.message || 'تم توثيق الحساب');
    } catch (err) {
      console.error(err);
    }
  };

  // ------------------- INIT -------------------

  useEffect(() => {
    const storedUser = localStorage.getItem('zscUser');
    const loginState = localStorage.getItem('State');

    if (storedUser && loginState === 'true') {
      setUser(JSON.parse(storedUser));
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }

    setIsAuthChecked(true);
  }, []);

  useEffect(() => {
    getData('auth', setUsers);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        login,
        Logout,
        registerNewUser,
        updateProfile,
        updatePhoto,
        ResetPassword,
        ForgetEmail,
        verifyAccount,
        verifyStatus,
        setVerifyStatus,
        isLogin,
        isAuthChecked,
        user,
        users,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

