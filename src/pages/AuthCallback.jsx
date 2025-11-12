// src/pages/AuthCallback.jsx
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

    if (error) {
      // OAuth failed, redirect to signin with error
      navigate(`/signin?error=${error}`);
      return;
    }

    if (token && role) {
      // Store token and role
      login(token, role);
      
      // Redirect based on role
      if (role === 'admin') {
        navigate('/dashboard');
      } else {
        navigate('/my-account');
      }
    } else {
      // Missing token or role, redirect to signin
      navigate('/signin?error=oauth_failed');
    }
  }, [searchParams, navigate, login]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0A0A0A]">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-[#EAB308] mx-auto mb-4"></div>
        <p className="text-[#E5E5E5] text-xl">Authenticating...</p>
      </div>
    </div>
  );
}