import { useState, useEffect } from 'react';
import { Timezone } from '../types/timezone';

interface TimezoneStorage {
  mainTimezone: Timezone | null;
  comparedTimezones: Timezone[];
}

export function useTimezoneStorage() {
  const [storage, setStorage] = useState<TimezoneStorage>(() => {
    const saved = localStorage.getItem('timezoneSelections');
    return saved ? JSON.parse(saved) : { mainTimezone: null, comparedTimezones: [] };
  });

  useEffect(() => {
    localStorage.setItem('timezoneSelections', JSON.stringify(storage));
  }, [storage]);

  const setMainTimezone = (timezone: Timezone | null) => {
    setStorage(prev => ({ ...prev, mainTimezone: timezone }));
  };

  const addComparedTimezone = (timezone: Timezone) => {
    setStorage(prev => ({
      ...prev,
      comparedTimezones: [...prev.comparedTimezones, timezone]
    }));
  };

  const removeComparedTimezone = (index: number) => {
    setStorage(prev => ({
      ...prev,
      comparedTimezones: prev.comparedTimezones.filter((_, i) => i !== index)
    }));
  };

  return {
    mainTimezone: storage.mainTimezone,
    comparedTimezones: storage.comparedTimezones,
    setMainTimezone,
    addComparedTimezone,
    removeComparedTimezone,
  };
}