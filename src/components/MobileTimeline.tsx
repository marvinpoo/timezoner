import React, { useRef, useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useTimelineScroll } from '../context/TimelineScrollContext';

interface MobileTimelineProps {
  timezone: string;
  currentHour: number;
}

export const MobileTimeline: React.FC<MobileTimelineProps> = ({ timezone, currentHour }) => {
  const { t } = useTranslation();
  const { scrollPosition, setScrollPosition } = useTimelineScroll();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [momentum, setMomentum] = useState({ velocity: 0, timestamp: 0 });
  const [lastX, setLastX] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const animationFrameRef = useRef<number>();
  const isInitialScroll = useRef(true);

  const generateHours = () => {
    const hours = [];
    for (let i = 0; i < 24; i++) {
      hours.push((currentHour + i - 12 + 24) % 24);
    }
    return hours;
  };

  const hours = generateHours();
  const sunrise = 6;
  const sunset = 18;

  useEffect(() => {
    if (scrollRef.current && isInitialScroll.current) {
      const hourWidth = scrollRef.current.scrollWidth / 24;
      const initialScroll = hourWidth * 11;
      scrollRef.current.scrollLeft = initialScroll;
      setScrollPosition(initialScroll);
      isInitialScroll.current = false;
    }
  }, [currentHour, setScrollPosition]);

  useEffect(() => {
    if (scrollRef.current && !isDragging && !isScrolling) {
      scrollRef.current.scrollLeft = scrollPosition;
    }
  }, [scrollPosition, isDragging, isScrolling]);

  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  const applyMomentum = () => {
    if (!scrollRef.current || Math.abs(momentum.velocity) < 0.1 || !isScrolling) {
      setIsScrolling(false);
      return;
    }

    const newScrollLeft = scrollRef.current.scrollLeft - momentum.velocity;
    scrollRef.current.scrollLeft = newScrollLeft;
    setScrollPosition(newScrollLeft);
    
    setMomentum(prev => ({
      ...prev,
      velocity: prev.velocity * 0.95
    }));

    animationFrameRef.current = requestAnimationFrame(applyMomentum);
  };

  const updateMomentum = (currentX: number, timestamp: number) => {
    const deltaX = currentX - lastX;
    const deltaTime = timestamp - momentum.timestamp;
    if (deltaTime > 0) {
      const velocity = deltaX / deltaTime * 16;
      setMomentum({ velocity, timestamp });
    }
    setLastX(currentX);
  };

  const handleDragStart = (clientX: number) => {
    setIsDragging(true);
    setIsScrolling(false);
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    setStartX(clientX - scrollRef.current!.offsetLeft);
    setScrollLeft(scrollRef.current!.scrollLeft);
    setLastX(clientX);
    setMomentum({ velocity: 0, timestamp: Date.now() });
  };

  const handleDragMove = (clientX: number) => {
    if (!isDragging || !scrollRef.current) return;
    const x = clientX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    const newScrollLeft = scrollLeft - walk;
    scrollRef.current.scrollLeft = newScrollLeft;
    setScrollPosition(newScrollLeft);
    updateMomentum(clientX, Date.now());
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    if (Math.abs(momentum.velocity) > 0.1) {
      setIsScrolling(true);
      requestAnimationFrame(applyMomentum);
    }
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    handleDragStart(e.pageX);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    handleDragMove(e.pageX);
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    handleDragStart(e.touches[0].pageX);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    e.preventDefault();
    handleDragMove(e.touches[0].pageX);
  };

  return (
    <div className="mobile-timeline">
      <div className="timeline-header">
        <div className="day-night-indicator">
          <Sun className="sun-icon" title={t('dayTime')} />
          <Moon className="moon-icon" title={t('nightTime')} />
        </div>
      </div>
      <div 
        ref={scrollRef}
        className={`timeline-hours ${isDragging ? 'dragging' : ''}`}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleDragEnd}
      >
        {hours.map((hour, index) => {
          const isDaytime = hour >= sunrise && hour < sunset;
          const isCurrent = hour === currentHour;
          
          return (
            <div 
              key={`${hour}-${index}`}
              className={`timeline-hour ${isDaytime ? 'daytime' : 'nighttime'} ${isCurrent ? 'current' : ''}`}
              title={isCurrent ? t('currentTime') : `${hour}:00`}
            >
              <div className="hour-label">{hour}</div>
              <div className="hour-marker"></div>
            </div>
          );
        })}
      </div>
    </div>
  );
};