FROM node:18-alpine as build
WORKDIR /app

# Copy package.json and package-lock.json
COPY ../package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY ../ .

RUN npm run build

EXPOSE 3000
CMD ["node", ".output/server/index.mjs"]
