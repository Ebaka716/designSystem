# System Patterns

*(Architecture, key decisions, design patterns, components, paths)*

# systemPatterns.md

- **System architecture**
- **Key technical decisions**
- **Design patterns in use**
- **Component relationships**
- **Critical implementation paths**

## System Architecture
- Next.js application serving React components.
- Component library housed within `src/components`, separating custom components from base `ui` components added by shadcn.
- Documentation potentially intended for a separate `/docs` route or site (structure exists but not implemented).
- Testing page (`src/app/testing`) serves as a live sandbox for component examples.

## Key Technical Decisions
- Use `shadcn/ui` for component primitives and tooling.
- **Consolidate related component variations** into a single enhanced component (e.g., `ButtonV2`) instead of maintaining multiple version files (V1, V2, V3...),
- Prefer Tailwind CSS utility classes for styling.
- Enhance existing components (like `DetailRowV1`) for flexibility rather than always creating new ones for minor layout variations.

## Design Patterns
- **Consolidated Component Pattern:** Features from Button V1-V4 were merged into ButtonV2, controlled by props (`variant`, `fill`, `size`, `loading`, `icon`, `iconPosition`).
- Employing `shadcn/ui` base components and extending/customizing them.
- Utilizing Tailwind CSS for utility-first styling.
- Using `cva` for managing component variants, including `compoundVariants` for complex conditional styling (e.g., conversational button fill/rounding).
- Conditional rendering in React (`&&`) used in the testing page to show/hide component sections.
- Conditional rendering internally within components based on prop presence (e.g., `primaryContent` vs `primaryText`/`secondaryText` in `DetailRowV1`; loader vs icon/children in `ButtonV2`).
- Data mapping (`array.map()`) used on the testing page to render repetitive examples from data arrays, improving maintainability.
- **Sticky Footer Pattern (CardV1):** Using `flex flex-col h-full` on the card and `flex-1` on the content area to push the footer to the bottom.
- **Quick Actions Footer Pattern:** Custom footer layout using `<hr>` and right-aligned icon buttons (`ButtonV2` size=`icon`), often combined with standard `CardActionFooterV1`.

## Component Relationships
- `CardV1` uses `DetailRowV1` and `CardActionFooterV1` in examples on the testing page.
- `CardActionFooterV1` uses `ButtonV2` in examples.
- `DetailRowV1` uses `ButtonV2` in examples.
- Testing page (`src/app/testing/page.tsx`) uses `shadcn/ui` `sidebar` for navigation and displays examples of custom components (`ButtonV2`, `CardV1`, `DetailRowV1`, `CardActionFooterV1`, `RowV1`).
- Testing page uses `shadcn/ui` `Tooltip` for sidebar menu items.

## Critical Implementation Paths
- Component creation involves:
    - Creating the component file (e.g., `src/components/ComponentName/vN.tsx` or just `ComponentName.tsx` if consolidated).
    - Defining props interface.
    - Implementing component logic and JSX with `cn()` and `cva`.
    - Creating/Updating corresponding documentation file (e.g., `docs/components/ComponentName/vN.md`).
    - Adding examples to the testing page (`src/app/testing/page.tsx`).