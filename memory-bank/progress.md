# Progress

*(What works, what's left, status, issues, decision evolution)*

## What Works
- Next.js project setup (`create-next-app`, manual file merge via `rsync`).
- `shadcn/ui` initialization and configuration.
- Base `button` component added via `shadcn add`.
- Consolidated `ButtonV2` component supporting `default`, `outline`, `ghost`, and `conversational` variants with `size`, `icon`, `loading`, and `fill` (for conversational) props.
- Documentation structure set up (`docs/components/`).
- `Card` component iterations (v1) created in `src/components/Card/`. (V2/V3 removed from testing page).
- `CardContentSection` component iterations (v1, v2, v3) created (but examples removed from testing page).
- `CardActionRow` component iterations (v1, v2, v3) created (but examples removed from testing page).
- Documentation generated for Card, CardContentSection, CardActionRow (v1, v2, v3).
- Testing page (`src/app/testing/page.tsx`) created to display component examples.
- Collapsible sidebar navigation implemented on testing page using `shadcn/ui` `sidebar` component.
- Layout adjustments for main content based on sidebar state.
- `RowV1` component (grid layout) created (but section removed from testing page).
  - v1: 2x2 and 2+1 grid layouts.
- `DetailRowV1` created (replacing `AccountDetailRowV1`) and enhanced with `primaryContent` prop for custom left-side layouts.
- `CardActionFooterV1` created.
- Examples for `DetailRowV1` and `CardActionFooterV1` added to testing page.
- Examples for `ButtonV2` (Standard and Conversational) added to testing page.
- Documentation files updated for `ButtonV2`, `RowV1`, `DetailRowV1`, `CardActionFooterV1`.
- Git repository initialized and commits made tracking progress.
- Browser tab title updated to 'Design System'.
- Testing page (`src/app/testing/page.tsx`) examples refactored:
  - Button examples now use data arrays and mapping (Standard and Conversational sections).
  - Card Action Footer examples now use a data array and mapping.
  - Card Row Layout examples use data arrays and mapping.
  - Detail Row examples (partially) use data arrays and mapping.
- Testing page UI improvements:
  - Sidebar collapse/expand trigger moved into the sidebar header.
  - Tooltips added to sidebar menu items.
- Specific "Activity Log" style example added using `DetailRowV1` with `primaryContent`.
- Card shadows removed from all `CardV1` instances on the testing page.
- ButtonV2 `icon` size variant added.
- CardV1 layout updated to support sticky footer (`flex flex-col h-full`, `flex-1` on content).
- CardV1 `title` and `content` props renamed to `cardTitle` and `cardContent` to avoid HTML attribute conflicts.
- CardActionFooterV1 now relies on parent/instance padding.
- New "Quick Actions" footer examples added to testing page (icons below separator).
  - Examples include Quick Actions only, Standard Footer + Quick Actions, Conversational Footer + Quick Actions.
  - Examples arranged in a responsive grid layout.
- Market Movers, Markets, Market News, and Balance Card examples added to testing page.
- Charts implemented using `recharts`.
- Testing page dependency (`recharts`) and linting issues resolved.
- Large Balance Card example increased in size.

## What's Left to Build
- `Layout` component (v1, v2, v3) and documentation.
- Refactor `testing/page.tsx` into sub-pages.
- Documentation updates for `CardV1`, `CardContentSection`, `CardActionRow` if still relevant.

## Current Status
- Core components (`ButtonV2`, `CardV1`, `DetailRowV1`, `CardActionFooterV1`) exist.
- `ButtonV2` is the consolidated button component.
- Testing page provides a functional sandbox with examples mostly using data mapping.
- `DetailRowV1` has been made more flexible with the `primaryContent` prop.
- `CardV1` supports sticky footer layout.
- Quick Actions footer pattern demonstrated on testing page.
- Git history reflects recent refactoring and feature additions.
- `testing/page.tsx` is functional but large and scheduled for refactoring into sub-pages.

## Known Issues
- None currently identified.

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
- Adopted iterative versioning (v1, v2, etc.) within `src/components` - **Evolved:** Consolidated Button V1-V4 into a single enhanced ButtonV2.
- Removed hidden "Row (Layout)" section from testing page examples entirely.
- Corrected button display logic on testing page, consolidating onto `ButtonV2`.
- Decided against using `ButtonV1`/`V3` due to feature limitations compared to `ButtonV2`. Chose to enhance `ButtonV2` instead of creating `ButtonV5`.
- Added `icon` size to `ButtonV2` for icon-only buttons.
- Resolved `asChild`/`Slot` issues with `TooltipTrigger` by removing `asChild` for icon buttons and ensuring it's present for sidebar menu items.
- Renamed `CardV1` props (`title`->`cardTitle`, `content`->`cardContent`) due to naming conflicts with standard HTML attributes revealed by stricter type checking/linting.
- Implemented sticky footer layout in `CardV1` using flexbox to ensure footer always appears at the bottom.
- Refined padding approach for `CardActionFooterV1`, applying it directly to instances in combined examples rather than modifying the component globally.
- Decided to refactor the `testing/page.tsx` into sub-pages due to increasing size and complexity.