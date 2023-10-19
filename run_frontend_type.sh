#!/bin/bash
TYPE=$1
echo $TYPE

FETYPE=$(echo -n ${TYPE} | sed -e 's/_frontend$//')
echo FETYPE is $FE

cd ../ts-reserve-assets
./make_type_yaml.sh ${FETYPE}
echo backend_address ${FETYPE}
cat compose.yaml.${FETYPE}
cd -

if [ -e Dockerfile.${TYPE} ] ;
then
  ln -fs Dockerfile.fe${TYPE} Dockerfile
fi

docker compose --file compose.yaml.fe${TYPE} up
