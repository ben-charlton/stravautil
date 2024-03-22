# Use the official Node.js 14 image as a parent image
FROM node:14

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install Angular CLI globally
RUN npm install -g @angular/cli@latest

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Make port 4200 available to the world outside this container
EXPOSE 4200

# Command to start the Angular development server
CMD ["npm", "start"]