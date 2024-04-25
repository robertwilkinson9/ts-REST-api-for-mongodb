#!/bin/bash
TYPE=$1
echo TYPE is ${TYPE} 

cd ../ts-reserve-assets
./make_type_yaml.sh ${TYPE}
echo backend_address ${TYPE}
cat compose.yaml.${TYPE}
cd -

sed -e "s/GENERIC/${TYPE}/" Dockerfile.fegeneric > Dockerfile

docker-compose --file compose.yaml.fe${TYPE} up
