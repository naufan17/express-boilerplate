# Bolierplate Express JS REST API
Minimalist project structure using express js to build REST API

## Getting started:
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
- Rename .env.example to .env and fill in the section that must be filled
- Custom your project name in package.json
- Run this command to instal dependencies
```
npm install
```
- Migrate database
```
npm run migrate 
```
- Seed data to table
```
npm run seed
```
- Run this command to start the server in local development
```
npm run dev
```
- Run this command to build the project
```
npm run build
```
- Run this command to start the server after build
```
npm run start
```

## Feature
- **Database**: using https://knexjs.org/
- **ORM**: using https://vincit.github.io/objection.js/
- **Logging**: using https://github.com/expressjs/morgan
- **Linting**: using https://eslint.org/ and https://prettier.io/
- **Validation**: https://express-validator.github.io/docs/
- **Security**: using https://helmetjs.github.io/
- **CORS**: using https://github.com/expressjs/cors
- **Compression**: using https://github.com/expressjs/compression
- **Environtment variables**: using https://github.com/motdotla/dotenv
- **Dependency management**: using https://www.npmjs.com/

## Project Structure
```
database\
dist\
src\
  |--configs\      # Configuration project
  |--controllers\  # Route controllers
  |--helpers\      #
  |--middlewares\  # Protecting for request
  |--modeles\      # Data layes 
  |--repositories\ # 
  |--routes\       # Routing
  |--services\     # Bussiness logic
  |--types\        
  |--utils\        # Utility classes and function
  |--validators\   # Request data validation schema
  |--index.ts      #Entry app

```

## Default API Edpoint
**Auth routes**:
``POST /api/v1/auth/register`` - Create new account
``POST /api/v1/auth/login`` - Login to existing account

**User routes**:
``GET /api/v1/user/profile`` - Get current user


