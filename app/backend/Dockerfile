FROM node:16-alpine AS app_backend
WORKDIR /app-backend
EXPOSE 3001
COPY package*.json ./
RUN npm install
COPY . .
CMD ["npm", "start"]