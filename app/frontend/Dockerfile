FROM node:16-alpine AS app_frontend
WORKDIR /app-frontend
EXPOSE 3000
COPY package*.json ./
RUN npm install
COPY . .
CMD ["npm", "start"]