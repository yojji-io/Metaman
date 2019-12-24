FROM node:lts-alpine
RUN npm install -g http-server
WORKDIR /app
COPY package*.json ./
RUN yarn install
COPY . .
RUN yarn build:docker
EXPOSE 8080
CMD [ "http-server", "build", "-P", "http://localhost:8080?" ]
