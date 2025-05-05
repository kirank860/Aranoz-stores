import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  signInWithGoogle,
  signInWithEmail,
  signUpWithEmail,
  selectAuthStatus,
  selectAuthError,
  selectUser,
  logout,
} from '../features/auth/authSlice';

const AuthModal = ({ open, onClose }) => {
  const [tab, setTab] = useState('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [localError, setLocalError] = useState('');
  const dispatch = useDispatch();
  const status = useSelector(selectAuthStatus);
  const error = useSelector(selectAuthError);
  const user = useSelector(selectUser);
  const modalRef = useRef(null);

  // Focus trap and close on ESC
  useEffect(() => {
    if (!open) return;
    const focusableSelectors = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    const modal = modalRef.current;
    const focusableEls = modal ? Array.from(modal.querySelectorAll(focusableSelectors)) : [];
    const firstEl = focusableEls[0];
    const lastEl = focusableEls[focusableEls.length - 1];
    if (firstEl) firstEl.focus();

    function handleKeyDown(e) {
      if (e.key === 'Escape') {
        onClose();
      }
      if (e.key === 'Tab') {
        if (focusableEls.length === 0) return;
        if (e.shiftKey) {
          if (document.activeElement === firstEl) {
            e.preventDefault();
            lastEl.focus();
          }
        } else {
          if (document.activeElement === lastEl) {
            e.preventDefault();
            firstEl.focus();
          }
        }
      }
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  useEffect(() => {
    setLocalError('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  }, [tab, open]);

  const handleSignIn = (e) => {
    e.preventDefault();
    setLocalError('');
    if (!email || !password) {
      setLocalError('Please enter both email and password.');
      return;
    }
    dispatch(signInWithEmail({ email, password }));
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    setLocalError('');
    if (!email || !password || !confirmPassword) {
      setLocalError('Please fill in all fields.');
      return;
    }
    if (password !== confirmPassword) {
      setLocalError('Passwords do not match.');
      return;
    }
    if (password.length < 6) {
      setLocalError('Password must be at least 6 characters.');
      return;
    }
    dispatch(signUpWithEmail({ email, password }));
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center min-h-screen bg-black/40 backdrop-blur-sm" aria-modal="true" role="dialog">
      <div ref={modalRef} className="bg-white rounded-2xl shadow-2xl border border-gray-100 w-full max-w-sm sm:max-w-md p-4 sm:p-8 relative animate-modal-pop flex flex-col max-h-[90vh] overflow-y-auto mx-2 my-6 transition-all duration-300" tabIndex={-1}>
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-400 hover:text-blue-600 text-2xl font-bold focus:outline-none">&times;</button>
        {user ? (
          <>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 text-center">You are logged in!</h2>
            <div className="flex flex-col items-center mb-4">
              <img
                src={user.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.displayName || user.email)}`}
                alt={user.displayName || user.email}
                className="h-14 w-14 rounded-full border-2 border-blue-200 object-cover mb-2 shadow"
              />
              <div className="text-lg font-semibold text-gray-700 text-center">
                {user.displayName || user.email}
              </div>
            </div>
            <button
              onClick={() => { dispatch(logout()); onClose(); }}
              className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold text-lg shadow-md hover:bg-red-700 active:scale-95 transition mb-2"
            >
              Log out
            </button>
            <button
              onClick={onClose}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold text-lg shadow-md hover:bg-blue-700 active:scale-95 transition mb-2"
            >
              Continue Shopping
            </button>
          </>
        ) : (
          <>
            <div className="flex justify-center mb-6 gap-2 relative">
              <button
                className={`flex-1 px-4 py-2 font-semibold rounded-t-lg transition relative z-10 ${tab === 'signin' ? 'text-blue-700' : 'text-gray-700'}`}
                onClick={() => setTab('signin')}
              >
                Sign In
              </button>
              <button
                className={`flex-1 px-4 py-2 font-semibold rounded-t-lg transition relative z-10 ${tab === 'signup' ? 'text-blue-700' : 'text-gray-700'}`}
                onClick={() => setTab('signup')}
              >
                Sign Up
              </button>
              <span className={`absolute bottom-0 left-0 h-2 w-1/2 rounded-b-lg bg-blue-100 transition-all duration-300 z-0 ${tab === 'signin' ? 'translate-x-0' : 'translate-x-full'}`}></span>
            </div>
            {tab === 'signin' ? (
              <form className="space-y-4 mb-4" onSubmit={handleSignIn}>
                <input type="email" placeholder="Email" className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition" value={email} onChange={e => setEmail(e.target.value)} autoComplete="email" />
                <input type="password" placeholder="Password" className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition" value={password} onChange={e => setPassword(e.target.value)} autoComplete="current-password" />
                {localError && <div className="text-center text-red-600 font-semibold mb-2">{localError}</div>}
                <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold text-lg shadow-md hover:bg-blue-700 active:scale-95 transition">Sign In</button>
              </form>
            ) : (
              <form className="space-y-4 mb-4" onSubmit={handleSignUp}>
                <input type="email" placeholder="Email" className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition" value={email} onChange={e => setEmail(e.target.value)} autoComplete="email" />
                <input type="password" placeholder="Password" className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition" value={password} onChange={e => setPassword(e.target.value)} autoComplete="new-password" />
                <input type="password" placeholder="Confirm Password" className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} autoComplete="new-password" />
                {localError && <div className="text-center text-red-600 font-semibold mb-2">{localError}</div>}
                <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold text-lg shadow-md hover:bg-blue-700 active:scale-95 transition">Sign Up</button>
              </form>
            )}
            {status === 'loading' && <div className="text-center text-blue-600 font-semibold mb-2">Processing...</div>}
            {error && <div className="text-center text-red-600 font-semibold mb-2">{error}</div>}
            <div className="flex items-center my-4">
              <div className="flex-grow border-t border-gray-200" />
              <span className="mx-2 text-gray-400 text-sm">or</span>
              <div className="flex-grow border-t border-gray-200" />
            </div>
            <button
              onClick={() => dispatch(signInWithGoogle())}
              className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold text-lg shadow-md hover:bg-blue-50 active:scale-95 transition mb-2"
              disabled={status === 'loading'}
            >
              <span className="w-6 h-6 flex items-center justify-center bg-white rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="24" height="24">
                  <g>
                    <path fill="#4285F4" d="M24 9.5c3.54 0 6.07 1.53 7.47 2.81l5.52-5.36C33.6 4.09 29.2 2 24 2 14.82 2 6.98 7.98 3.69 15.44l6.91 5.37C12.13 14.13 17.56 9.5 24 9.5z"/>
                    <path fill="#34A853" d="M46.1 24.55c0-1.64-.15-3.21-.43-4.73H24v9.01h12.42c-.54 2.9-2.18 5.36-4.65 7.01l7.18 5.59C43.98 37.09 46.1 31.36 46.1 24.55z"/>
                    <path fill="#FBBC05" d="M10.6 28.13c-1.01-2.9-1.01-6.04 0-8.94l-6.91-5.37C1.64 17.09 0 20.36 0 24c0 3.64 1.64 6.91 3.69 9.18l6.91-5.05z"/>
                    <path fill="#EA4335" d="M24 44c5.2 0 9.6-1.73 12.8-4.73l-7.18-5.59c-2.01 1.36-4.6 2.18-7.62 2.18-6.44 0-11.87-4.63-13.4-10.68l-6.91 5.05C6.98 40.02 14.82 44 24 44z"/>
                    <path fill="none" d="M0 0h48v48H0z"/>
                  </g>
                </svg>
              </span>
              Continue with Google
            </button>
          </>
        )}
      </div>
    </div>
  );
};

// Add modal pop animation
// In your global CSS (e.g., index.css or tailwind.config.js), add:
// .animate-modal-pop { @apply opacity-0 scale-95; animation: modal-pop 0.25s cubic-bezier(0.4,0,0.2,1) forwards; }
// @keyframes modal-pop { to { opacity: 1; transform: scale(1); } }

export default AuthModal; 