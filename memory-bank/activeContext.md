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
- Refactoring remaining sections on the testing page (e.g., Card Row Layouts, Detail Row examples) using data mapping.
- Implementing documentation for recently added/updated components (ButtonV4, RowV1, DetailRowV1, CardActionFooterV1).
- Deciding on the next new component to build (e.g., `Layout`, `CardGraphPlaceholder`).

## Recent Changes
- Corrected the persistent `Module not found: Can\'t resolve \'@/components/AccountDetailRow/v1\'` error by ensuring the import path pointed to `DetailRowV1`.
- Added examples for `ButtonV4` (conversational) to `CardActionFooterV1` on the testing page.
- Added a conversational card example with a right-aligned header (including icon) and multiple `DetailRowV1` instances to the testing page.
- Removed box-shadow from all `CardV1` instances on the testing page (`shadow-none`).
- Committed changes related to conversational card and shadow removal.
- Hidden the "Row (Layout)" section on the testing page by commenting out its entry in the `components` array and removing its rendering block.
- Refactored Button examples (V1-V4) on the testing page to use data arrays and mapping.
- Refactored Card Action Footer examples on the testing page to use a data array and mapping.
- Removed disabled button variants from testing page examples.
- Adjusted button usage in Card Action Footer examples (using conversational V4 for specific examples).
- Moved the sidebar collapse/expand trigger from the header into the top of the sidebar menu, with conditional alignment based on sidebar state.
- Added tooltips (using `shadcn/ui` `Tooltip`) to sidebar menu items.
- Enhanced `DetailRowV1` component (`src/components/DetailRow/v1.tsx`) to accept an optional `primaryContent` prop, allowing custom JSX for the left side.
- Added an "Activity Log" style example to the testing page using the enhanced `DetailRowV1` with `primaryContent` to display a vertical stack (Date, Account, Description) on the left.
- Committed refactoring and UI enhancement changes.

## Next Steps
- Refactor the "Card Row Layouts" section on the testing page using data mapping where appropriate.
- Refactor the standard "Detail Row" examples on the testing page using data mapping.
- Create/update documentation for `ButtonV4`, `RowV1`, `DetailRowV1`, `CardActionFooterV1`.
- Consider removing the hidden "Row (Layout)" section code entirely from the testing page if the component isn\'t needed.

## Active Decisions & Considerations
- Using data mapping to render repetitive examples on the testing page improves maintainability.
- Modifying existing components (like `DetailRowV1` with `primaryContent`) can be preferable to creating new ones if the core functionality is similar and flexibility is desired.
- Tooltips are useful for icon-only buttons, especially in collapsed states.

## Patterns & Preferences
- Following shadcn/ui conventions (`cn` utility, `cva` for variants).
- Generating separate component files (`v1.tsx`, `v2.tsx`, etc.) for distinct iterations.
- Generating parallel Markdown documentation files.
- Aiming for a professional financial-services aesthetic.
- Using CSS variables and data attributes provided by `shadcn/ui` components (like `sidebar`) for responsive layout adjustments.
- Using CSS Grid for complex layout structures within components (e.g., new `RowV1`).
- Wrapping icons in styled `span` elements can be a workaround for `React.cloneElement` type issues with certain icon libraries/types.
- Using data arrays and `.map()` to render repetitive UI elements for better code maintainability on testing/demo pages.
- Conditionally rendering component sections or internal structures based on props (e.g., `primaryContent` vs. text props in `DetailRowV1`).

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