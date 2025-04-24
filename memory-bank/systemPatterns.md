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
- Adopt iterative versioning (v1, v2, etc.) within `src/components` for exploring component designs.
- Prefer Tailwind CSS utility classes for styling.
- Enhance existing components (like `DetailRowV1`) for flexibility rather than always creating new ones for minor layout variations.

## Design Patterns
- Using iterative component design (v1, v2, etc.) to explore different features and styles.
- Employing `shadcn/ui` base components and extending/customizing them.
- Utilizing Tailwind CSS for utility-first styling.
- Using `cva` for managing component variants.
- Conditional rendering in React (`&&`) used in the testing page to show/hide component sections.
- Conditional rendering internally within components based on prop presence (e.g., `primaryContent` vs `primaryText`/`secondaryText` in `DetailRowV1`).
- Using compound variants in `cva` to apply styles based on combinations of props (e.g., `ButtonV4` conversational variant + fill).
- Data mapping (`array.map()`) used on the testing page to render repetitive examples (Buttons, CardActionFooters) from data arrays, improving maintainability.

## Component Relationships
- `CardV1` uses `DetailRowV1` and `CardActionFooterV1` in examples on the testing page.
- `CardActionFooterV1` uses `ButtonV2`, `ButtonV3`, `ButtonV4` in examples.
- `DetailRowV1` uses `ButtonV2`, `ButtonV3` in examples.
- Testing page (`src/app/testing/page.tsx`) uses `shadcn/ui` `sidebar` for navigation and displays examples of custom components (Button, Card, DetailRowV1, CardActionFooterV1, etc.).
- Testing page uses `shadcn/ui` `Tooltip` for sidebar menu items.

## Critical Implementation Paths
- Component creation involves:
    - Creating the component file (e.g., `src/components/Component/vN.tsx`).
    - Defining props interface.
    - Implementing component logic and JSX with `cn()` and `cva`.
    - Creating corresponding documentation file (e.g., `docs/components/Component/vN.md`).
    - Adding examples to the testing page (`src/app/testing/page.tsx`).