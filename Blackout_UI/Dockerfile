# Build 
FROM node:18-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
COPY .env .env
RUN npm install

COPY . . 
RUN npm run build

# Run (Nginx)
FROM nginx:stable-alpine

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]