FROM node:20
WORKDIR /bbiyakbbiyakBackend
COPY package*.json .env.local ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm","start"]
# CMD ["node","./dist/main"]