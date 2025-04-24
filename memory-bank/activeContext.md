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
- Investigating and resolving the persistent `Module not found` error.
- Restoring the intended button example structure on the testing page.

## Recent Changes
- Scaffolded `Row`, `Card`, `CardContentSection`, and `CardActionRow` components and documentation (V1, V2, V3 for each).
- Added examples for all components to the testing page (`src/app/testing/page.tsx`).
- **DELETED** `Row` component (V1, V2, V3) and its documentation due to a change in direction.
- Removed all references to `Row` from the testing page and other components (`CardActionRowV1`, `CardActionRowV2`, `CardV3`).
- Replaced `RowV2` usage in affected components with standard `div` and Tailwind flexbox classes.
- Implemented a basic custom sidebar navigation component (`SidebarNav`) in the testing page.
- Replaced the custom sidebar with `shadcn/ui` `navigation-menu`.
- Replaced `navigation-menu` with the collapsible `shadcn/ui` `sidebar` component (`SidebarProvider`, `Sidebar`, `SidebarContent`, `SidebarMenu`, etc.).
- Added a `SidebarTrigger` button to control the collapsible state.
- Adjusted main content layout to accommodate the collapsible sidebar using CSS variables (`--sidebar-width`) and data attributes (`data-[sidebar-open=...]`).
- Refined spacing and removed separators on the testing page for better visual consistency.
- Created new grid layout component `src/components/Row/v1.tsx` with '2x2' and '2+1' variants.
- Added examples for the new Row layout to the testing page.
- Replaced `AccountDetailRowV1` with `DetailRowV1` component.
- Added `CardActionFooterV1` component.
- Added examples for `DetailRowV1` and `CardActionFooterV1` to the testing page, including combined examples within `CardV1`.
- Removed examples and related code for `CardContentSection`, `CardActionRow`, `DatePicker`, `Combobox`, `CardV2`, `CardV3` from the testing page.
- Created `ButtonV4` component (`src/components/Button/v4.tsx`) with `conversational` variant and `solid`/`outline`/`ghost` fill options.
- Added examples for `ButtonV4` to the testing page.
- Resolved icon handling type error in `ButtonV4` by using a `span` wrapper instead of `React.cloneElement`.
- Synchronized `docs/components` documentation with components used on the testing page (deleted unused MD files, created new MD files for RowV1, DetailRowV1, CardActionFooterV1).
- Initialized Git repository and made initial commit.
- Updated `src/app/layout.tsx` metadata to set browser tab title to "Design System".
- Added size variants (sm, default, lg) to `ButtonV1` and `ButtonV2` components and updated their documentation.
- Updated testing page (`src/app/testing/page.tsx`) to include size examples for ButtonV1/V2.
- Re-added complex card examples ("Multiple Accounts" in 2/3 card rows) to the "Card Row Layouts" section on the testing page.
- Removed separator line above footer in the complex card row examples.
- Committed recent changes (button sizes, card examples) to Git.
- **Attempted** to reorganize button examples (Primary/Secondary/Tertiary) on testing page, but changes were **reverted**.

## Next Steps
- **Fix the persistent `Module not found` error.**
- **Re-apply** the button example reorganization (Primary/Secondary/Tertiary) on the testing page.
- Clean up button usage within other component examples (e.g., DetailRow, CardActionFooter) to align with the Primary/Secondary/Tertiary classification.
- Decide on the next component to implement (e.g., `Layout`).

## Active Decisions & Considerations
- Using `shadcn/ui` `sidebar` component for the testing page navigation is preferred over custom implementation or `navigation-menu` for its built-in collapsible functionality.
- The testing page (`src/app/testing/page.tsx`) needs to be a client component (`'use client';`) due to the use of `useState` and the sidebar context.
- Using CSS Grid for complex layout structures within components (e.g., new `RowV1`).
- Wrapping icons in styled `span` elements can be a workaround for `React.cloneElement` type issues with certain icon libraries/types.
- The build server error message for the import seems highly persistent and may require restarting the dev server or clearing caches after fixing the import path.

## Patterns & Preferences
- Following shadcn/ui conventions (`cn` utility, `cva` for variants).
- Generating separate component files (`v1.tsx`, `v2.tsx`, etc.) for distinct iterations.
- Generating parallel Markdown documentation files.
- Aiming for a professional financial-services aesthetic.
- Using CSS variables and data attributes provided by `shadcn/ui` components (like `sidebar`) for responsive layout adjustments.
- Using CSS Grid for complex layout structures within components (e.g., new `RowV1`).

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