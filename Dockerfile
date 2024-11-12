# Use the official Node.js image
FROM node:20 as build
WORKDIR /app
COPY package*.json ./

RUN npm ci

COPY . .
RUN npm run build --prod


FROM nginx:alpine

COPY --from=build /app/dist/*/* /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]
