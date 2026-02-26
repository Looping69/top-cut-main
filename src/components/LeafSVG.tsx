import React from 'react';

interface LeafSVGProps {
  className?: string;
  fill?: string;
  width?: number;
  height?: number;
}

export const LeafSVG: React.FC<LeafSVGProps> = ({ 
  className = "", 
  fill = "currentColor",
  width = 24,
  height = 24
}) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      width={width} 
      height={height} 
      className={className}
      fill="none"
      stroke={fill}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 3v7.5c0 1 .1 2 .4 3L12 21l5.6-7.5c.3-1 .4-2 .4-3V3" />
      <path d="M12 21V8" />
      <path d="M9 3h6" />
    </svg>
  );
}; 