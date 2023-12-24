#!/bin/bash
TYPE=$1
echo $TYPE

if [ -e Dockerfile.${TYPE} ] ;
then
  ln -fs Dockerfile.${TYPE} Dockerfile
fi

docker-compose --file compose.yaml.${TYPE} up
