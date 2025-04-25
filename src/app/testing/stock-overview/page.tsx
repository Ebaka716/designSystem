'use client';

import React from 'react';
// Import the new component once created
import { StockOverviewCardV1 } from '@/components/StockOverviewCard/v1';

export default function StockOverviewTestingPage() {
  return (
    <>
      <h2 className="text-2xl font-semibold mb-4">Stock Overview Card Examples</h2>
      {/* REMOVED: flex layout, ADDED: vertical spacing */}
      <div className="space-y-8">
        {/* Example 1: Full Version */}
        {/* REMOVED: flex-1 from wrapper */}
        <div className="min-w-[400px]"> 
          <h3 className="text-lg font-medium mb-2">Full Version</h3>
          <StockOverviewCardV1 />
        </div>
        
        {/* Example 2: No Key Data */}
        <div className="min-w-[400px]">
          <h3 className="text-lg font-medium mb-2">No Key Data</h3>
          <StockOverviewCardV1 showKeyData={false} />
        </div>
        
        {/* Example 3: No Actions / After Hours */}
        <div className="min-w-[400px]">
          <h3 className="text-lg font-medium mb-2">No Actions / After Hours</h3>
          <StockOverviewCardV1 showActionButtons={false} showAfterHours={false} />
        </div>
        
        {/* Example 4: Minimal (Quote Header Only) */}
        <div className="min-w-[400px]">
          <h3 className="text-lg font-medium mb-2">Minimal</h3>
          <StockOverviewCardV1 
            showActionButtons={false} 
            showAfterHours={false} 
            showKeyData={false} 
          />
        </div>
      </div>
    </>
  );
} 