import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Share2, ChevronDown } from 'lucide-react';
import { TimezoneGroup } from '../types/timezone';

interface GroupSelectorProps {
  groups: TimezoneGroup[];
  activeGroupId: string;
  onSelectGroup: (groupId: string) => void;
  onCreateGroup: (name: string) => void;
  onUpdateGroup: (groupId: string, name: string) => void;
  onDeleteGroup: (groupId: string) => void;
  getShareableLink: (groupId: string) => Promise<string | null>;
}

export const GroupSelector: React.FC<GroupSelectorProps> = ({
  groups,
  activeGroupId,
  onSelectGroup,
  onCreateGroup,
  onUpdateGroup,
  onDeleteGroup,
  getShareableLink,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [newGroupName, setNewGroupName] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [shareTooltip, setShareTooltip] = useState<string | null>(null);
  const [isSharing, setIsSharing] = useState(false);

  const activeGroup = groups.find(g => g.id === activeGroupId);

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newGroupName.trim()) {
      onCreateGroup(newGroupName.trim());
      setNewGroupName('');
      setIsCreating(false);
      // Keep the dropdown open after creating a new group
      // setIsOpen(false);
    }
  };

  const handleEditSubmit = (e: React.FormEvent, groupId: string) => {
    e.preventDefault();
    if (editName.trim()) {
      onUpdateGroup(groupId, editName.trim());
      setEditingId(null);
      setEditName('');
    }
  };

  const startEditing = (group: TimezoneGroup, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingId(group.id);
    setEditName(group.name);
  };

  const handleShare = async (groupId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (isSharing) return;
    
    setIsSharing(true);
    try {
      const link = await getShareableLink(groupId);
      if (link) {
        await navigator.clipboard.writeText(link);
        setShareTooltip('Link copied!');
      } else {
        setShareTooltip('Failed to generate link');
      }
    } catch (err) {
      console.error('Share error:', err);
      setShareTooltip('Failed to copy');
    } finally {
      setIsSharing(false);
      setTimeout(() => setShareTooltip(null), 2000);
    }
  };

  const handleDelete = (groupId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    onDeleteGroup(groupId);
  };

  return (
    <div className="group-selector">
      <div className="dropdown">
        <button 
          className="dropdown-trigger"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span>{activeGroup?.name || 'Select Group'}</span>
          <ChevronDown size={16} className={`chevron ${isOpen ? 'open' : ''}`} />
        </button>

        {isOpen && (
          <div className="dropdown-content">
            {groups.map(group => (
              <div
                key={group.id}
                className={`group-item ${activeGroupId === group.id ? 'active' : ''}`}
                onClick={() => {
                  onSelectGroup(group.id);
                  setIsOpen(false);
                }}
              >
                {editingId === group.id ? (
                  <form onSubmit={(e) => handleEditSubmit(e, group.id)} onClick={e => e.stopPropagation()}>
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      onBlur={() => setEditingId(null)}
                      autoFocus
                    />
                  </form>
                ) : (
                  <>
                    <span className="group-name">{group.name}</span>
                    <div className="group-actions">
                      <button
                        className={`action-button ${isSharing ? 'disabled' : ''}`}
                        onClick={(e) => handleShare(group.id, e)}
                        title="Share group"
                        disabled={isSharing}
                      >
                        <Share2 size={14} />
                      </button>
                      <button
                        className="action-button"
                        onClick={(e) => startEditing(group, e)}
                        title="Edit group name"
                      >
                        <Edit2 size={14} />
                      </button>
                      <button
                        className="action-button"
                        onClick={(e) => handleDelete(group.id, e)}
                        title="Delete group"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
            
            <div className="dropdown-divider"></div>
            
            {isCreating ? (
              <form onSubmit={handleCreateSubmit} className="create-group-form">
                <input
                  type="text"
                  value={newGroupName}
                  onChange={(e) => setNewGroupName(e.target.value)}
                  placeholder="Enter group name..."
                  autoFocus
                  onBlur={() => {
                    if (!newGroupName.trim()) {
                      setIsCreating(false);
                    }
                  }}
                />
              </form>
            ) : (
              <button
                className="create-group-button"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsCreating(true);
                }}
              >
                <Plus size={16} />
                New Group
              </button>
            )}
          </div>
        )}

        {shareTooltip && (
          <div className="share-tooltip">{shareTooltip}</div>
        )}
      </div>
    </div>
  );
};