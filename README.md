A comprehensive event management and volunteer coordination platform built with React, TypeScript, and Tailwind CSS.

## Project Structure

The project is organized with a feature-based folder structure:

```
src/
├── components/         # Shared UI components
├── data/               # Mock data and API models
├── hooks/              # Custom React hooks
├── lib/                # Utility functions and helpers
├── pages/              # Application pages
│   ├── landing/        # Landing page components
│   │   ├── components/ # Landing-specific components
│   │   ├── Home.tsx    # Main landing page
│   │   └── index.ts    # Barrel exports
│   ├── volunteer/      # Volunteer dashboard feature
│   │   ├── components/ # Volunteer-specific components
│   │   │   ├── Achievements.tsx
│   │   │   ├── EventCard.tsx
│   │   │   ├── Heatmap.tsx
│   │   │   ├── TaskSummary.tsx
│   │   │   ├── WelcomeSection.tsx
│   │   │   └── index.ts        # Barrel exports
│   │   ├── Dashboard.tsx       # Main volunteer dashboard
│   │   └── index.ts            # Barrel exports
│   ├── Events.tsx              # Events listing page
│   ├── EventDetail.tsx         # Event details page
│   ├── SignIn.tsx              # Authentication page
│   └── NotFound.tsx            # 404 page
└── App.tsx                     # Main application component with routing
```

## Features

- **Landing Page**: Introduction to the platform with feature highlights
- **Events Management**: Browse, search, and view event details
- **Volunteer Dashboard**:
  - Achievement badges and streak tracking
  - Task management and summary
  - Activity heatmap showing contribution history
  - Leaderboard with volunteer rankings

## Development

To start the development server:

```bash
npm run dev
```
## Project info

## What technologies are used for this project?

This project is built with .

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

