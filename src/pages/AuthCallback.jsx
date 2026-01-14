// ==========================================
// 📁 FILE 2: src/pages/AuthCallback.jsx - FIXED (FASTER)
// ==========================================
import react from 'react';
import { useEffect, useContext } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function AuthCallback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  useEffect(() => {
    const handleCallback = async () => {
      try {
        console.log('\n=== OAUTH CALLBACK HANDLING ===');
        
        const token = searchParams.get('token');
        const role = searchParams.get('role');
        const name = searchParams.get('name');
        const email = searchParams.get('email');
        const id = searchParams.get('id');
        const error = searchParams.get('error');

        console.log('📦 Received params:', { 
          hasToken: !!token, 
          role, 
          name, 
          email,
          hasId: !!id,
          error 
        });

        if (error) {
          console.error('❌ OAuth error:', error);
          navigate('/signin?error=' + error);
          return;
        }

        if (!token || !role) {
          console.error('❌ Missing token or role');
          navigate('/signin?error=missing_data');
          return;
        }

        console.log('✅ OAuth callback successful');
        console.log('👤 User data:', { name, email, role });
        
        // ✅ Call login immediately - no async needed
        login(token, role, { name, email, id });
        
        console.log('✅ Login completed, redirecting...');
        
        // ✅ Small delay to ensure localStorage is updated
        setTimeout(() => {
          if (role === 'admin') {
            navigate('/admin/dashboard', { replace: true });
          } else {
            navigate('/', { replace: true });
          }
        }, 100);

        console.log('=== OAUTH CALLBACK COMPLETE ===\n');
      } catch (err) {
        console.error('❌ Callback error:', err);
        navigate('/signin?error=callback_failed');
      }
    };

    handleCallback();
  }, [searchParams, navigate, login]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-orange-50 to-white">
      <div className="text-center">
        <div className="relative w-16 h-16 mx-auto mb-4">
          <div className="absolute top-0 left-0 w-full h-full border-4 border-orange-200 rounded-full"></div>
          <div className="absolute top-0 left-0 w-full h-full border-4 border-orange-500 rounded-full border-t-transparent animate-spin"></div>
        </div>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Signing you in...</h2>
        <p className="text-gray-600 text-sm">Please wait a moment</p>
      </div>
    </div>
  );
}
