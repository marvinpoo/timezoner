import React, { createContext, useContext, useState } from 'react';

interface TimelineScrollContextType {
  scrollPosition: number;
  setScrollPosition: (position: number) => void;
  isDragging: boolean;
  setIsDragging: (dragging: boolean) => void;
  selectedTime: Date | null;
  setSelectedTime: (time: Date | null) => void;
}

const TimelineScrollContext = createContext<TimelineScrollContextType | undefined>(undefined);

export function TimelineScrollProvider({ children }: { children: React.ReactNode }) {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedTime, setSelectedTime] = useState<Date | null>(null);

  return (
    <TimelineScrollContext.Provider value={{ 
      scrollPosition, 
      setScrollPosition,
      isDragging,
      setIsDragging,
      selectedTime,
      setSelectedTime
    }}>
      {children}
    </TimelineScrollContext.Provider>
  );
}

export function useTimelineScroll() {
  const context = useContext(TimelineScrollContext);
  if (context === undefined) {
    throw new Error('useTimelineScroll must be used within a TimelineScrollProvider');
  }
  return context;
}