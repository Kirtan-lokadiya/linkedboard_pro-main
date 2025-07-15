import React from 'react';

const GoogleSearch = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-background">
    <div className="mb-8">
      <h1 className="text-5xl font-bold text-primary mb-2">Connect your thoughts</h1>
      <p className="text-lg text-text-secondary text-center">Search across posts, people, ideas, and more</p>
    </div>
    <form className="w-full max-w-xl">
      <input
        type="search"
        className="w-full border border-border rounded-full px-6 py-4 text-lg focus:ring-2 focus:ring-primary focus:border-transparent shadow"
        placeholder="Search LinkedBoard Pro..."
      />
    </form>
  </div>
);

export default GoogleSearch; 