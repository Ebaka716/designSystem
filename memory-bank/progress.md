# Progress

*(What works, what's left, status, issues, decision evolution)*

## What Works
- Next.js project setup (`create-next-app`, manual file merge via `rsync`).
- `shadcn/ui` initialization and configuration.
- Base `button` component added via `shadcn add`.
- `Button` component iterations (v1, v2, v3) created in `src/components/Button/`.
  - v1: Solid primary/secondary.
  - v2: Outline/ghost with icon slot.
  - v3: Size variants (sm, default, lg) and loading state.
- Documentation structure set up (`docs/components/Button/`).
- Markdown documentation generated for Button v1, v2, v3.
- `Card` component iterations (v1, v2, v3) created in `src/components/Card/`.
- `CardContentSection` component iterations (v1, v2, v3) created in `src/components/CardContentSection/`.
- `CardActionRow` component iterations (v1, v2, v3) created in `src/components/CardActionRow/`.
- Documentation generated for Card, CardContentSection, CardActionRow (v1, v2, v3).
- Testing page (`src/app/testing/page.tsx`) created to display component examples.
- Collapsible sidebar navigation implemented on testing page using `shadcn/ui` `sidebar` component.
- Layout adjustments for main content based on sidebar state.
- New `Row` component (V1 - grid layout) created in `src/components/Row/`.
  - v1: 2x2 and 2+1 grid layouts.
- Examples for new Row layout added to testing page.
- `DetailRowV1` created (replacing `AccountDetailRowV1`).
- `CardActionFooterV1` created.
- Examples for `DetailRowV1` and `CardActionFooterV1` added to testing page.
- `ButtonV4` (conversational variant with fill options) created.
- Examples for `ButtonV4` added to testing page.

## What's Left to Build
- `Row` component V2/V3 (layout variants) and documentation (if needed).
- `Layout` component (v1, v2, v3) and documentation.
- Potentially other components like `CardGraphPlaceholder`.

## Current Status
- Button, Card, DetailRow, CardActionFooter implementation and documentation (v1-v4 for Button; v1 for others).
- Testing page provides a functional sandbox with collapsible navigation.
- Testing page has been cleaned up: examples for CardContentSection, CardActionRow, DatePicker, Combobox, CardV2, CardV3 have been removed.
- Testing page CardV1 section restructured with more complex examples.

## Known Issues
- Persistent `Module not found: Can't resolve '@/components/AccountDetailRow/v1'` error in `src/app/testing/page.tsx` (line 50) despite multiple attempts to fix the import path to `DetailRowV1`. This suggests the error message might be stale or pointing to a different underlying issue.

## Evolution of Project Decisions
- Initial `create-next-app` failed due to directory name; resolved by using a temporary directory and `rsync`.
- Initial `shadcn init` failed due to missing config files; resolved by ensuring correct file merge with `rsync`.
- Refined Button v2 icon spacing to use `gap` utility instead of manual margins.
- Adopted `src/components/<ComponentName>` for custom iterations, separate from `src/components/ui`.
- Decided to remove the `Row` component as it might not be needed or can be replaced by simple flex divs/Tailwind.
- Switched testing page navigation from a custom implementation to `shadcn/ui` `navigation-menu`, then finally to `shadcn/ui` `sidebar` for better collapsible functionality.
- Made the testing page a client component (`'use client';`) to support state and context needed for the sidebar.
- Re-introduced `Row` component name, but with a different purpose (grid layout instead of flexbox).
- Replaced `AccountDetailRowV1` with `DetailRowV1` for more generic naming.
- Cleaned up testing page to focus on core components and reduce clutter.
- Added `ButtonV4` to explore a more thematic variant.
- Used a `span` wrapper approach for icon rendering in `ButtonV4` to avoid `React.cloneElement` type errors.