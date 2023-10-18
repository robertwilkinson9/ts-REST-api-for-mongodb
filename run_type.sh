#!/bin/bash
TYPE=$1
echo $TYPE

cd ../ts-reserve-assets
./make_type_yaml.sh ${TYPE}
cd -

if [ -e Dockerfile.${TYPE} ] ;
then
  ln -sf Dockerfile.${TYPE} Dockerfile
fi

docker compose --file compose.yaml.${TYPE} up
