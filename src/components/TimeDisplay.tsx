import React, { useState, useEffect } from 'react';
import { formatInTimeZone, getTimezoneOffset } from 'date-fns-tz';
import { Clock } from 'lucide-react';
import { Timeline } from './Timeline';
import { MobileTimeline } from './MobileTimeline';
import { useTranslation } from 'react-i18next';
import { useTimelineScroll } from '../context/TimelineScrollContext';
import * as dateFnsLocales from 'date-fns/locale';
import berlinerischLocale from '../utils/berlinerisch-locale';

interface TimeDisplayProps {
  timezone: string;
  label: string;
  isMain?: boolean;
  onRemove?: () => void;
}

const locales: { [key: string]: Locale } = {
  ber: berlinerischLocale,
  ...dateFnsLocales
};

export const TimeDisplay: React.FC<TimeDisplayProps> = ({ 
  timezone, 
  label, 
  isMain, 
  onRemove 
}) => {
  const { t, i18n } = useTranslation();
  const { selectedTime } = useTimelineScroll();
  const [time, setTime] = useState(selectedTime || new Date());

  useEffect(() => {
    if (selectedTime) {
      setTime(selectedTime);
    } else {
      const timer = setInterval(() => setTime(new Date()), 1000);
      return () => clearInterval(timer);
    }
  }, [selectedTime]);

  const currentOffset = getTimezoneOffset(timezone, time);
  const standardOffset = getTimezoneOffset(timezone, new Date(time.getFullYear(), 0, 1));
  const isDST = currentOffset !== standardOffset;

  const offsetInMinutes = currentOffset / (60 * 1000);
  const hours = Math.floor(Math.abs(offsetInMinutes) / 60);
  const minutes = Math.abs(offsetInMinutes) % 60;
  const sign = offsetInMinutes >= 0 ? '+' : '-';
  
  const formattedOffset = `GMT${sign}${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  const formattedTime = formatInTimeZone(time, timezone, 'HH:mm:ss');
  const currentHour = parseInt(formatInTimeZone(time, timezone, 'H'));

  const currentLocale = locales[i18n.language] || dateFnsLocales.enUS;
  const formattedDate = formatInTimeZone(
    time,
    timezone,
    'EEEE, d MMMM yyyy',
    { locale: currentLocale }
  );

  return (
    <div className={`time-display ${isMain ? 'main' : ''}`}>
      <div className="time-info">
        <div className="time-header">
          <Clock className="clock-icon" />
          <span className="timezone-label">
            {label} ({formattedOffset})
            {isDST && <span className="dst-indicator">{t('dstActive')}</span>}
          </span>
          {onRemove && (
            <button 
              className="remove-button" 
              onClick={onRemove}
              title={t('removeTimezone')}
            >×</button>
          )}
        </div>
        <div className="time">{formattedTime}</div>
        <div className="date">{formattedDate}</div>
      </div>
      <div className="timeline-wrapper">
        {window.innerWidth > 768 ? (
          <Timeline timezone={timezone} />
        ) : (
          <MobileTimeline timezone={timezone} currentHour={currentHour} />
        )}
      </div>
    </div>
  );
};