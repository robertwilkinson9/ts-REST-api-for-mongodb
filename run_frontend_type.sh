#!/bin/bash
TYPE=$1
if [ -z ${TYPE} ]
then
  TYPE=$(cat config/config.json | jq --raw-output '.COLLECTION')
fi
echo $TYPE

cd ../ts-reserve-assets
./make_type_yaml.sh ${TYPE}
echo backend_address ${TYPE}
cat compose.yaml.${TYPE}
cd -

CONFIG_DIR=../ts-ra-config
CONFIG_FILE=$(echo ${CONFIG_DIR}/config.${TYPE}.json)
COLLECTION=$(cat $CONFIG_FILE | jq --raw-output '.COLLECTION')

X=$(which minikube)
STATUS=$?
echo STATUS is $STATUS
if [ $STATUS == 0 ]
then
  echo HAVE MINIKUBE
  API_IP_PORT=$(minikube service ${TYPE}-backend-service --url | sed -e 's/^http:\/\///')
  API_IP=$(echo $API_IP_PORT | sed -e 's/:.*$//')
  API_PORT=$(echo $API_IP_PORT | sed -e 's/^.*://')
else
  Y=$(which k3s)
  STATUS=$?
  echo STATUS is $STATUS
  if [ $STATUS == 0 ]
  then
    API_IP_PORT=$(kubectl describe service/${TYPE}-backend | grep ^Endpoints | awk '{print $2}')
    API_IP=$(echo $API_IP_PORT | sed -e 's/:.*$//')
    API_PORT=$(echo $API_IP_PORT | sed -e 's/^.*://')
  else
    echo NOMINIKUBE
    API_IP=$(docker inspect ${COLLECTION}_backend | jq -r '.[].NetworkSettings.Networks."ts-rest-api-for-mongodb_default".IPAddress')
  fi
fi
API_PORT=$(cat $CONFIG_FILE | jq --raw-output '.APIPORT')
echo CF is $CONFIG_FILE apiport is $API_PORT COLLECTION IS $COLLECTION API_IP IS $API_IP

if [ -z ${API_IP} ]
then
  API_IP="127.0.0.1"
fi

if [ -z ${SSL_CERT} ]
then
  SSL_CERT=/certs/localhost.crt
fi

if [ -z ${SSL_KEY} ]
then
  SSL_KEY=/certs/localhost.key
fi

# ARG API_IP
# ENV API_IP ${API_IP}
cat << EOFH > Dockerfile
FROM node:latest

ARG SSL_CERT
ENV SSL_CERT ${SSL_CERT}
ARG SSL_KEY
ENV SSL_KEY ${SSL_KEY}
ARG API_PORT
ENV API_PORT ${API_PORT}
EOFH

if [ ! -z ${API_IP} ]
then
  cat << EOFA >> Dockerfile
ARG API_IP
ENV API_IP ${API_IP}
EOFA
fi

cat << EOFT >> Dockerfile
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
CMD ["npm", "run", "generic", "${TYPE}"]
#CMD [ "bash", "-c", "generic() { /usr/bin/mkdir -p ./config && /usr/bin/cp -f $npm_package_config_directory/config.$1.json config/config.json && sleep 5 && vite --port ${API_PORT} --host $(hostname -I | awk '{print $1}') } ; generic ${TYPE} ; " ]
EOFT

docker-compose --file compose.yaml.fe${TYPE} up
