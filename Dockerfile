FROM node:18:16:0-slim

WORKDIR /usr/app

COPY package*.json tsconfig*.json .eslint.js ./
COPY src ./src/
RUN npm ci --ignore-scripts \
    && npm run build \
    && npm prunt --production

ENV NODE_ENV='production'
USER node
EXPOSE 8080
CMD [ "node", "dist/index.js" ]
