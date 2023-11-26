FROM node:20.10.0-slim
WORKDIR /app
COPY --link ["package.json", "package-lock.json", "config.json", "./"]
COPY --link ["./src", "./src"]
RUN npm install
CMD  [ "npm", "start" ]
