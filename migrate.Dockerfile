FROM node:24-alpine
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY prisma ./prisma
COPY .env .env
RUN npx prisma generate

CMD ["npx", "prisma", "migrate", "deploy"]