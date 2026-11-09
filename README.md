# SNTA

SNTA (Say No To Alzheimer's) is an offline proof-of-concept companion for people living with Alzheimer's and their caregivers.

## Development

```bash
npm install
npm run dev
```

Create a production build with:

```bash
npm run build
```

## Architecture

The project uses React, TypeScript, and Vite. The application is organized by responsibility:

- `src/components` contains reusable interface building blocks and the application shell.
- `src/pages/patient` and `src/pages/caregiver` contain route-level pages.
- `src/features/games` contains isolated interactive game components.
- `src/state` owns typed application state and offline persistence.
- `src/data`, `src/lib`, and `src/types` contain catalog data, utilities, and domain models.

Pages update state through the shared application context; no page directly manipulates the DOM.

All user data remains local to the browser through `localStorage`; this is intentional for the offline proof of concept.
