# Use the official Node.js image as the base image
FROM node:latest AS builder

# Set the working directory inside the container
WORKDIR /frontend

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files to the working directory
COPY . .

# Build the Angular app
RUN npm run build

# Use Nginx to serve the built Angular app
FROM nginx:latest

# Copy the built Angular app from the previous stage
COPY --from=builder ./frontend/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Command to run the nginx server
CMD ["nginx", "-g", "daemon off;"]
