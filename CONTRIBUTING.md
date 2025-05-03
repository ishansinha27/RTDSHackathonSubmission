# Contributing to AceCloud GPU Resource Finder

Thank you for considering contributing to the AceCloud GPU Resource Finder! This document provides guidelines and instructions for contributing to this project.

## Getting Started

1. Fork the repository on GitHub
2. Clone your fork to your local machine
3. Create a new branch for your changes
4. Make your changes and commit them with clear, descriptive messages
5. Push your changes to your fork
6. Submit a pull request to the main repository

## Development Environment Setup

1. Install Node.js (v18+) and npm
2. Install PostgreSQL
3. Clone the repository
4. Install dependencies:
```bash
npm install
```
5. Set up environment variables (create a `.env` file based on `.env.example`)
6. Set up the database:
```bash
npm run db:push
npm run db:seed
```
7. Start the development server:
```bash
npm run dev
```

## Code Style and Guidelines

- Follow the existing code style and patterns in the project
- Use TypeScript for type safety
- Format your code using the project's linting rules
- Write clear, descriptive commit messages
- Update documentation when necessary

## Pull Request Process

1. Ensure your code passes all tests
2. Update the README.md or documentation with details of changes if applicable
3. The pull request will be reviewed by maintainers
4. Address any feedback or requested changes
5. Once approved, your pull request will be merged

## Feature Requests and Bug Reports

- Use the GitHub Issues section to report bugs or request features
- For bugs, include steps to reproduce, expected behavior, and actual behavior
- For feature requests, describe the feature and why it would be valuable

## Code of Conduct

- Be respectful and inclusive
- Help create a positive and collaborative environment
- Respect differing viewpoints and experiences

## Questions?

If you have any questions or need help with your contribution, feel free to reach out to the maintainers.

Thank you for contributing!