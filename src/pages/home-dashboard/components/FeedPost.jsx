import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import { useAuth } from "../../../context/AuthContext";

const FeedPost = ({ post }) => {
  const { isAuthenticated, openAuthModal } = useAuth();
  const [isLiked, setIsLiked] = useState(post.isLiked || false);
  const [likeCount, setLikeCount] = useState(post.likes || 0);
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState('');

  const handleLike = () => {
    if (!isAuthenticated) {
      openAuthModal();
      return;
    }
    setIsLiked(!isLiked);
    setLikeCount(prev => (isLiked ? prev - 1 : prev + 1));
  };

  const handleComment = () => {
    if (!isAuthenticated) {
      openAuthModal();
      return;
    }
    if (commentText.trim()) {
      console.log('Adding comment:', commentText);
      setCommentText('');
    }
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const postTime = new Date(timestamp);
    const diffInHours = Math.floor((now - postTime) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`;
    return `${Math.floor(diffInHours / 168)}w ago`;
  };

  const getPostTypeIcon = (type) => {
    const iconMap = {
      article: 'FileText',
      thought: 'MessageCircle',
      idea: 'Lightbulb',
      update: 'Building',
      share: 'Share2'
    };
    return iconMap[type] || 'MessageCircle';
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-card mb-6">
      {/* Post Header */}
      <div className="p-6 pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3">
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
              {post.author.avatar ? (
                <Image 
                  src={post.author.avatar} 
                  alt={post.author.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
              ) : (
                <Icon name="User" size={24} color="white" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2">
                <h3 className="font-semibold text-foreground truncate">
                  {post.author.name}
                </h3>
                {post.author.verified && (
                  <Icon name="BadgeCheck" size={16} className="text-primary" />
                )}
              </div>
              <p className="text-sm text-text-secondary truncate">
                {post.author.title} at {post.author.company}
              </p>
              <div className="flex items-center space-x-2 mt-1">
                <span className="text-xs text-text-secondary">
                  {formatTimeAgo(post.timestamp)}
                </span>
                <span className="text-xs text-text-secondary">•</span>
                <div className="flex items-center space-x-1">
                  <Icon name={getPostTypeIcon(post.type)} size={12} className="text-text-secondary" />
                  <span className="text-xs text-text-secondary capitalize">{post.type}</span>
                </div>
              </div>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="w-8 h-8">
            <Icon name="MoreHorizontal" size={16} />
          </Button>
        </div>
      </div>

      {/* Post Content */}
      <div className="px-6 pb-4">
        <div className="prose prose-sm max-w-none">
          <p className="text-foreground leading-relaxed mb-3">
            {post.content}
          </p>
          
          {post.type === 'article' && post.excerpt && (
            <div className="bg-muted rounded-lg p-4 mt-3">
              <p className="text-sm text-text-secondary mb-2">{post.excerpt}</p>
              <Link 
                to={`/blog-detail-view?id=${post.id}&from=home`}
                className="text-sm text-primary hover:text-primary/80 font-medium transition-micro"
              >
                Read more →
              </Link>
            </div>
          )}
        </div>

        {/* Post Media */}
        {post.media && (
          <div className="mt-4 rounded-lg overflow-hidden">
            {post.media.type === 'image' && (
              <Image 
                src={post.media.url} 
                alt={post.media.alt || 'Post image'}
                className="w-full h-64 object-cover"
              />
            )}
            {post.media.type === 'link' && (
              <div className="border border-border rounded-lg p-4 bg-muted">
                <div className="flex items-start space-x-3">
                  <div className="w-16 h-16 bg-background rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon name="Link" size={20} className="text-text-secondary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-foreground truncate">{post.media.title}</h4>
                    <p className="text-sm text-text-secondary mt-1 line-clamp-2">{post.media.description}</p>
                    <span className="text-xs text-text-secondary mt-2 block">{post.media.domain}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Hashtags */}
        {post.hashtags && post.hashtags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {post.hashtags.map((tag, index) => (
              <span key={index} className="text-sm text-primary hover:text-primary/80 cursor-pointer">
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Engagement Stats */}
      <div className="px-6 py-3 border-t border-border">
        <div className="flex items-center justify-between text-sm text-text-secondary">
          <div className="flex items-center space-x-4">
            <span>{likeCount} likes</span>
            <span>{post.comments || 0} comments</span>
            <span>{post.shares || 0} shares</span>
          </div>
          <span>{post.views || 0} views</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="px-6 py-3 border-t border-border">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={handleLike}
            requireAuth
            className={`flex-1 ${isLiked ? 'text-primary' : 'text-text-secondary'}`}
            iconName="ThumbsUp"
            iconPosition="left"
            iconSize={16}
          >
            Like
          </Button>
          <Button
            variant="ghost"
            onClick={() => setShowComments(!showComments)}
            requireAuth
            className="flex-1 text-text-secondary"
            iconName="MessageCircle"
            iconPosition="left"
            iconSize={16}
          >
            Comment
          </Button>
          <Button
            variant="ghost"
            className="flex-1 text-text-secondary"
            iconName="Share2"
            requireAuth
            iconPosition="left"
            iconSize={16}
          >
            Share
          </Button>
          <Button
            variant="ghost"
            className="flex-1 text-text-secondary"
            iconName="Send"
            requireAuth
            iconPosition="left"
            iconSize={16}
          >
            Send
          </Button>
        </div>
      </div>

      {/* Comments Section */}
      {showComments && (
        <div className="px-6 py-4 border-t border-border bg-muted/30">
          {/* Add Comment */}
          <div className="flex items-start space-x-3 mb-4">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
              <Icon name="User" size={16} color="white" />
            </div>
            <div className="flex-1">
              <textarea
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Add a comment..."
                className="w-full p-3 border border-border rounded-lg resize-none text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
                rows={2}
              />
              <div className="flex justify-end mt-2">
                <Button
                  variant="default"
                  size="sm"
                  onClick={handleComment}
                  requireAuth
                  disabled={!commentText.trim()}
                >
                  Comment
                </Button>
              </div>
            </div>
          </div>

          {/* Existing Comments */}
          {post.recentComments && post.recentComments.map((comment, index) => (
            <div key={index} className="flex items-start space-x-3 mb-3">
              <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center flex-shrink-0">
                <Icon name="User" size={16} color="white" />
              </div>
              <div className="flex-1">
                <div className="bg-background rounded-lg p-3">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-sm font-medium text-foreground">{comment.author}</span>
                    <span className="text-xs text-text-secondary">{formatTimeAgo(comment.timestamp)}</span>
                  </div>
                  <p className="text-sm text-foreground">{comment.content}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FeedPost;