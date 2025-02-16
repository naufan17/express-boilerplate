# Step 1: Build stage
FROM node:20-alpine as builder

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the source code into the container
COPY . .

# Install knex cli
# RUN npm install knex -g

# Build the app
RUN npm run build

# Step 2: Production stage
FROM node:20-alpine AS production

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/docs ./docs
COPY --from=builder /app/package*.json ./

# Expose the port on which the app will run
EXPOSE 8000

# Start the app
CMD ["npm", "run", "start"]
# CMD ["sh", "-c", "npm run migrate && npm run seed && npm run start"]