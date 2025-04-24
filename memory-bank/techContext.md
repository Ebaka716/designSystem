# Tech Context

*(Technologies, setup, constraints, dependencies, tools)*

## Technologies Used
- Next.js (React framework)
- React 19
- TypeScript
- Tailwind CSS
- shadcn/ui (Component primitives/CLI)
- lucide-react (Icons)

## Development Setup
- 

## Technical Constraints
- 

## Dependencies
- Core: `next`, `react`, `react-dom`, `typescript`
- Styling: `tailwindcss`, `postcss`, `autoprefixer`
- UI/Components: `@radix-ui/*` (via shadcn), `class-variance-authority`, `clsx`, `tailwind-merge`, `lucide-react`
- shadcn/ui components added: `button`, `card`, `navigation-menu` (removed later), `sidebar`, `separator`, `sheet`, `tooltip`, `input`, `skeleton`.

## Tool Usage Patterns
- `npx create-next-app` for initial project scaffolding.
- `npx shadcn@latest init` for setting up shadcn/ui.
- `npx shadcn@latest add <component>` for adding specific UI components and their dependencies.
- `npm run dev` for local development server.
- `rsync` used initially for merging project files (manual workaround).