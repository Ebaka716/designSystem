'use client';

import React from 'react';
import { StackedButtonCardV1 } from '@/components/StackedButtonCard';

export default function StackedButtonCardPage() {
  const sampleButtons = [
    { id: 'action-1', label: 'View Account Details', onClick: () => alert('Viewing Details...') },
    { id: 'action-2', label: 'Make a Payment' },
    { id: 'action-3', label: 'Request Statement' },
    { id: 'action-4', label: 'Update Profile' },
    { id: 'action-5', label: 'Contact Support' },
    { id: 'action-6', label: 'This one wont show' }, // Example extra button
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Stacked Button Card Component</h2>
      
      <div className="max-w-xs"> {/* Constrain width for demo */}
        <h3 className="text-lg font-medium mb-2">Default (5 Buttons)</h3>
        <StackedButtonCardV1 
          cardTitle="Quick Actions"
          buttons={sampleButtons}
        />
      </div>

      <div className="max-w-xs"> 
        <h3 className="text-lg font-medium mb-2">Fewer than 5 Buttons</h3>
        <StackedButtonCardV1 
          cardTitle="Account Options"
          buttons={sampleButtons.slice(0, 3)} // Only pass 3 buttons
        />
      </div>

      <div className="max-w-xs"> 
        <h3 className="text-lg font-medium mb-2">No Buttons (Shows Placeholders)</h3>
        <StackedButtonCardV1 
          cardTitle="No Actions Available"
          buttons={[]}
        />
      </div>
    </div>
  );
} 