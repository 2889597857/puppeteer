From node:16.14.2-alpine
WORKDIR /app
COPY package.json .
RUN npm install --registry=https://registry.npmmirror.com/
RUN npm install -g pm2
COPY . .
CMD [ "pm2-runtime", "app.js"]
EXPOSE 888