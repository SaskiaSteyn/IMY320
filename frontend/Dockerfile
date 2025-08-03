# Use the official Node.js runtime as the base image
FROM node:20-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on (Vite default is 5173)
EXPOSE 5173

# Set Node.js options to handle crypto compatibility
ENV NODE_OPTIONS="--max-old-space-size=4096"

# Define the command to run the application in development mode
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
