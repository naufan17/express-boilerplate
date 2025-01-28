# Bolierplate Express JS REST API
Minimalist project structure using express js to build REST API

## Table of Content
- [Preparation](#preparation)
- [Instalation](#instalation)
- [Run Server](#run-server)
- [Feature](#feature)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
- [Default API Edpoint](#default-api-edpoint)

## Preparation:
- Clone this repository
```
git clone https://github.com/naufan17/express-boilerplate.git
```
- Enter directory project
```
cd express-boilerplate
```
- Delete git
```
rm -rf .git
```

## Instalation
- Rename .env.example to .env and fill in the section that must be filled
- Custom your project name in package.json
- Instal dependencies
```
npm install
```
- Migrate database
```
npm run migrate 
```
- Seed database
```
npm run seed
```

## Run Server
- Start the server in local development
```
npm run dev
```
- Build the project
```
npm run build
```
- Start the server after build
```
npm run start
```
- Lint code
```
npm run lint
```

## Feature
- **Database**: using https://knexjs.org/
- **ORM**: using https://vincit.github.io/objection.js/
- **Logging**: using https://github.com/expressjs/morgan and https://github.com/winstonjs/winston
- **Linting**: using https://eslint.org/
- **Validation**: https://express-validator.github.io/docs/
- **Security**: using https://helmetjs.github.io/
- **CORS**: using https://github.com/expressjs/cors
- **Compression**: using https://github.com/expressjs/compression
- **Environtment variables**: using https://github.com/motdotla/dotenv
- **Dependency management**: using https://www.npmjs.com/
- **API Documentation**: using https://swagger.io/

## Project Structure
```
database\
dist\
src\
  |--configs\      # Config files
  |--controllers\  # Request handler
  |--helpers\      # Helper function
  |--middlewares\  # Pre-request middleware
  |--models\       # Database models
  |--repositories\ # Database queries
  |--routes\       # API routes
  |--services\     # Business logic
  |--types\        # Typescript types
  |--utils\        # Utility function
  |--validators\   # Validation function
  |--index.ts      # Main entry point

```

## API Documentation
To view the API documentation, open the following link:
[http://localhost:8000/api-docs](http://localhost:8000/api-docs)

## Default API Edpoint
**Auth routes**:
<br/>
``POST /api/v1/auth/register``  - Create new account
<br/>
``POST /api/v1/auth/login``     - Login to existing account

**User routes**:
<br/>
``GET /api/v1/user/profile``    - Get current user
<br/>