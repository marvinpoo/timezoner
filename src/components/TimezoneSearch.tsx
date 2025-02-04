import React, { useRef, useEffect } from 'react';
import { Search } from 'lucide-react';
import { Timezone } from '../types/timezone';

const getOffsetMinutes = (offset: string) => {
  const [sign, hours, minutes] = offset.match(/([+-])(\d{2}):(\d{2})/)?.slice(1) || ['+', '00', '00'];
  return (sign === '+' ? 1 : -1) * (parseInt(hours) * 60 + parseInt(minutes));
};

interface TimezoneSearchProps {
  timezones: Timezone[];
  onSelect: (timezone: Timezone) => void;
  disabled?: boolean;
  placeholder?: string;
}

export const TimezoneSearch: React.FC<TimezoneSearchProps> = ({ 
  timezones, 
  onSelect, 
  disabled,
  placeholder = "Search by timezone, country, region, or city..."
}) => {
  const [search, setSearch] = React.useState('');
  const [isOpen, setIsOpen] = React.useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const normalizeString = (str: string) => 
    str.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

  const filteredTimezones = React.useMemo(() => {
    if (!search.trim()) return [];
    
    const normalizedSearch = normalizeString(search);
    const searchTerms = normalizedSearch.split(/\s+/);
    
    return timezones
      .filter(tz => {
        const searchableFields = [
          tz.name,
          tz.country,
          tz.city,
          tz.region,
          tz.offset.replace(/[^0-9+-]/g, '')
        ];

        return searchTerms.every(term =>
          searchableFields.some(field => 
            normalizeString(field).includes(term)
          )
        );
      })
      .sort((a, b) => {
        const aExactMatch = Object.values(a).some(value => 
          normalizeString(value.toString()) === normalizeString(search)
        );
        const bExactMatch = Object.values(b).some(value => 
          normalizeString(value.toString()) === normalizeString(search)
        );
        
        if (aExactMatch && !bExactMatch) return -1;
        if (!aExactMatch && bExactMatch) return 1;

        return getOffsetMinutes(a.offset) - getOffsetMinutes(b.offset);
      })
      .slice(0, 50);
  }, [search, timezones]);

  return (
    <div className="timezone-search" ref={wrapperRef}>
      <div className="search-input-wrapper">
        <Search className="search-icon" />
        <input
          type="text"
          placeholder={placeholder}
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          disabled={disabled}
        />
      </div>
      {isOpen && search.trim() && (
        <div className="search-results">
          {filteredTimezones.length > 0 ? (
            filteredTimezones.map((tz, index) => (
              <button
                key={`${tz.country}-${tz.city}-${tz.value}-${index}`}
                className="timezone-option"
                onClick={() => {
                  onSelect(tz);
                  setIsOpen(false);
                  setSearch('');
                }}
              >
                <span className="timezone-name">{tz.name}</span>
                <span className="timezone-details">
                  {tz.city}, {tz.country} ({tz.region})
                </span>
              </button>
            ))
          ) : (
            <div className="no-results">No timezones found</div>
          )}
        </div>
      )}
    </div>
  );
};