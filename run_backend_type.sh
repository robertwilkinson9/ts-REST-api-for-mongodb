#!/bin/bash
TYPE=$1
echo $TYPE
if [ -z ${TYPE} ]
then
  TYPE=$(cat config/config.json | jq --raw-output '.COLLECTION')
fi

./make_yaml $TYPE

if [ -e Dockerfile.${TYPE} ] ;
then
  ln -fs Dockerfile.${TYPE} Dockerfile
fi

docker-compose --file compose.yaml.${TYPE} up
