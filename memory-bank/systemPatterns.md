# System Patterns

*(Architecture, key decisions, design patterns, components, paths)*

# systemPatterns.md

- **System architecture**
- **Key technical decisions**
- **Design patterns in use**
- **Component relationships**
- **Critical implementation paths**

## System Architecture
- 

## Key Technical Decisions
- 

## Design Patterns
- Using iterative component design (v1, v2, v3) to explore different features and styles.
- Employing `shadcn/ui` base components and extending/customizing them.
- Utilizing Tailwind CSS for utility-first styling.
- Using `cva` for managing component variants.
- Conditional rendering in React (`&&`) used in the testing page to show/hide component sections.
- Using compound variants in `cva` to apply styles based on combinations of props (e.g., `ButtonV4` conversational variant + fill).

## Component Relationships
- `Card` uses `DetailRowV1` and `CardActionFooterV1` in examples on the testing page.
- `Card` uses `CardContentSection` and `CardActionRow` internally (often passed as props or children).
- `CardActionRow` originally used `RowV2` (now deleted) and now uses basic flexbox divs.
- `CardV3` uses `ui/card` primitives from `shadcn/ui`.
- Testing page (`src/app/testing/page.tsx`) uses `shadcn/ui` `sidebar` for navigation and displays examples of custom components (Button, Card, etc.).

## Critical Implementation Paths
- 