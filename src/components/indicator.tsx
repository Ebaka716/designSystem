import React from 'react';
import { cn } from '@/lib/utils'; // Assuming you have a utility for classnames

type IndicatorLevel = 'Low' | 'Medium' | 'High';

interface IndicatorProps {
  label: string;
  level: IndicatorLevel;
  className?: string;
}

const Indicator: React.FC<IndicatorProps> = ({ label, level, className }) => {
  const levelPositions: Record<IndicatorLevel, string> = {
    Low: 'left-[16.66%]',    // Position marker in the middle of the first segment
    Medium: 'left-[50%]',   // Position marker in the middle of the second segment
    High: 'left-[83.33%]',  // Position marker in the middle of the third segment
  };

  const markerPosition = levelPositions[level];

  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <span className="text-sm font-medium text-gray-700">{label}:</span>
      <div className="relative w-24 h-2 rounded-full">
        {/* Background segments */}
        <div className="absolute inset-0 flex rounded-full overflow-hidden">
          <div className="w-1/3 h-full bg-orange-400"></div>
          <div className="w-1/3 h-full bg-yellow-300"></div>
          <div className="w-1/3 h-full bg-teal-400"></div>
        </div>
        {/* Indicator Pipe */}
        <div
          className={cn(
            'absolute top-0 bottom-0 w-0.5 bg-black transform -translate-x-1/2',
            markerPosition
          )}
          style={{ height: '200%', top: '-50%' }}
        ></div>
      </div>
    </div>
  );
};

export default Indicator; 