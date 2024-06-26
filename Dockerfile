FROM node:latest

RUN apt update
RUN apt install -y git
RUN mkdir /certs
ADD ./certs/ /certs
COPY ./certs/localhost.crt /usr/local/share/ca-certificates/kubernetes.crt
RUN update-ca-certificates
RUN mkdir /src
RUN git clone https://github.com/robertwilkinson9/ts-ra-config.git /src/ts-ra-config
RUN git clone https://github.com/robertwilkinson9/ts-REST-api-for-mongodb.git /src/ts-REST-api-for-mongodb
WORKDIR /src/ts-REST-api-for-mongodb
RUN npm install
CMD ["npm", "run", "generic", "carpark"]
