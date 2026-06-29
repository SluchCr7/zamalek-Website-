'use client';
import React, { useEffect, useState } from 'react';
import { FaCheck } from 'react-icons/fa';
import { useAlert } from '@/app/hooks/useAlert';

const Alert = () => {
  const { message, isVisible } = useAlert();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  return (
    <div
      className={`${
        visible ? 'opacity-100 w-[80%] md:w-[350px]' : 'opacity-0 pointer-events-none w-0'
      } transition-all fixed top-6 right-6 z-[1000] flex items-center gap-3 p-5 rounded-xl shadow-lg backdrop-blur-lg  bg-opacity-80`}
    >
      <FaCheck className="text-green-400 text-2xl" />
      <p className="text-lightMode-fg dark:text-darkMode-fg text-sm">{message}</p>
    </div>
  );
};

export default Alert;
