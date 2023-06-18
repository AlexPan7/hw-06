# My Blog

## Table of Contents

- [Technologies](#technologies)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [API Documentation](#api-documentation)

## Technologies

This project utilizes the following technologies:

- [React](https://react.dev/): JavaScript library for building user interfaces.
- [Vite](https://vitejs.dev/): Build tool and development server for modern web applications.
- [TypeScript](https://www.typescriptlang.org/): Typed superset of JavaScript that compiles to plain JavaScript.
- [Express](https://expressjs.com/): Fast and minimalist web application framework for Node.js.
- [Mongoose](https://mongoosejs.com/): MongoDB object modeling for Node.js.

## Getting Started

### Prerequisites

Make sure you have the following software installed:

- [Node.js](https://nodejs.org): Version 18.6.0 or higher
- [MongoDB](https://www.mongodb.com): Version 6.0.6 or higher.

### Installation

Follow these steps to get the project up and running:

1. Clone the repository: `git clone https://git.stgnew.com/maksym.terela/my-blog.git`
2. Install dependencies: `pnpm install`
3. Install client and server dependencies: `pnpm install-all-deps`.
4. Open the server directory. Copy the `.env.example` file to `.env` and update the environment variables with your own settings:
   ```
   PORT=4000
   DATABASE_URI=mongodb://localhost:27017/my-blog
   SECRET_KEY=some very secret key
   ```
5. Start the project: `pnpm dev`

## API Documentation

You can find the detailed API documentation with interactive examples at [http://localhost:4000/api-docs](http://localhost:4000/api-docs).
