#!/bin/bash
TYPE=$1

CONFIG_PREFIX="../ts-ra-config/config."
CONFIG_FILE=$(echo ${CONFIG_PREFIX}${TYPE}.json)

if [ -e $CONFIG_FILE ] ;
then
API_IP=$(docker inspect ${TYPE}_backend | ./get_docker_ip_address)
API_PORT=$(grep APIPORT $CONFIG_FILE | awk '{print $NF}' | sed -e 's/,$//')
echo ${TYPE}_backend at https://${API_IP}:${API_PORT}
else
API_IP=$(docker inspect ${TYPE} | ./get_docker_ip_address)
echo ${TYPE} at https://${API_IP}
fi
