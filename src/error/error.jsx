import React from 'react';
import { useNavigate } from 'react-router';
import error from '../assets/error-404.png';
import useTitle from "../hooks/useTitle";
export default function ErrorPage() {
useTitle("404 | Page Not Found | GameHub");
  const nav = useNavigate();
  return (
    <div className='bg-white flex flex-col py-10 items-center text-center justify-center'>
      <img src={error} alt="404" />
      <h1 className='text-2xl font-bold pt-8 text-black'>Oops, page not found!</h1>
      <p className='text-black p-3'>The page you are looking for is not available.</p>
      <button onClick={() => nav(-1)} className='bg-blue-500 text-white rounded-2xl px-4 py-2'>Go Back!</button>
    </div>
  );
}