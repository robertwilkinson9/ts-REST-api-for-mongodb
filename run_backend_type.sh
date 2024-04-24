#!/bin/bash
TYPE=$1
if [ -z ${TYPE} ]
then
  TYPE=$(cat config/config.json | jq --raw-output '.COLLECTION')
fi
echo $TYPE

./make_yaml $TYPE
sed -e "s/GENERIC/${TYPE}/" Dockerfile.generic > Dockerfile

#if [ -e Dockerfile.${TYPE} ] ;
#then
#  ln -fs Dockerfile.${TYPE} Dockerfile
#fi

docker-compose --file compose.yaml.${TYPE} up
