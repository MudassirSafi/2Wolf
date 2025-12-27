// src/pages/AuthCallback.jsx - FIXED
import React, { useEffect, useContext } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function AuthCallback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  useEffect(() => {
    const token = searchParams.get('token');
    const role = searchParams.get('role');
    const error = searchParams.get('error');

    console.log('Auth callback received:', { token: !!token, role, error });

    if (error) {
      // OAuth failed, redirect to signin with error
      alert('Google sign-in failed. Please try again.');
      navigate('/signin');
      return;
    }

    if (token && role) {
      // Store token and role
      login(token, role);
      
      // Redirect based on role
      if (role === 'admin') {
        navigate('/dashboard');
      } else {
        navigate('/');
      }
    } else {
      // Missing token or role, redirect to signin
      console.error('Missing token or role');
      navigate('/signin');
    }
  }, [searchParams, navigate, login]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-orange-500 mx-auto mb-4"></div>
        <p className="text-gray-700 text-xl">Authenticating with Google...</p>
      </div>
    </div>
  );
}