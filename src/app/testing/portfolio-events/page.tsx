'use client';

import React from 'react';
// Import the new component once created
import { PortfolioEventsCardV1 } from '@/components/PortfolioEventsCard/v1';

export default function PortfolioEventsTestingPage() {
  return (
    <>
      <h2 className="text-2xl font-semibold mb-4">Portfolio Events Card Example</h2>
      <div className="max-w-md mx-auto"> { /* Constrain width for demo */ }
        <PortfolioEventsCardV1 /> 
        {/* <p>Portfolio Events Card component will be rendered here.</p> */}
      </div>
    </>
  );
} 