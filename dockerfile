FROM  node:24-alpine
WORKDIR /app

COPY package*.json ./

RUN npm install

COPY prisma ./prisma

COPY . .
RUN npm run build

CMD ["npm", "run", "start:dev"]