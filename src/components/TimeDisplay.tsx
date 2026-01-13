import React, { useState, useEffect } from 'react';
import { formatInTimeZone, getTimezoneOffset } from 'date-fns-tz';
import { Clock, Trash2, MapPin, ClockIcon } from 'lucide-react'; // Add MapPin and ClockIcon
import { Timeline } from './Timeline';
import { MobileTimeline } from './MobileTimeline';
import { useTranslation } from 'react-i18next';
import * as dateFnsLocales from 'date-fns/locale';
import berlinerischLocale from '../utils/berlinerisch-locale';

interface TimeDisplayProps {
  timezone: string;
  label: string;
  isMain?: boolean;
  onRemove?: () => void;
  showDeleteButton?: boolean;
}

const locales: { [key: string]: Locale } = {
  ber: berlinerischLocale,
  ...dateFnsLocales
};

export const TimeDisplay: React.FC<TimeDisplayProps> = ({ 
  timezone, 
  label, 
  isMain, 
  onRemove,
  showDeleteButton
}) => {
  const { t, i18n } = useTranslation();
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

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
    <div className={`time-display ${isMain ? 'main' : ''} ${showDeleteButton ? 'editing-active' : ''}`}>
      <div className="time-info">
        <div className="time-header">
          <div className="location-info">
            <MapPin className="location-icon" />
            <span className="location-label">{label}</span>
          </div>
          <div className="timezone-info">
            <ClockIcon className="timezone-icon" />
            <span className="timezone-label">
              {formattedOffset}
              {isDST && <span className="dst-indicator">{t('dstActive')}</span>}
            </span>
          </div>
        </div>
        <div className="time">{formattedTime}</div>
        <div className="date">{formattedDate}</div>
      </div>
      <div className={`timeline-wrapper ${showDeleteButton ? 'dimmed' : ''}`}>
        {window.innerWidth > 768 ? (
          <Timeline timezone={timezone} />
        ) : (
          <MobileTimeline timezone={timezone} currentHour={currentHour} />
        )}
      </div>
      {onRemove && showDeleteButton && (
        <button 
          className="remove-button-side" 
          onClick={onRemove}
          title={t('removeTimezone')}
        >
          <Trash2 size={18} />
          <span className="remove-text">{t('removeTimezone')}</span>
        </button>
      )}
    </div>
  );
};