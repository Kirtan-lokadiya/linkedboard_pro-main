import React, { useState } from 'react';
import Header from '../../components/ui/Header';
import ProfileSidebar from '../../components/ui/ProfileSidebar';
import NavigationBreadcrumb from '../../components/ui/NavigationBreadcrumb';
import PostCreationCard from './components/PostCreationCard';
import FeedContainer from './components/FeedContainer';
import TrendingSidebar from './components/TrendingSidebar';
import Icon from '../../components/AppIcon';

const HomeDashboard = () => {
  const [showProfile, setShowProfile] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Header with profile icon */}
      <Header>
        <button
          className="fixed top-4 right-8 z-50 bg-primary rounded-full w-12 h-12 flex items-center justify-center shadow-lg border-2 border-white"
          onClick={() => setShowProfile(true)}
          title="View Profile"
        >
          <Icon name="User" size={28} color="white" />
        </button>
      </Header>
      {/* Profile Modal */}
      {showProfile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white dark:bg-background rounded-lg shadow-2xl max-w-md w-full relative">
            <button
              className="absolute top-2 right-2 text-xl p-2 rounded-full hover:bg-muted"
              onClick={() => setShowProfile(false)}
              title="Close"
            >
              <Icon name="X" size={20} />
            </button>
            <ProfileSidebar className="rounded-lg shadow-none border-none" />
          </div>
        </div>
      )}
      {/* Main Layout */}
      <div className="flex justify-center">
        {/* Main Content Area */}
        <main className="flex-1 pt-16">
          <div className="max-w-4xl mx-auto px-4 lg:px-6 py-6">
            {/* Breadcrumb Navigation */}
            <div className="mb-6">
              <NavigationBreadcrumb />
            </div>
              {/* Center Column - Main Feed */}
            <div>
                {/* Post Creation */}
                <PostCreationCard />
                {/* Feed Container */}
                <FeedContainer />
            </div>
          </div>
        </main>
        {/* Right Column - Trending & Suggestions */}
        <aside className="hidden lg:block lg:w-96 sticky top-24 h-full">
          <TrendingSidebar />
        </aside>
      </div>
    </div>
  );
};

export default HomeDashboard;