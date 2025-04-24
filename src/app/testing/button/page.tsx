'use client'; // Assuming sections might need client-side interactions

import React from 'react';
import { ButtonV2 } from '@/components/Button/v2';

// --- Helper Icons ---
// TODO: Move to shared location if used by other sections
const PlaceholderIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /></svg>
);

export default function ButtonTestingPage() {
  // --- Standard Button Data (using ButtonV2) ---
  const standardButtonData = {
    primary: {
      variant: 'default' as const,
      sizes: [
        { size: 'sm', label: 'Primary Sm' },
        { size: 'default', label: 'Primary Def' },
        { size: 'lg', label: 'Primary Lg' },
      ] as const,
      icons: [
        { label: 'Icon Lead', icon: <PlaceholderIcon />, iconPosition: 'leading' },
        { label: 'Icon Trail', icon: <PlaceholderIcon />, iconPosition: 'trailing' },
      ] as const,
    },
    secondary: {
      variant: 'outline' as const,
      sizes: [
        { size: 'sm', label: 'Secondary Sm' },
        { size: 'default', label: 'Secondary Def' },
        { size: 'lg', label: 'Secondary Lg' },
      ] as const,
      icons: [
        { label: 'Icon Lead', icon: <PlaceholderIcon />, iconPosition: 'leading' },
        { label: 'Icon Trail', icon: <PlaceholderIcon />, iconPosition: 'trailing' },
      ] as const,
    },
    tertiary: {
      variant: 'ghost' as const,
      sizes: [
        { size: 'sm', label: 'Tertiary Sm' },
        { size: 'default', label: 'Tertiary Def' },
        { size: 'lg', label: 'Tertiary Lg' },
      ] as const,
      icons: [
        { label: 'Icon Lead', icon: <PlaceholderIcon />, iconPosition: 'leading' },
        { label: 'Icon Trail', icon: <PlaceholderIcon />, iconPosition: 'trailing' },
      ] as const,
    },
  };

  // --- Conversational Button Data (using ButtonV2) ---
  const conversationalButtonBaseProps = { variant: 'conversational' as const };
  const conversationalButtonSolidData = [
    { fill: 'solid', size: 'sm', label: 'Solid Small' },
    { fill: 'solid', size: 'default', label: 'Solid Default' },
    { fill: 'solid', size: 'lg', label: 'Solid Large' },
    { fill: 'solid', label: 'Solid Icon', icon: <PlaceholderIcon /> },
    { fill: 'solid', label: 'Trailing Icon', icon: <PlaceholderIcon />, iconPosition: 'trailing' },
  ] as const;

  return (
    <>
      {/* --- Standard Buttons --- */}
      {/* Map over categories: Primary, Secondary, Tertiary */}
      {(Object.keys(standardButtonData) as Array<keyof typeof standardButtonData>).map((category) => {
        const categoryData = standardButtonData[category];
        return (
          <div key={category} className="space-y-3">
            <h3 className="text-xl font-medium capitalize">{category}</h3>
            <div className="p-4 border rounded space-y-4">
              {/* Size Variations */}
              <div>
                <h4 className="text-sm font-semibold mb-2 text-muted-foreground">Sizes</h4>
                <div className="flex flex-wrap gap-4 items-center">
                  {categoryData.sizes.map((btn) => (
                    <ButtonV2
                      key={`${category}-size-${btn.size}`}
                      variant={categoryData.variant} 
                      size={btn.size}
                    >
                      {btn.label}
                    </ButtonV2>
                  ))}
                </div>
              </div>
              {/* Icon Variations */}
              <div>
                <h4 className="text-sm font-semibold mb-2 text-muted-foreground">Icons (Default Size)</h4>
                <div className="flex flex-wrap gap-4 items-center">
                  {categoryData.icons.map((btn, index) => (
                    <ButtonV2 
                      key={`${category}-icon-${index}`}
                      variant={categoryData.variant} 
                      size="default" 
                      icon={btn.icon}
                      iconPosition={btn.iconPosition}
                    >
                      {btn.label}
                    </ButtonV2>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* --- Conversational Buttons (Mapped, using ButtonV2) --- */}
      <div className="space-y-4 pt-6">
        <h3 className="text-xl font-medium">Conversational Buttons</h3>
        {/* Solid Fill */}
        <div className="p-4 border rounded flex flex-wrap gap-4 items-center">
          {conversationalButtonSolidData.map((btn, index) => (
            <ButtonV2 key={`convo-solid-${index}`} {...conversationalButtonBaseProps} {...btn}>{btn.label}</ButtonV2>
          ))}
        </div>
      </div>
    </>
  );
} 