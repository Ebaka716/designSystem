# Active Context

*(Current focus, recent changes, next steps, decisions, patterns, insights)*

# activeContext.md

- **Current work focus**
- **Recent changes**
- **Next steps**
- **Active decisions and considerations**
- **Important patterns and preferences**
- **Learnings and project insights**

## Current Focus
- Refactor testing page (`src/app/testing/page.tsx`) into sub-pages.
- **Update:** Clean up remaining testing sub-pages (`card`, `detail-row`, etc.) to align with the new layout structure (removing redundant wrappers/headers).

## Recent Changes
- Refactored testing page Card Row Layout examples using data mapping.
- Refactored testing page Detail Row examples (excluding Activity Log style) using data mapping.
- Updated documentation for `ButtonV4`, `RowV1`, `DetailRowV1`, `CardActionFooterV1`. (Note: ButtonV4 docs later deleted).
- Removed hidden "Row (Layout)" section from testing page code.
- **Consolidated Button Components:**
    - Enhanced `ButtonV2` to support `default`, `outline`, `ghost`, and `conversational` variants.
    - Added `loading` state support to `ButtonV2`.
    - Added `fill` prop to `ButtonV2` for conversational variant styling.
    - Removed `ButtonV1`, `ButtonV3`, `ButtonV4` components and documentation.
    - Refactored testing page to use only `ButtonV2` for all examples (Standard and Conversational).
    - Updated `ButtonV2` documentation to reflect its new consolidated role.
    - Updated imports and usage across the testing page to use only `ButtonV2`.
- Committed consolidation changes to Git.
- Fixed JSX structure issues on testing page after button refactoring.
- **Added Quick Action Footer Pattern:**
    - Added examples to testing page showing separator + right-aligned icon buttons.
    - Included variations: Quick Actions only, Standard Footer + Quick Actions, Conversational Footer + Quick Actions.
    - Arranged examples in a responsive grid.
    - Refined layout to ensure full-width separator and correct alignment/spacing.
- Added `icon` size variant to `ButtonV2`.
- Updated `CardV1` component:
    - Implemented sticky footer layout (flex-col, flex-1 content).
    - Renamed `title` -> `cardTitle`, `content` -> `cardContent` to avoid HTML attribute conflicts.
    - Updated testing page examples to use new prop names.
- Fixed `TooltipTrigger` `asChild` issues (removed for icon buttons, added back for sidebar).
- Refined `CardActionFooterV1` padding (reverted component change, added padding to specific instances on testing page).
- Committed quick action footer changes to Git.
- Added Market Movers, Markets, Market News, and Balance Card examples to testing page.
- Added `recharts` dependency for charts.
- Increased size of large Balance Card example (`max-w-3xl`).
- Fixed `recharts` missing dependency build error.
- Fixed ESLint errors (unused imports, unescaped entities) in `testing/page.tsx`.
- **Refactored Testing Sandbox Structure:**
  - Diagnosed nested layout issue causing duplicated headers/sidebars.
  - Identified `src/app/testing/layout.tsx` as the source of the outer layout.
  - Moved primary layout definition (sidebar, header, providers) exclusively to `src/app/testing/layout.tsx`.
  - Modified sidebar in `layout.tsx` to use Next.js `<Link>` components and `usePathname` for navigation.
  - Stripped `src/app/testing/page.tsx` down to a basic placeholder, removing all layout, state, and dynamic rendering.
  - Moved Market News example code into `src/app/testing/market-news/page.tsx`.
  - Moved Balance Card example code into `src/app/testing/balance/page.tsx`.
  - Cleaned up `src/app/testing/button/page.tsx` and `src/app/testing/balance/page.tsx` to remove redundant layout wrappers and headers.
  - Removed Outline, Ghost, and Loading conversational button examples from `src/app/testing/button/page.tsx`.
- Committed testing page refactor changes to `devTree` branch.
- Pushed `devTree` branch to remote GitHub repository.

## Next Steps
- Update Memory Bank files (this task - in progress).
- Clean up remaining testing sub-pages (`card`, `detail-row`, `card-action-footer`, `card-row-layouts`, `market-movers`, `market-news`, `markets`) to remove redundant layout/header elements.
- Review and potentially update component documentation (`docs/components/*`) to reflect current state (e.g., create docs for Balance Card).

## Active Decisions & Considerations
- `ButtonV2` is now the single source of truth for button components.
- Enhancing an existing component (`ButtonV2`) was preferred over creating `ButtonV5`.
- Card footer should stick to the bottom of the card (`CardV1` layout change).
- Prop names in custom components should avoid conflicts with standard HTML attributes (`cardTitle`, `cardContent`).
- `testing/page.tsx` has become too large and needs refactoring into sub-pages for better maintainability.
- The refactor will involve creating a shared `layout.tsx` and separate `page.tsx` files for each component section.
- The testing sandbox (`/testing`) will use a shared `layout.tsx` for the main frame and navigation, with individual component examples isolated in sub-route `page.tsx` files.

## Patterns & Preferences
- Following shadcn/ui conventions (`cn` utility, `cva` for variants).
- **Consolidating component variations** into a single, well-prop-controlled component (like `ButtonV2`) is preferred over multiple versioned files when features overlap significantly.
- Generating parallel Markdown documentation files.
- Aiming for a professional financial-services aesthetic.
- Using data arrays and `.map()` to render repetitive UI examples for maintainability.
- Conditionally rendering component sections or internal structures based on props.
- Using flexbox for layout, including sticky footers in cards.
- Handling component padding internally where possible, but overriding via `className` when context requires specific adjustments (e.g., `CardActionFooterV1` padding in combined examples).
- Utilizing Next.js App Router `layout.tsx` conventions for shared UI is the standard approach for route segments.

## Learnings & Insights
- `create-next-app` can be sensitive to parent directory names.
- `shadcn init` framework detection requires specific config files in the project root.
- Explicitly using `gap` in `cva` base styles is cleaner for icon spacing than manual margins.
- `shadcn/ui` `navigation-menu` is not inherently collapsible like a sidebar.
- The `shadcn/ui` `sidebar` component provides context (`SidebarProvider`, `useSidebar`) and requires components using it to be client components or wrapped appropriately.
- Replacing components requires careful removal of all imports and usages throughout the project.
- Automated edits can sometimes misinterpret complex JSX structures; manual verification or providing full file content can be safer.
- TypeScript errors with `React.cloneElement` can be tricky, potentially related to prop type inference or library specifics.
- Build/dev server error messages might sometimes be stale or misleading after multiple quick edits, potentially requiring server restarts.
- File reverts (manual or automated) can easily undo progress if not carefully managed.
- Standard component props might need modification (e.g., adding `primaryContent` to `DetailRowV1`) to accommodate specific layout requirements not initially foreseen.
- Iterative component design can lead to redundancy; consolidation may be necessary.
- Type errors during refactoring often indicate incorrect assumptions about component props; verifying source code is crucial.
- Complex multi-part edits can sometimes fail or be partially applied; breaking changes into smaller steps can improve reliability.
- Global rendering issues are more likely tied to docs generation/MDX processing or global layouts than specific page components when standard Next.js routing is used.
- Conflicts between custom prop names and standard HTML attributes can cause subtle type errors or linting issues.
- Radix UI `Slot` / `asChild` prop requires careful consideration of the child component's structure to avoid errors; sometimes removing `asChild` is the simplest fix.
- Achieving sticky footers often involves making the parent a flex column and allowing the main content area to grow (`flex-1`).
- Duplicated UI elements (headers, sidebars) often indicate nested layouts in Next.js, typically involving a `layout.tsx` file applying layout to its child routes/pages.
- Confirming the existence and content of `layout.tsx` files is crucial when debugging layout issues in the App Router.
- Refactoring complex pages into layout + sub-page structures improves maintainability and aligns with Next.js conventions.