import * as React from 'react';
import { cn } from '@/lib/utils';

// Define the possible layout variants
type RowVariant = '2x2' | '2+1';

export interface RowV1Props extends React.HTMLAttributes<HTMLDivElement> {
  /** The layout structure variant */
  variant: RowVariant;
  /** Content elements to place in the grid cells */
  children: React.ReactNode;
  /** Optional gap class for the grid */
  gapClassName?: string; // e.g., 'gap-4'
}

const RowV1 = React.forwardRef<HTMLDivElement, RowV1Props>(
  (
    {
      className,
      variant,
      children,
      gapClassName = 'gap-4', // Default gap
      ...props
    },
    ref
  ) => {
    const gridCells = React.Children.toArray(children);

    // Base grid classes
    const baseGridClasses = 'grid grid-cols-2';

    let layoutSpecificClasses = '';
    let expectedChildrenCount = 0;
    let cellElements: React.ReactNode[] = [];

    if (variant === '2x2') {
      layoutSpecificClasses = 'grid-rows-2';
      expectedChildrenCount = 4;
      if (gridCells.length !== expectedChildrenCount) {
        console.warn(`RowV1 (variant='2x2') expects exactly ${expectedChildrenCount} children, but received ${gridCells.length}.`);
      }
      // Place children directly
      cellElements = gridCells.slice(0, expectedChildrenCount).map((child, index) => (
        <div key={`cell-2x2-${index}`}>{child}</div>
      ));
      // Add placeholders if not enough children
      while (cellElements.length < expectedChildrenCount) {
        cellElements.push(<div key={`placeholder-${cellElements.length}`} className="border border-dashed p-4 text-muted-foreground text-center text-sm">Placeholder</div>);
      }

    } else if (variant === '2+1') {
      layoutSpecificClasses = 'grid-rows-2'; 
      expectedChildrenCount = 3;
      if (gridCells.length > expectedChildrenCount) {
        console.warn(`RowV1 (variant='2+1') expects at most ${expectedChildrenCount} children, but received ${gridCells.length}. Extra children will be ignored.`);
      } else if (gridCells.length < expectedChildrenCount) {
         console.warn(`RowV1 (variant='2+1') expects ${expectedChildrenCount} children, but received ${gridCells.length}. Placeholders will be rendered.`);
      }
      
      // Map provided children to specific grid cells with placement classes
      const cellMap: { [key: number]: React.ReactNode } = {};
      React.Children.forEach(children, (child, index) => {
        if (index < expectedChildrenCount) {
            if (index === 0) { // Top-left
              cellMap[0] = <div key={`cell-2+1-${index}`} className="col-start-1 row-start-1">{child}</div>;
            } else if (index === 1) { // Bottom-left
              cellMap[1] = <div key={`cell-2+1-${index}`} className="col-start-1 row-start-2">{child}</div>;
            } else if (index === 2) { // Right (spans 2 rows)
              cellMap[2] = <div key={`cell-2+1-${index}`} className="col-start-2 row-start-1 row-span-2">{child}</div>;
            }
        }
      });

      // Ensure all 3 cell positions are filled, adding placeholders if needed
      cellElements = [
        cellMap[0] || <div key="placeholder-0" className="col-start-1 row-start-1 border border-dashed p-4 text-muted-foreground text-center text-sm">Placeholder TL</div>,
        cellMap[1] || <div key="placeholder-1" className="col-start-1 row-start-2 border border-dashed p-4 text-muted-foreground text-center text-sm">Placeholder BL</div>,
        cellMap[2] || <div key="placeholder-2" className="col-start-2 row-start-1 row-span-2 border border-dashed p-4 text-muted-foreground text-center text-sm">Placeholder R</div>
      ];
    }

    return (
      <div
        ref={ref}
        className={cn(
          'w-full', // Take full width
          baseGridClasses,
          layoutSpecificClasses,
          gapClassName, // Apply gap
          className
        )}
        {...props}
      >
        {cellElements}
      </div>
    );
  }
);
RowV1.displayName = 'RowV1';

export { RowV1 }; 