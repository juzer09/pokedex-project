# Gotta Know 'Em All - Pokédex

A modern, responsive Pokédex application built with Next.js, TypeScript, and Prisma.

[Live Demo](https://your-vercel-link-here.vercel.app) <!-- Replace with your Vercel deployment link -->

## Features

- Search for individual Pokémon
- Multi-search functionality to find multiple Pokémon at once
- Filter Pokémon by type
- Detailed view for each Pokémon including stats, abilities, and moves
- Responsive design for optimal viewing on various devices

## Technologies Used

- **Next.js**: React framework for server-side rendering and static site generation
- **TypeScript**: Superset of JavaScript for enhanced developer experience and type safety
- **Prisma**: Next-generation ORM for Node.js and TypeScript
- **tRPC**: End-to-end typesafe API layer
- **Material-UI**: React component library for faster and easier web development
- **PostgreSQL**: Open-source relational database

## Getting Started

1. Clone the repository:
    
    ```bash
    git clone 
    ```

2. Install dependencies:

```bash
cd gotta-know-em-all
npm install
```

3. Set up your environment variables:
Create a `.env` file in the root directory and add your database URL:
DATABASE_URL="your-postgresql-database-url"

4. Run database migrations:

```bash
npx prisma migrate dev
```

5. Seed the database:

```bash
npm run db:seed
```

6. Start the development server:

```bash
npm run dev
```

7. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

- `pages/`: Contains the main pages of the application
- `components/`: Reusable React components
- `prisma/`: Prisma schema and migration files
- `utils/`: Utility functions and helpers
- `styles/`: Global styles and theme configuration

## Deployment

This project is deployed on Vercel. The live demo can be accessed [here](https://your-vercel-link-here.vercel.app).

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.