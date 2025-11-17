import React from 'react';
import { Link } from 'react-router-dom';
import { logout } from '../api/auth';
import { AUTH_USER_UPDATED_EVENT } from '../constants/auth';
import useAuthUser from '../hooks/useAuthUser';

const Header = () => {
  const authUser = useAuthUser();

  const handleLogout = async () => {
    try {
      await logout();
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent(AUTH_USER_UPDATED_EVENT));
      }
    } catch (error) {
      console.error('Failed to logout', error);
    }
  };

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200/70 bg-white/90 shadow-sm backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
        <Link to="/" className="text-2xl font-semibold tracking-tight text-slate-900">
          Gomdol Vintage
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium text-slate-600 md:flex">
          <Link to="/" className="transition hover:text-indigo-600">Collections</Link>
          <Link to="/cart" className="transition hover:text-indigo-600">Cart</Link>
          <Link to="/orders" className="transition hover:text-indigo-600">Orders</Link>
          <a href="#story" className="transition hover:text-indigo-600">Our Story</a>
        </nav>
        {authUser ? (
          <div className="flex items-center gap-3">
            <span className="hidden rounded-full bg-indigo-600/10 px-4 py-1 text-sm font-semibold text-indigo-700 md:inline">
              {authUser.nickname}님
            </span>
            <button
              type="button"
              onClick={handleLogout}
              className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-indigo-500 hover:text-indigo-600"
            >
              Logout
            </button>
          </div>
        ) : (
          <Link
            to="/login"
            className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
          >
            Login
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
