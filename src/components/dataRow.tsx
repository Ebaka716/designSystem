import React from 'react';
import { cn } from '@/lib/utils'; // Assuming you have a utility for classnames

interface DataRowProps {
  label: string;
  value: React.ReactNode; // Allow string or other elements as value
  className?: string;
}

const DataRow: React.FC<DataRowProps> = ({ label, value, className }) => {
  return (
    <div className={cn("flex justify-between items-start w-full py-1", className)}>
      <span className="text-sm text-right text-gray-600 flex-shrink-0 mr-4">{label}:</span>
      <span className="text-sm font-bold text-left flex-grow">{value}</span>
    </div>
  );
};

export default DataRow; 