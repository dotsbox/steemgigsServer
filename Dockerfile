FROM node:7-alpine

ARG SOURCE_COMMIT
ENV SOURCE_COMMIT ${SOURCE_COMMIT}
ARG DOCKER_TAG
ENV DOCKER_TAG ${DOCKER_TAG}



WORKDIR /var/app
RUN mkdir -p /var/app
ADD package.json /var/app/
RUN npm install

COPY . /var/app

RUN npm run startW

ENV PORT 5000

EXPOSE 5000

# CMD [ "npm", "start" ]
