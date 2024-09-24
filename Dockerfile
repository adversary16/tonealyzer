FROM node:20-alpine as builder
RUN apk update && apk upgrade
WORKDIR /build
COPY *.json ./
COPY ./src ./src
RUN npm i
RUN npm run build

FROM node:20-bookworm
# RUN apk update && apk upgrade && apk add gcompat
WORKDIR /app
COPY --from=builder /build/package.json ./
COPY --from=builder /build/dist ./dist
RUN npm i --omit=dev
CMD [ "npm", "run", "start" ]