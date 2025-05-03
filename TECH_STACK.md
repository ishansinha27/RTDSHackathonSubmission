# Technology Stack

This document outlines the technologies used in the AceCloud GPU Resource Finder application.

## Frontend

- **React**: JavaScript library for building user interfaces
- **TypeScript**: Typed superset of JavaScript
- **TailwindCSS**: Utility-first CSS framework
- **shadcn/ui**: Reusable component library built on top of Tailwind CSS
- **React Query**: Data-fetching and state management library
- **React Hook Form**: Form handling library
- **Zod**: TypeScript-first schema validation
- **Wouter**: Lightweight routing library

## Backend

- **Node.js**: JavaScript runtime
- **Express**: Web framework for Node.js
- **TypeScript**: For type safety
- **Axios**: HTTP client for API requests

## Database

- **PostgreSQL**: Relational database
- **Drizzle ORM**: TypeScript ORM for database operations
- **Drizzle Kit**: Migration tools for Drizzle ORM

## Development & Build Tools

- **Vite**: Frontend build tool
- **esbuild**: JavaScript bundler
- **TSX**: TypeScript execution engine
- **ESLint**: JavaScript linter
- **Prettier**: Code formatter

## Features Enabled by the Stack

- **Type Safety**: TypeScript throughout the application ensures type safety
- **API Integration**: Axios for robust API requests with error handling
- **Form Validation**: React Hook Form with Zod for comprehensive form validation
- **Responsive Design**: TailwindCSS for responsive layouts and design
- **Data Fetching**: React Query for efficient data fetching and caching
- **Database ORM**: Drizzle ORM for type-safe database operations

## Performance Considerations

- React Query's caching reduces redundant API calls
- TailwindCSS's utility-first approach minimizes CSS bundle size
- Vite provides fast development and optimized production builds
- TypeScript catches type errors at compile time rather than runtime
- Proper error handling improves user experience during API failures