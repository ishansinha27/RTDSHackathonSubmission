# AceCloud GPU Resource Finder

A web application that helps users find GPU instances within their budget by filtering cloud pricing data based on form inputs. Built for the RTDSHackathon.

## Project Overview

This application allows users to:
- Select a specific region for GPU resources
- Set a budget constraint
- Choose an operating system preference
- Specify usage hours
- Find the most cost-effective GPU instances that meet their criteria

The application filters resources from AceCloud's pricing API and shows the top 5 most affordable options that meet the user's requirements, applying the formula: `price_per_hour * usage_hours ≤ budget`.

## Features

- Real-time GPU data from AceCloud's API
- Budget-based filtering
- Responsive design for all device sizes
- Detailed GPU information display
- Sorting by price (most affordable first)
- Fallback to sample data when API is unavailable

## Technologies Used

- **Frontend**: React, TypeScript, TailwindCSS, shadcn/ui, Wouter
- **Backend**: Node.js, Express
- **Database**: PostgreSQL with Drizzle ORM
- **Other**: React Query, Zod for validation

## Getting Started

### Prerequisites

- Node.js (v18+)
- PostgreSQL

### Installation

1. Clone the repository:
```bash
git clone https://github.com/ishansinha27/RTDSHackathonSubmission.git
cd RTDSHackathonSubmission
```

2. Install dependencies:
```bash
npm install
```

3. Setup the database:
```bash
npm run db:push
```

4. Start the development server:
```bash
npm run dev
```

The application will be available at http://localhost:5000

## API Integration

This application integrates with AceCloud's pricing API:
```
https://customer.acecloudhosting.com/api/v1/pricing?is_gpu=true&resource=instances&region=[REGION]
```

The application dynamically changes the region based on user selection.

## Repository Structure

```
├── client/          # Frontend React application
│   ├── src/
│   │   ├── components/  # UI components
│   │   ├── hooks/       # Custom React hooks
│   │   ├── lib/         # Utility functions
│   │   ├── pages/       # Page components
│   │   └── App.tsx      # Main application component
├── db/              # Database configuration
├── server/          # Backend Express server
│   ├── index.ts     # Server entry point
│   └── routes.ts    # API routes
├── shared/          # Shared code between frontend and backend
│   └── schema.ts    # Database schema definitions
└── README.md        # Project documentation
```

## License

MIT License

## Contributors

- Ishan Sinha