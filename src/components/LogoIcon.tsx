import React from 'react';

export const LogoIcon: React.FC = () => {
  return (
    <div className="logo-icon">
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Decorative outer ring */}
        <circle
          cx="24"
          cy="24"
          r="22"
          stroke="currentColor"
          strokeWidth="1"
          strokeDasharray="1 3"
          className="outer-ring"
        />

        {/* Artistic globe base with wave pattern */}
        <path
          d="M24 42C33.9411 42 42 33.9411 42 24C42 14.0589 33.9411 6 24 6C14.0589 6 6 14.0589 6 24C6 33.9411 14.0589 42 24 42Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeDasharray="3 6"
          className="globe-base"
        />
        
        {/* Flowing meridians */}
        <path
          d="M24 6C28 12 29 18 29 24C29 30 28 36 24 42"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          className="meridian meridian-1"
        />
        <path
          d="M24 6C20 12 19 18 19 24C19 30 20 36 24 42"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          className="meridian meridian-2"
        />
        
        {/* Decorative latitude lines */}
        <path
          d="M12 24C12 24 18 28 24 28C30 28 36 24 36 24"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          strokeDasharray="2 4"
          className="latitude latitude-1"
        />
        <path
          d="M14 18C14 18 19 22 24 22C29 22 34 18 34 18"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          strokeDasharray="2 4"
          className="latitude latitude-2"
        />
        
        {/* Artistic time spiral */}
        <path
          d="M24 15C27 15 29.5 17 29.5 20C29.5 23 27 25.5 24 25.5C21 25.5 18.5 28 18.5 31C18.5 34 21 36 24 36"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          className="time-spiral"
        />
        
        {/* Dynamic time markers with halos */}
        <g className="marker-group marker-1">
          <circle cx="24" cy="12" r="2.5" fill="currentColor" opacity="0.2" />
          <circle cx="24" cy="12" r="1.5" fill="currentColor" />
        </g>
        <g className="marker-group marker-2">
          <circle cx="36" cy="24" r="2.5" fill="currentColor" opacity="0.2" />
          <circle cx="36" cy="24" r="1.5" fill="currentColor" />
        </g>
        <g className="marker-group marker-3">
          <circle cx="24" cy="36" r="2.5" fill="currentColor" opacity="0.2" />
          <circle cx="24" cy="36" r="1.5" fill="currentColor" />
        </g>
        <g className="marker-group marker-4">
          <circle cx="12" cy="24" r="2.5" fill="currentColor" opacity="0.2" />
          <circle cx="12" cy="24" r="1.5" fill="currentColor" />
        </g>
        
        {/* Pulsing center with halo */}
        <circle
          cx="24"
          cy="24"
          r="4"
          fill="currentColor"
          opacity="0.2"
          className="center-halo"
        />
        <circle
          cx="24"
          cy="24"
          r="2.5"
          fill="currentColor"
          className="center-point"
        />
      </svg>
    </div>
  );
};