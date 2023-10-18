#!/bin/bash
TYPE=$1
echo $TYPE

ln -sf Dockerfile.${TYPE} Dockerfile
ln -sf compose.yaml.${TYPE} compose.yaml
$(ls -l)

