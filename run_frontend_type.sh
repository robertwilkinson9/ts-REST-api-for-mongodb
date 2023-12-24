#!/bin/bash
TYPE=$1
echo TYPE is ${TYPE} 

cd ../ts-reserve-assets
./make_type_yaml.sh ${TYPE}
echo backend_address ${TYPE}
cat compose.yaml.${TYPE}
cd -

if [ -e Dockerfile.${TYPE} ] ;
then
  ln -fs Dockerfile.fe${TYPE} Dockerfile
fi

docker-compose --file compose.yaml.fe${TYPE} up
