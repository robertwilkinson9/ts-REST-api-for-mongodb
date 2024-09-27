FROM node:latest

ARG SSL_CERT
ENV SSL_CERT /certs/localhost.crt
ARG SSL_KEY
ENV SSL_KEY /certs/localhost.key
ARG API_PORT
ENV API_PORT 6176
ARG API_IP
ENV API_IP 172.18.0.3
RUN apt update
RUN apt install -y git jq
RUN mkdir /certs
ADD ./certs/ /certs
COPY ./certs/localhost.crt /usr/local/share/ca-certificates/kubernetes.crt
RUN update-ca-certificates

RUN mkdir /src
RUN git clone https://github.com/robertwilkinson9/ts-ra-config.git /src/ts-ra-config
RUN git clone https://github.com/robertwilkinson9/ts-reserve-assets.git /src/ts-reserve-assets
WORKDIR /src/ts-reserve-assets
RUN npm install
CMD ["npm", "run", "generic", "book"]
#CMD [ "bash", "-c", "generic() { /usr/bin/mkdir -p ./config && /usr/bin/cp -f /config.book.json config/config.json && sleep 5 && vite --port 6176 --host 10.0.2.15 } ; generic book ; " ]
