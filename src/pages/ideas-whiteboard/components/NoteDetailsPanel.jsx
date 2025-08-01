import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { useNavigate } from 'react-router-dom';

const NoteDetailsPanel = ({ 
  note, 
  onUpdateNote, 
  onDeleteNote, 
  onClose,
  connections,
  allNotes,
  onCreateConnection,
  onDeleteConnection
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    title: note?.title || '',
    content: note?.content || '',
    category: note?.category || ''
  });
  const [newComment, setNewComment] = useState('');
  const navigate = useNavigate();

  if (!note) return null;

  const categories = [
    'Ideas',
    'Tasks', 
    'Research',
    'Feedback',
    'Questions',
    'Goals'
  ];

  const noteConnections = connections.filter(
    conn => conn.from === note.id || conn.to === note.id
  );

  const connectedNotes = noteConnections.map(conn => {
    const connectedId = conn.from === note.id ? conn.to : conn.from;
    return allNotes.find(n => n.id === connectedId);
  }).filter(Boolean);

  const handleSave = () => {
    onUpdateNote(note.id, editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData({
      title: note.title,
      content: note.content,
      category: note.category
    });
    setIsEditing(false);
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      const updatedComments = [...(note.comments || []), {
        id: Date.now(),
        text: newComment.trim(),
        author: 'John Doe',
        timestamp: new Date().toISOString()
      }];
      
      onUpdateNote(note.id, { comments: updatedComments });
      setNewComment('');
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getColorClasses = (color) => {
    const colorMap = {
      yellow: 'bg-yellow-100 border-yellow-300',
      blue: 'bg-blue-100 border-blue-300',
      green: 'bg-green-100 border-green-300',
      pink: 'bg-pink-100 border-pink-300',
      purple: 'bg-purple-100 border-purple-300',
      orange: 'bg-orange-100 border-orange-300'
    };
    return colorMap[color] || colorMap.yellow;
  };

  return (
    <div className="w-96 h-full bg-white border-l border-border flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border flex items-center justify-between">
        <h2 className="text-lg font-semibold text-foreground">Note Details</h2>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
        >
          <Icon name="X" size={20} />
        </Button>
      </div>

      {/* Note Preview */}
      <div className="p-4 border-b border-border">
        <div className={`p-4 rounded-lg border-2 ${getColorClasses(note.color)}`}>
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-gray-800">{note.title}</h3>
            <div className="flex items-center space-x-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsEditing(true)}
              className="w-6 h-6"
            >
              <Icon name="Edit2" size={12} />
            </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate(`/search?q=${encodeURIComponent(note.title || '')}`)}
                className="w-6 h-6"
                title="Search this idea"
              >
                <Icon name="Globe" size={14} />
              </Button>
            </div>
          </div>
          <p className="text-sm text-gray-700 mb-3">{note.content}</p>
          <div className="flex items-center justify-between text-xs text-gray-600">
            <span>{note.author}</span>
            <span>{formatDate(note.createdAt)}</span>
          </div>
        </div>
      </div>

      {/* Edit Form */}
      {isEditing && (
        <div className="p-4 border-b border-border bg-muted">
          <h3 className="text-sm font-semibold text-foreground mb-3">Edit Note</h3>
          <div className="space-y-3">
            <Input
              label="Title"
              type="text"
              value={editData.title}
              onChange={(e) => setEditData({ ...editData, title: e.target.value })}
            />
            
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                Content
              </label>
              <textarea
                value={editData.content}
                onChange={(e) => setEditData({ ...editData, content: e.target.value })}
                className="w-full h-20 px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                Category
              </label>
              <select
                value={editData.category}
                onChange={(e) => setEditData({ ...editData, category: e.target.value })}
                className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
              >
                <option value="">No category</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleCancel}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                variant="default"
                size="sm"
                onClick={handleSave}
                className="flex-1"
              >
                Save
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Connections */}
      <div className="p-4 border-b border-border">
        <h3 className="text-sm font-semibold text-foreground mb-3">
          Connections ({connectedNotes.length})
        </h3>
        {connectedNotes.length > 0 ? (
          <div className="space-y-2">
            {connectedNotes.map((connectedNote) => (
              <div
                key={connectedNote.id}
                className="flex items-center justify-between p-2 bg-muted rounded-lg"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">
                    {connectedNote.title}
                  </p>
                  <p className="text-xs text-text-secondary truncate">
                    {connectedNote.content}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onDeleteConnection(note.id, connectedNote.id)}
                  className="w-6 h-6 text-destructive hover:text-destructive"
                >
                  <Icon name="Unlink" size={12} />
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-text-secondary">
            No connections yet. Connect this note to others to show relationships.
          </p>
        )}
      </div>

      {/* Comments */}
      <div className="flex-1 flex flex-col">
        <div className="p-4 border-b border-border">
          <h3 className="text-sm font-semibold text-foreground mb-3">
            Comments ({note.comments?.length || 0})
          </h3>
          
          {/* Add Comment */}
          <div className="space-y-2">
            <textarea
              placeholder="Add a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="w-full h-16 px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none text-sm"
            />
            <Button
              variant="default"
              size="sm"
              onClick={handleAddComment}
              disabled={!newComment.trim()}
              className="w-full"
            >
              <Icon name="MessageCircle" size={14} className="mr-1" />
              Add Comment
            </Button>
          </div>
        </div>

        {/* Comments List */}
        <div className="flex-1 overflow-y-auto p-4">
          {note.comments && note.comments.length > 0 ? (
            <div className="space-y-3">
              {note.comments.map((comment) => (
                <div key={comment.id} className="bg-muted rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-foreground">
                      {comment.author}
                    </span>
                    <span className="text-xs text-text-secondary">
                      {formatDate(comment.timestamp)}
                    </span>
                  </div>
                  <p className="text-sm text-foreground">{comment.text}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-text-secondary text-center mt-8">
              No comments yet. Be the first to comment!
            </p>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="p-4 border-t border-border">
        <Button
          variant="destructive"
          onClick={() => onDeleteNote(note.id)}
          className="w-full"
          iconName="Trash2"
          iconPosition="left"
        >
          Delete Note
        </Button>
      </div>
    </div>
  );
};

export default NoteDetailsPanel;