import { useState, useEffect } from 'react';
import { TimezoneGroup } from '../types/timezone';
import { generatePatPURL } from '../utils/patp/encoder';

export function useTimezoneGroups() {
  const [groups, setGroups] = useState<TimezoneGroup[]>(() => {
    const saved = localStorage.getItem('timezoneGroups');
    return saved ? JSON.parse(saved) : [];
  });

  const [activeGroupId, setActiveGroupId] = useState<string>(() => {
    const saved = localStorage.getItem('activeTimezoneGroupId');
    return saved || '';
  });

  useEffect(() => {
    localStorage.setItem('timezoneGroups', JSON.stringify(groups));
  }, [groups]);

  useEffect(() => {
    if (activeGroupId) {
      localStorage.setItem('activeTimezoneGroupId', activeGroupId);
    }
  }, [activeGroupId]);

  const createGroup = (name: string) => {
    const newGroup: TimezoneGroup = {
      id: crypto.randomUUID(),
      name,
      mainTimezone: null,
      comparedTimezones: [],
    };
    setGroups(prev => [...prev, newGroup]);
    return newGroup;
  };

  const updateGroup = (groupId: string, updates: Partial<TimezoneGroup>) => {
    setGroups(prev => prev.map(group => 
      group.id === groupId ? { ...group, ...updates } : group
    ));
  };

  const deleteGroup = (groupId: string) => {
    setGroups(prev => prev.filter(group => group.id !== groupId));
    if (activeGroupId === groupId) {
      const remainingGroup = groups.find(g => g.id !== groupId);
      setActiveGroupId(remainingGroup?.id || '');
    }
  };

  const getShareableLink = async (groupId: string): Promise<string | null> => {
    const group = groups.find(g => g.id === groupId);
    if (!group) return null;

    // Start with the group name as the first element
    const cities = [group.name];
    
    // Add the timezone cities after the group name
    if (group.mainTimezone) {
      cities.push(group.mainTimezone.city);
    }
    cities.push(...group.comparedTimezones.map(tz => tz.city));

    try {
      return await generatePatPURL(cities);
    } catch (error) {
      console.error('Error generating shareable link:', error);
      return null;
    }
  };

  const activeGroup = groups.find(g => g.id === activeGroupId) || null;

  return {
    groups,
    activeGroup,
    activeGroupId,
    setActiveGroupId,
    createGroup,
    updateGroup,
    deleteGroup,
    getShareableLink,
  };
}