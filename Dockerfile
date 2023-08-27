# Stage 1: Build the React app
FROM node:latest as build-stage

WORKDIR /app

# Copy package.json and package-lock.json for caching dependencies
COPY package*.json ./

RUN npm install

# Copy the rest of the app source code
COPY . .

# Build the React app
RUN npm run build

# Stage 2: Serve the app using Nginx
FROM nginx:latest

# Copy built React app from the build stage to Nginx
COPY --from=build-stage /app/dist /usr/share/nginx/html
COPY --from=build-stage /app/src/assets /usr/share/nginx/html/src/assets
COPY --from=build-stage /app/nginx/nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80 443

# Start Nginx when the container starts
CMD ["nginx", "-g", "daemon off;"]
