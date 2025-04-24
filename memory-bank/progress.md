# Progress

*(What works, what's left, status, issues, decision evolution)*

## What Works
- Next.js project setup (`create-next-app`, manual file merge via `rsync`).
- `shadcn/ui` initialization and configuration.
- Base `button` component added via `shadcn add`.
- `Button` component iterations (v1, v2, v3, v4) created in `src/components/Button/`.
  - v1: Solid primary/secondary (with sizes).
  - v2: Outline/ghost with icon slot (with sizes).
  - v3: Size variants (sm, default, lg) and loading state.
  - v4: Conversational variant with fill options (solid, outline, ghost).
- Documentation structure set up (`docs/components/Button/`).
- Markdown documentation generated for Button v1, v2, v3.
- `Card` component iterations (v1) created in `src/components/Card/`. (V2/V3 removed from testing page).
- `CardContentSection` component iterations (v1, v2, v3) created (but examples removed from testing page).
- `CardActionRow` component iterations (v1, v2, v3) created (but examples removed from testing page).
- Documentation generated for Card, CardContentSection, CardActionRow (v1, v2, v3).
- Testing page (`src/app/testing/page.tsx`) created to display component examples.
- Collapsible sidebar navigation implemented on testing page using `shadcn/ui` `sidebar` component.
- Layout adjustments for main content based on sidebar state.
- New `Row` component (V1 - grid layout) created in `src/components/Row/` (but section hidden on testing page).
  - v1: 2x2 and 2+1 grid layouts.
- `DetailRowV1` created (replacing `AccountDetailRowV1`) and enhanced with `primaryContent` prop for custom left-side layouts.
- `CardActionFooterV1` created.
- Examples for `DetailRowV1` and `CardActionFooterV1` added to testing page.
- Examples for `ButtonV1-V4` added to testing page.
- Documentation files synchronized with testing page usage (deleted unused, created missing).
- Git repository initialized and commits made tracking progress.
- Browser tab title updated to 'Design System'.
- Size variants (sm, default, lg) added to ButtonV1 and ButtonV2.
- Button documentation and testing page examples updated for new sizes.
- Testing page (`src/app/testing/page.tsx`) examples refactored:
  - Button examples (V1-V4) now use data arrays and mapping for rendering.
  - Card Action Footer examples now use a data array and mapping for rendering.
- Testing page UI improvements:
  - Sidebar collapse/expand trigger moved into the sidebar header.
  - Tooltips added to sidebar menu items.
- Specific "Activity Log" style example added using the enhanced `DetailRowV1` with `primaryContent`.
- Card shadows removed from all `CardV1` instances on the testing page.

## What's Left to Build
- `Row` component V2/V3 (if needed) and documentation. Consider if grid component is still required or if hidden section should be removed entirely.
- `Layout` component (v1, v2, v3) and documentation.
- Potentially other components like `CardGraphPlaceholder`.
- Refactor remaining sections on testing page (e.g., Card Row Layouts, Detail Row examples) using data mapping.
- Documentation for ButtonV4, RowV1, DetailRowV1, CardActionFooterV1.

## Current Status
- Core components (Button, Card, DetailRow, CardActionFooter) exist with V1 implementations widely used in testing page examples. Button has V1-V4.
- Testing page provides a functional sandbox with collapsible navigation and some refactored example sections.
- `DetailRowV1` has been made more flexible with the `primaryContent` prop.
- Git history reflects recent refactoring and feature additions.

## Known Issues
- Button examples on testing page were reverted unintentionally, losing the Primary/Secondary/Tertiary structure (though the data mapping refactor may supersede this).

## Evolution of Project Decisions
- Initial `create-next-app` failed due to directory name; resolved by using a temporary directory and `rsync`.
- Initial `shadcn init` failed due to missing config files; resolved by ensuring correct file merge with `rsync`.
- Refined Button v2 icon spacing to use `gap` utility instead of manual margins.
- Adopted `src/components/<ComponentName>` for custom iterations, separate from `src/components/ui`.
- Decided to remove the `Row` component (layout variants) as it might not be needed or can be replaced by simple flex divs/Tailwind.
- Switched testing page navigation from a custom implementation to `shadcn/ui` `navigation-menu`, then finally to `shadcn/ui` `sidebar` for better collapsible functionality.
- Made the testing page a client component (`'use client';`) to support state and context needed for the sidebar/tooltips.
- Re-introduced `Row` component name, but with a different purpose (grid layout instead of flexbox). Section later hidden on testing page.
- Replaced `AccountDetailRowV1` with `DetailRowV1` for more generic naming.
- Cleaned up testing page to focus on core components and reduce clutter.
- Added `ButtonV4` to explore a more thematic variant.
- Used a `span` wrapper approach for icon rendering in `ButtonV4` to avoid `React.cloneElement` type errors.
- Synced component documentation files with active components on testing page.
- Initialized Git repository.
- Updated application metadata title.
- Added size variants to ButtonV1/V2 for consistency.
- Testing page structure was reorganized for buttons, but this change was lost/reverted. Subsequent refactor used data mapping instead.
- Corrected persistent `Module not found` error for DetailRow import path.
- Removed shadows from Card examples on testing page for a flatter look.
- Moved sidebar trigger from header into the sidebar itself (first bottom, then top, with alignment logic).
- Added tooltips to sidebar items using shadcn/ui Tooltip components.
- Enhanced `DetailRowV1` to accept `primaryContent` prop for more flexible left-side content rendering, enabling the "Activity Log" example layout.