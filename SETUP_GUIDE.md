# Setup Guide

This guide walks you through the process of setting up the AceCloud GPU Resource Finder application for development and production.

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v18 or higher)
- npm (v9 or higher)
- PostgreSQL (v14 or higher)
- Git

## Development Setup

### 1. Clone the Repository

```bash
git clone https://github.com/ishansinha27/RTDSHackathonSubmission.git
cd RTDSHackathonSubmission
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root directory based on the provided `.env.example`:

```bash
cp .env.example .env
```

Update the `.env` file with your PostgreSQL database credentials:

```
DATABASE_URL=postgresql://username:password@localhost:5432/gpufinder
PGUSER=username
PGPASSWORD=password
PGDATABASE=gpufinder
PGHOST=localhost
PGPORT=5432
```

### 4. Set Up Database

Create a PostgreSQL database:

```bash
createdb gpufinder
```

Run database migrations:

```bash
npm run db:push
```

Seed the database with initial data (optional):

```bash
npm run db:seed
```

### 5. Start Development Server

```bash
npm run dev
```

The application will be available at http://localhost:5000

## Production Deployment

### 1. Build the Application

```bash
npm run build
```

This will create a production-ready build in the `dist` directory.

### 2. Start Production Server

```bash
NODE_ENV=production npm start
```

## Docker Deployment (Optional)

A Dockerfile is provided for containerized deployment.

### 1. Build Docker Image

```bash
docker build -t acecloud-gpu-finder .
```

### 2. Run Docker Container

```bash
docker run -p 5000:5000 --env-file .env acecloud-gpu-finder
```

## Troubleshooting

### Database Connection Issues

- Ensure PostgreSQL is running
- Verify that the credentials in `.env` are correct
- Check database permissions for the specified user

### API Integration Issues

- Verify internet connectivity
- Check if the AceCloud API is available
- Verify that the region codes are correct

### Frontend Build Issues

- Clear the `.vite` cache directory
- Ensure all dependencies are installed
- Check for TypeScript errors

## Additional Resources

- [Project Documentation](./README.md)
- [API Documentation](./API_ENDPOINTS.md)
- [Feature Overview](./FEATURES.md)
- [Tech Stack Details](./TECH_STACK.md)