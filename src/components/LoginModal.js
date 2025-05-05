import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signInWithGoogle, selectAuthStatus, selectAuthError, selectUser } from '../features/auth/authSlice';

const LoginModal = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const status = useSelector(selectAuthStatus);
  const error = useSelector(selectAuthError);
  const user = useSelector(selectUser);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-8 relative animate-fade-in">
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-400 hover:text-blue-600 text-2xl font-bold">&times;</button>
        {user ? (
          <>
            <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">You are logged in!</h2>
            <div className="flex flex-col items-center mb-4">
              <img
                src={user.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.displayName || user.email)}`}
                alt={user.displayName || user.email}
                className="h-14 w-14 rounded-full border-2 border-blue-200 object-cover mb-2"
              />
              <div className="text-lg font-semibold text-gray-700 text-center">
                Yes, you are logged into the <span className="text-blue-600">{user.displayName || user.email}</span> account.<br />You can continue shopping.
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold text-lg shadow-md hover:bg-blue-700 transition mb-2"
            >
              Continue Shopping
            </button>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Sign in to your account</h2>
            <button
              onClick={() => dispatch(signInWithGoogle())}
              className="w-full flex items-center justify-center gap-3 bg-blue-600 text-white py-3 rounded-lg font-semibold text-lg shadow-md hover:bg-blue-700 transition mb-4"
              disabled={status === 'loading'}
            >
              <img src="https://upload.wikimedia.org/wikipedia/commons/4/4a/Logo_2013_Google.png" alt="Google" className="w-6 h-6 bg-white rounded-full" />
              Continue with Google
            </button>
            {/* You can add email/password fields here if you want */}
            {status === 'loading' && <div className="text-center text-blue-600 font-semibold mb-2">Signing in...</div>}
            {error && <div className="text-center text-red-600 font-semibold mb-2">{error}</div>}
            <div className="text-center text-gray-500 text-sm mt-4">
              By signing in, you agree to our <a href="#" className="text-blue-600 hover:underline">Terms</a> and <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>.
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default LoginModal; 