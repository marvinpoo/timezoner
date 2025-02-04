import React from 'react';
import { formatInTimeZone } from 'date-fns-tz';
import { Sun, Moon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useTimelineScroll } from '../context/TimelineScrollContext';

interface TimelineProps {
  timezone: string;
}

export const Timeline: React.FC<TimelineProps> = ({ timezone }) => {
  const { t } = useTranslation();
  const { selectedTime, setSelectedTime } = useTimelineScroll();
  const now = new Date();
  const currentHour = parseInt(formatInTimeZone(now, timezone, 'H'));
  
  const sunrise = 6;
  const sunset = 18;

  const hours = Array.from({ length: 24 }, (_, i) => i);

  const handleHourClick = (hour: number) => {
    // Create a new date in the selected timezone
    const date = new Date();
    const tzOffset = formatInTimeZone(date, timezone, 'xxx');
    const timeString = `${hour.toString().padStart(2, '0')}:00:00${tzOffset}`;
    const selectedDate = new Date(`${formatInTimeZone(date, timezone, 'yyyy-MM-dd')}T${timeString}`);
    setSelectedTime(selectedDate);
  };

  const getSelectedHour = () => {
    if (!selectedTime) return null;
    return parseInt(formatInTimeZone(selectedTime, timezone, 'H'));
  };

  return (
    <div className="timeline">
      <div className="timeline-header">
        <div className="day-night-indicator">
          <Sun className="sun-icon" title={t('dayTime')} />
          <Moon className="moon-icon" title={t('nightTime')} />
        </div>
      </div>
      <div className="timeline-hours">
        {hours.map((hour) => {
          const isDaytime = hour >= sunrise && hour < sunset;
          const isCurrent = hour === currentHour;
          const isSelected = hour === getSelectedHour();
          
          return (
            <div 
              key={hour}
              className={`timeline-hour ${isDaytime ? 'daytime' : 'nighttime'} ${isCurrent ? 'current' : ''} ${isSelected ? 'selected' : ''}`}
              title={isCurrent ? t('currentTime') : `${hour.toString().padStart(2, '0')}:00`}
              onClick={() => handleHourClick(hour)}
            >
              <div className="hour-label">{hour.toString().padStart(2, '0')}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};