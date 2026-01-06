# Neurio Home Backend

A clean, production-ready Node.js + Express backend template built with TypeScript and MongoDB (Mongoose). Features a well-structured architecture with separation of concerns, centralized error handling, and comprehensive development tooling.

## 🚀 Features

- **TypeScript** - Type-safe development with strict configuration
- **Express.js** - Fast, minimalist web framework
- **MongoDB & Mongoose** - NoSQL database with elegant ODM
- **Clean Architecture** - Controllers, Services, Models separation
- **Error Handling** - Centralized error handling with custom error classes
- **Validation** - Request validation middleware
- **Security** - Helmet and CORS protection
- **Development Tools** - ESLint, Prettier, Nodemon
- **Environment Config** - Type-safe environment variable management

## 📁 Project Structure

```
neurio-home-back/
├── src/
│   ├── config/           # Configuration files
│   │   ├── env.ts        # Environment variables
│   │   └── database.ts   # MongoDB connection
│   ├── controllers/      # Request handlers
│   │   └── user.controller.ts
│   ├── models/           # Mongoose models
│   │   └── User.model.ts
│   ├── services/         # Business logic
│   │   └── user.service.ts
│   ├── routes/           # API routes
│   │   ├── index.ts
│   │   └── user.routes.ts
│   ├── middleware/       # Custom middleware
│   │   ├── errorHandler.ts
│   │   ├── asyncHandler.ts
│   │   └── validation.ts
│   ├── types/            # TypeScript types
│   │   └── index.ts
│   ├── app.ts            # Express app setup
│   └── index.ts          # Application entry point
├── dist/                 # Compiled JavaScript (generated)
├── .env.example          # Environment variables template
├── .gitignore
├── package.json
├── tsconfig.json
├── .eslintrc.json
├── .prettierrc
└── nodemon.json
```

## 🛠️ Installation

1. **Clone or use this template**

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` with your configuration:
   ```env
   NODE_ENV=development
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/neurio-home
   CORS_ORIGIN=http://localhost:3000
   API_VERSION=v1
   ```

4. **Ensure MongoDB is running**
   - Local: `mongod`
   - Or use MongoDB Atlas cloud database

## 🚀 Usage

### Development
```bash
npm run dev
```
Starts the development server with hot-reload on `http://localhost:3000`

### Build
```bash
npm run build
```
Compiles TypeScript to JavaScript in the `dist/` directory

### Production
```bash
npm start
```
Runs the compiled JavaScript from `dist/`

### Linting
```bash
npm run lint        # Check for linting errors
npm run lint:fix    # Fix linting errors
```

### Formatting
```bash
npm run format        # Format code with Prettier
npm run format:check  # Check formatting
```

## 📡 API Endpoints

### Health Check
- `GET /` - Welcome message
- `GET /api/v1/health` - Health check endpoint

### Users
- `GET /api/v1/users` - Get all users
- `GET /api/v1/users/:id` - Get user by ID
- `POST /api/v1/users` - Create new user
- `PUT /api/v1/users/:id` - Update user
- `DELETE /api/v1/users/:id` - Delete user

### Example Request
```bash
# Create a user
curl -X POST http://localhost:3000/api/v1/users \
  -H "Content-Type: application/json" \
  -d '{"name": "John Doe", "email": "john@example.com", "age": 30}'
```

## 🏗️ Architecture

### Controllers
Handle HTTP requests and responses. Keep them thin - delegate business logic to services.

### Services
Contain business logic and interact with models. This is where the core functionality lives.

### Models
Define data structure and validation using Mongoose schemas.

### Middleware
- **errorHandler** - Centralized error handling
- **asyncHandler** - Wraps async functions to catch errors
- **validation** - Request validation

## 🔒 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NODE_ENV` | Environment mode | `development` |
| `PORT` | Server port | `3000` |
| `MONGODB_URI` | MongoDB connection string | Required |
| `CORS_ORIGIN` | Allowed CORS origin | `*` |
| `API_VERSION` | API version prefix | `v1` |

## 🧪 Testing

Add your testing framework of choice (Jest, Mocha, etc.) and create tests in a `tests/` or `__tests__/` directory.

## 📝 Development Guidelines

1. **Follow the established patterns** - Controllers → Services → Models
2. **Use TypeScript types** - Leverage type safety
3. **Handle errors properly** - Use `AppError` for operational errors
4. **Validate inputs** - Use validation middleware
5. **Keep it clean** - Run linter and formatter before committing

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Run linter and formatter
4. Test your changes
5. Submit a pull request

## 📄 License

ISC

## 🙏 Acknowledgments

Built with modern best practices for Node.js backend development.
