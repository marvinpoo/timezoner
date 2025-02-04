import React, { useState, useRef, useEffect } from 'react';
import { PenLine, Share2 } from 'lucide-react';
import { ShareAnimation } from './ShareAnimation';

interface EditableTitleProps {
  value: string;
  onChange: (value: string) => void;
  onShare?: () => Promise<string | null>;
}

export const EditableTitle: React.FC<EditableTitleProps> = ({ value, onChange, onShare }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);
  const [isShared, setIsShared] = useState(false);
  const [shareTooltip, setShareTooltip] = useState<string | null>(null);
  const [isSharing, setIsSharing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setEditValue(value);
  }, [value]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleSubmit = () => {
    if (editValue.trim()) {
      onChange(editValue.trim());
    } else {
      setEditValue(value);
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit();
    } else if (e.key === 'Escape') {
      setEditValue(value);
      setIsEditing(false);
    }
  };

  const handleShare = async () => {
    if (!onShare || isSharing) return;
    
    setIsSharing(true);
    try {
      const link = await onShare();
      if (link) {
        await navigator.clipboard.writeText(link);
        setShareTooltip('Link copied!');
        setIsShared(true);
      } else {
        setShareTooltip('Failed to generate link');
      }
    } catch (err) {
      console.error('Share error:', err);
      setShareTooltip('Failed to copy');
    } finally {
      setIsSharing(false);
      setTimeout(() => {
        setShareTooltip(null);
        setIsShared(false);
      }, 2000);
    }
  };

  return (
    <div className="editable-title">
      {isEditing ? (
        <input
          ref={inputRef}
          type="text"
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onBlur={handleSubmit}
          onKeyDown={handleKeyDown}
          className="title-input"
        />
      ) : (
        <div className="title-display">
          <h1>{value}</h1>
          <div className="title-actions">
            <button className="action-button" onClick={() => setIsEditing(true)}>
              <PenLine className="edit-icon" size={20} />
            </button>
            {onShare && (
              <button 
                className={`action-button share-button ${isSharing ? 'disabled' : ''} ${isShared ? 'shared' : ''}`}
                onClick={handleShare}
                disabled={isSharing}
              >
                {isShared ? (
                  <ShareAnimation isShared={isShared} />
                ) : (
                  <Share2 size={20} />
                )}
              </button>
            )}
          </div>
        </div>
      )}
      {shareTooltip && (
        <div className="share-tooltip">{shareTooltip}</div>
      )}
    </div>
  );
};