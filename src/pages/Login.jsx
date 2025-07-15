import React from 'react';
import { Link } from 'react-router-dom';

const Login = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Sign in to LinkedBoard Pro</h2>
      <button className="w-full flex items-center justify-center border border-border rounded-lg py-2 mb-4 hover:bg-muted transition">
        <span className="mr-2">
          {/* Placeholder Google icon */}
          <svg width="20" height="20" viewBox="0 0 48 48"><g><path fill="#4285F4" d="M24 9.5c3.54 0 6.72 1.22 9.22 3.23l6.9-6.9C36.68 2.36 30.74 0 24 0 14.82 0 6.71 5.06 2.69 12.44l8.06 6.26C12.36 13.13 17.74 9.5 24 9.5z"/><path fill="#34A853" d="M46.1 24.5c0-1.64-.15-3.22-.42-4.74H24v9.04h12.42c-.54 2.9-2.18 5.36-4.64 7.04l7.18 5.6C43.98 37.1 46.1 31.3 46.1 24.5z"/><path fill="#FBBC05" d="M10.75 28.7c-1.1-3.3-1.1-6.8 0-10.1l-8.06-6.26C.98 16.1 0 20.01 0 24c0 3.99.98 7.9 2.69 11.66l8.06-6.26z"/><path fill="#EA4335" d="M24 48c6.48 0 11.92-2.14 15.89-5.82l-7.18-5.6c-2.01 1.35-4.59 2.15-8.71 2.15-6.26 0-11.64-3.63-13.25-8.86l-8.06 6.26C6.71 42.94 14.82 48 24 48z"/></g></svg>
        </span>
        <span>Sign in with Google</span>
      </button>
      <div className="flex items-center my-4">
        <div className="flex-1 h-px bg-border" />
        <span className="mx-2 text-xs text-text-secondary">or</span>
        <div className="flex-1 h-px bg-border" />
      </div>
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input type="email" className="w-full border border-border rounded-lg px-3 py-2" placeholder="you@email.com" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Password</label>
          <input type="password" className="w-full border border-border rounded-lg px-3 py-2" placeholder="Password" />
        </div>
        <button type="submit" className="w-full bg-primary text-white rounded-lg py-2 font-medium mt-2">Sign In</button>
      </form>
      <p className="text-center text-sm text-text-secondary mt-6">
        Don't have an account? <Link to="/register" className="text-primary hover:underline">Register</Link>
      </p>
    </div>
  </div>
);

export default Login; 