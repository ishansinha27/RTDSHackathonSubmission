# Project Structure

This document provides an overview of the project structure for the AceCloud GPU Resource Finder application.

## Main Directories

### `/client`
Contains all frontend code for the React application.

- `/client/src/components`: UI components organized by type
  - `/form`: Form components including the GPU search form
  - `/layout`: Layout components like headers, footers, etc.
  - `/sections`: Page sections like features, testimonials, etc.
  - `/ui`: UI components based on shadcn/ui

- `/client/src/hooks`: Custom React hooks
  - `use-mobile.tsx`: Hook for detecting mobile devices
  - `use-toast.ts`: Hook for managing toast notifications

- `/client/src/lib`: Utility functions
  - `queryClient.ts`: TanStack Query client setup
  - `utils.ts`: General utility functions

- `/client/src/pages`: Page components
  - `home.tsx`: Main home page with the search form and results
  - `not-found.tsx`: 404 page

- `/client/src/App.tsx`: Main application component with routing
- `/client/src/main.tsx`: Application entry point
- `/client/src/index.css`: Global CSS styles

### `/server`
Contains all backend code for the Express server.

- `/server/index.ts`: Server entry point
- `/server/routes.ts`: API route definitions
- `/server/vite.ts`: Vite server setup for development

### `/db`
Database configuration and utilities.

- `/db/index.ts`: Database connection setup
- `/db/seed.ts`: Database seeding script

### `/shared`
Code shared between frontend and backend.

- `/shared/schema.ts`: Database schema definitions with Drizzle ORM

### Root Files

- `package.json`: Project dependencies and scripts
- `drizzle.config.ts`: Drizzle ORM configuration
- `tailwind.config.ts`: Tailwind CSS configuration
- `vite.config.ts`: Vite bundler configuration
- `tsconfig.json`: TypeScript configuration
- `components.json`: shadcn/ui components configuration
- `README.md`: Project documentation

## Key Features

### API Integration
The application integrates with AceCloud's pricing API to fetch real-time GPU resource data.

API endpoint: `https://customer.acecloudhosting.com/api/v1/pricing?is_gpu=true&resource=instances&region=[REGION]`

### Form Workflow
1. User selects region, budget, operating system, and usage hours
2. Form sends request to backend API
3. Backend fetches data from AceCloud API
4. Backend filters resources based on user criteria (price_per_hour * usage_hours <= budget)
5. Backend returns top 5 most affordable options
6. Frontend displays results as cards with detailed GPU information

### Data Fallback
If the AceCloud API is unavailable, the application falls back to using sample data stored in the server.

## Development Workflow

1. Run the Express server and Vite development server:
```bash
npm run dev
```

2. Update database schema:
```bash
npm run db:push
```

3. Seed the database:
```bash
npm run db:seed
```

4. Build for production:
```bash
npm run build
```

5. Start in production mode:
```bash
npm start
```